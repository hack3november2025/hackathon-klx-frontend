// /home/hack3-vl03-user/KLx/hackathon-klx-frontend/web/app/job-offer/[id]/page.tsx
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
import { useParams, useRouter } from "next/navigation";
import { Candidate, StoredJobOffer } from "@/types";

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const jobID = params.id;

  const { handleGeJobOffers, jobOffers, loading } = useJobOffer();
  const router = useRouter();

  // DERIVAO CORRETA: Encontra a vaga no estado do hook.
  // Isso re-executa em toda atualizao de jobOffers.
  const job = React.useMemo(() => {
    // Busca por 'id' e 'id' (para cobrir mocks e a nova tipagem _id)
    return jobOffers.find((j) => j._id === jobID || j._id === jobID);
  }, [jobOffers, jobID]);

  // Efeito para carregar as vagas se a lista estiver vazia
  useEffect(() => {
    if (jobOffers.length === 0 && !loading) {
      handleGeJobOffers();
    }
  }, [handleGeJobOffers, jobOffers.length, loading]);

  // Efeito para redirecionar se o ID for invlido ou no encontrado aps o carregamento
  useEffect(() => {
    // Se no estiver carregando, a lista de vagas tiver sido populada e o 'job' for undefined, redireciona.
    if (!loading && jobOffers.length > 0 && !job) {
      router.replace("/job-offer");
    }
  }, [loading, jobOffers.length, job, router]);

  if (loading || !job) {
    return (
      <LoadingSpinner
        text={
          jobID
            ? `Loading Job Details for ID: ${jobID}...`
            : "Loading Job Details..."
        }
      />
    );
  }

  const candidates: Candidate[] = mockCandidates as Candidate[];
  const displayCandidates = candidates;

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
            Posted on: {job.created_at} | ID: {job._id}
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
        Top Candidates Match ({displayCandidates.length} Found)
      </h2>
      <p className="text-lg text-(--color-muted-foreground)">
        Candidates ranked by AI-generated Overall Candidate Fit Score (0-100%).
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        {displayCandidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}
