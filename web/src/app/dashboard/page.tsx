import {
  LayoutDashboard,
  Users,
  Clock,
  Briefcase,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { StoredJobOffer } from "@/src/types";
import { CardDescription } from "@/src/components/ui";
import { mockDashboardData } from "@/src/mocks";
import { useMemo } from "react";
import { CardComponent, PageCreate } from "@/src/components/shared";
import { JobCard } from "./components/job-card";

export default function DashboardPage() {
  const data = mockDashboardData;

  const openJobsContent = useMemo(() => {
    return (
      <div>
        <div className="text-2xl font-bold text-blue-600">
          {data.metrics.total_open_jobs}
        </div>
        <p className="text-xs text-muted-foreground">Active Roles</p>
      </div>
    );
  }, [data.metrics.total_open_jobs]);

  const totalApplicationContent = useMemo(() => {
    return (
      <div>
        <div className="text-2xl font-bold">
          {data.metrics.total_applications}
        </div>
        <p className="text-xs text-muted-foreground">
          Total candidates screened
        </p>
      </div>
    );
  }, [data.metrics.total_applications]);

  const averageTimeContent = useMemo(() => {
    return (
      <div>
        <div className="text-2xl font-bold">
          {data.metrics.avg_time_to_fill_days} days
        </div>
        <p className="text-xs text-muted-foreground">
          From posting to offer acceptance
        </p>
      </div>
    );
  }, [data.metrics.avg_time_to_fill_days]);

  const createNewJobContent = useMemo(() => {
    return (
      // Nota: Mantive a CardDescription com a cor azul-100 para o link, o que funciona bem
      // com a estilização de CardComponent.
      <div className="flex flex-col items-center justify-center h-full p-6">
        <PlusCircle className="h-6 w-6 mb-2" />
        <CardDescription className="text-blue-100">
          Generate offer via AI
        </CardDescription>
      </div>
    );
  }, []);

  return (
    <PageCreate
      title="Recruitment Dashboard"
      description="Overview of open roles, candidates, and key performance metrics."
      icon={LayoutDashboard}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardComponent
          title="Open Jobs"
          content={openJobsContent}
          icon={Briefcase}
        />
        <CardComponent
          title="Total Applications"
          content={totalApplicationContent}
          icon={Users}
        />
        <CardComponent
          title="Avg. Time to Fill"
          content={averageTimeContent}
          icon={Clock}
        />

        <Link href="/job-offer" className="flex items-center">
          <CardComponent
            className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            title="Create New Job Offer"
            content={createNewJobContent}
          />
        </Link>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Active Job Postings ({data.active_jobs.length})
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.active_jobs.map((job: StoredJobOffer) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </PageCreate>
  );
}
