// /home/hack3-vl03-user/KLx/hackathon-klx-frontend/web/app/job-offer/page.tsx
"use client";

import { PageCreate } from "@/components/shared/page-create";
import { useEffect } from "react";
import { useJobOffer } from "@/modules/job-offer/hooks/useJobOffer";
import { LoadingSpinner } from "@/components/shared";
import JobCard from "@/components/shared/job-card";

export default function JobsListPage() {
  const { handleGeJobOffers, jobOffers, loading } = useJobOffer();

  useEffect(() => {
    handleGeJobOffers();
  }, [handleGeJobOffers]);

  return (
    <PageCreate
      title="Job Postings"
      description="Lista de vagas disponíveis que foram geradas ou criadas."
    >
      {loading ? (
        <LoadingSpinner text="Fetching active job offers..." />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobOffers && jobOffers.length > 0 ? (
            jobOffers.map((job, index) => <JobCard key={job._id} job={job} />)
          ) : (
            <p className="text-xl text-center p-8 w-full col-span-full text-(--color-muted-foreground)">
              No job offers are currently open. Use the "Create Offer" link to
              generate one!
            </p>
          )}
        </div>
      )}
    </PageCreate>
  );
}
