import { StoredJobOffer } from "@/types";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { CardComponent } from "./card-component";
import { Button } from "../ui";

export default function JobCard({ job }: { job: StoredJobOffer }) {
  const jobID = job._id;
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
        <Link href={`/job-offer/${jobID}`}>
          <Button variant="link" className="p-0 h-auto mt-2 text-xs">
            View Details <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </>
    );
  }, [job]);

  return (
    <CardComponent title={job.job_title} content={content} icon={Briefcase} />
  );
}
