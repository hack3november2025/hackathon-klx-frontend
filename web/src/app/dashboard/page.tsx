import {
  LayoutDashboard,
  Users,
  Clock,
  Briefcase,
  PlusCircle,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import Link from "next/link";
import { DashboardData, StoredJobOffer } from "@/src/types";
import { Button } from "@/src/components/ui";

const mockDashboardData: DashboardData = {
  metrics: {
    total_open_jobs: 5,
    total_applications: 128,
    avg_time_to_fill_days: 35,
    top_score_candidate_name: "Alice Johnson",
  },
  active_jobs: [
    {
      id: "JOB-001",
      job_title: "Senior Backend Engineer",
      department: "Engineering",
      status: "Open",
      created_at: "2025-11-01",
      job_summary: "...",
      key_responsibilities: [],
      required_skills: [],
      required_skills_keywords: [],
      preferred_skills: [],
      preferred_skills_keywords: [],
      soft_skills: [],
      soft_skills_keywords: [],
      company_values_and_culture: {
        collaboration: "",
        ownership: "",
        diversity_and_inclusion: "",
        continuous_improvement: "",
        transparency: "",
      },
      application_encouragement: "",
      employment_type: "Full-time",
      location: { city: "Lisbon", work_type: "Hybrid" },
      salary_range: { min: "60000", max: "80000", currency: "EUR" },
    },
    {
      id: "JOB-002",
      job_title: "Product Manager",
      department: "Product",
      status: "Open",
      created_at: "2025-11-10",
      job_summary: "...",
      key_responsibilities: [],
      required_skills: [],
      required_skills_keywords: [],
      preferred_skills: [],
      preferred_skills_keywords: [],
      soft_skills: [],
      soft_skills_keywords: [],
      company_values_and_culture: {
        collaboration: "",
        ownership: "",
        diversity_and_inclusion: "",
        continuous_improvement: "",
        transparency: "",
      },
      application_encouragement: "",
      employment_type: "Full-time",
      location: { city: "Remote", work_type: "Remote" },
      salary_range: { min: "80000", max: "100000", currency: "EUR" },
    },
  ],
  recent_candidates: [
    {
      id: "CAND-005",
      name: "Alice Johnson",
      current_title: "Java Architect",
      job_id: "JOB-001",
      fit_score: 92,
      email: "",
      years_experience: 10,
      cv_summary: "",
      metrics: {} as any,
    },
    {
      id: "CAND-006",
      name: "Bob Williams",
      current_title: "Data Scientist",
      job_id: "JOB-002",
      fit_score: 85,
      email: "",
      years_experience: 5,
      cv_summary: "",
      metrics: {} as any,
    },
  ],
};

function JobCard({ job }: { job: StoredJobOffer }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{job.job_title}</CardTitle>
        <Briefcase className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-blue-600">{job.department}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {job.location.city} ({job.employment_type})
        </p>
        <Link href={`/jobs/${job.id}`}>
          <Button variant="link" className="p-0 h-auto mt-2 text-xs">
            View Details <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const data = mockDashboardData;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight flex items-center">
        <LayoutDashboard className="w-8 h-8 mr-3 text-blue-600" />
        Recruitment Dashboard
      </h1>
      <p className="text-lg text-gray-500">
        Overview of open roles, candidates, and key performance metrics.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {data.metrics.total_open_jobs}
            </div>
            <p className="text-xs text-muted-foreground">Active Roles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Applications
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.metrics.total_applications}
            </div>
            <p className="text-xs text-muted-foreground">
              Total candidates screened
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Time to Fill
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.metrics.avg_time_to_fill_days} days
            </div>
            <p className="text-xs text-muted-foreground">
              From posting to offer acceptance
            </p>
          </CardContent>
        </Card>

        <Link href="/job-offer" className="flex items-center">
          <Card className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6 h-full">
              <PlusCircle className="h-6 w-6 mb-2" />
              <CardTitle className="text-lg">Create New Job Offer</CardTitle>
              <CardDescription className="text-blue-100">
                Generate offer via AI
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">
          Active Job Postings ({data.active_jobs.length})
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.active_jobs.map((job: StoredJobOffer) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
