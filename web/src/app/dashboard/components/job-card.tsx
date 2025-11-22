import { Button, CardComponent } from "@/src/components";
import { StoredJobOffer } from "@/src/types";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

function JobCard({ job }: { job: StoredJobOffer }) {
  const content = useMemo(() => {
    return (
      <>
        {" "}
        <div className="text-2xl font-bold text-(--color-primary)">
          {job.department}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {job.location.city} ({job.employment_type})
        </p>
        <Link href={`/jobs/${job.id}`}>
          <Button variant="link" className="p-0 h-auto mt-2 text-xs">
            View Details <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </>
    );
  }, []);

  return (
    <CardComponent title={job.job_title} content={content} icon={Briefcase} />
  );
}

export { JobCard };
