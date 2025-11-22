"use client";

import { Briefcase, UserCheck } from "lucide-react";
import { mockCandidates } from "../../../mocks";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { CandidateCard, LoadingSpinner } from "@/components/shared";
import React, { useEffect } from "react";
import { useJobOffer } from "@/modules/job-offer/hooks/useJobOffer";
import { useRouter } from "next/navigation";

export default function JobDetailPage({
  params,
}: {
  params: { id?: string | Promise<string | undefined> };
}) {
  let id: string | undefined;
  if (params !== undefined) {
    const maybePromise = params as any;
    if (maybePromise && typeof maybePromise.then === "function") {
      const resolved = React.use(maybePromise) as { id?: string } | undefined;
      id = resolved?.id;
    } else {
      id = (params as any).id;
    }
  }

  const { handleGeJobOffers, jobOffers } = useJobOffer();
  const router = useRouter();

  const job = jobOffers.find((j) => j.id === id);

  useEffect(() => {
    handleGeJobOffers({ props: {} });
  }, [handleGeJobOffers]);

  useEffect(() => {
    if (!id) {
      router.replace("/jobs");
      return;
    }
    if (jobOffers.length > 0 && !job) {
      router.replace("/jobs");
    }
  }, [id, jobOffers, job, router]);

  if (!job) {
    return <LoadingSpinner />;
  }

  const candidates = mockCandidates.sort((a, b) => b.fit_score - a.fit_score);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center">
          <Briefcase className="w-8 h-8 mr-3 text-(--color-primary)" />
          Job Details: {job.job_title}
        </h1>
        <Badge className="bg-(--success) hover:bg-(--success-foreground) text-(--success-foreground) text-md py-1 px-3">
          {job.status}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Job Overview</CardTitle>
          <p className="text-sm text-(--color-muted-foreground)">
            Posted on: {job.created_at} | ID: {job.id}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-(--color-foreground)">{job.job_summary}</p>
          <div className="mt-4 flex space-x-4">
            <Badge variant="outline">{job.department}</Badge>
            <Badge variant="outline">
              {job.location.city} ({job.location.work_type})
            </Badge>
            <Badge variant="outline">{job.employment_type}</Badge>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-bold tracking-tight flex items-center pt-4">
        <UserCheck className="w-6 h-6 mr-2 text-(--success)" />
        Top Candidates Match ({candidates.length} Found)
      </h2>
      <p className="text-lg text-(--color-muted-foreground)">
        Candidates ranked by AI-generated Overall Candidate Fit Score (0-100%).
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}
