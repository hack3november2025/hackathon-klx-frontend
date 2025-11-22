"use client";

import { PageCreate } from "@/components/shared/page-create";
import { JobCard } from "@/components/shared/job-card";
import { useEffect } from "react";
import { useJobOffer } from "@/modules/job-offer/hooks/useJobOffer";

export default function JobsListPage() {
  const { handleGeJobOffers, jobOffers } = useJobOffer();

  useEffect(() => {
    handleGeJobOffers({ props: {} });
  }, []);

  return (
    <PageCreate title="Jobs" description="Lista de vagas disponíveis">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobOffers.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </PageCreate>
  );
}
