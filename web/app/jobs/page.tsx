import { PageCreate } from "@/components/shared/page-create";
import { JobCard } from "@/components/shared/job-card";
import { mockDashboardData } from "@/mocks";

export default function JobsListPage() {
  const jobs = mockDashboardData.active_jobs;

  return (
    <PageCreate title="Jobs" description="Lista de vagas disponíveis">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </PageCreate>
  );
}
