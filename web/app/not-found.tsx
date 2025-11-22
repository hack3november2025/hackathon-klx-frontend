import { Home, Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex  flex-col items-center justify-center text-center">
      <div className="mb-10 flex flex-col items-center gap-4">
        <div className="text-muted-foreground text-7xl font-extrabold">404</div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Page not found
        </h1>
        <p className="text-muted-foreground max-w-lg text-sm sm:text-base">
          The page you are looking for does not exist or has been moved. You can
          navigate to another section below.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/job-offer">
          <Button className="flex items-center gap-2 bg-(--color-primary) hover:bg-primary-hover transition-colors">
            <Plus className="h-4 w-4" />
            Create Job Opportunity
          </Button>
        </Link>

        <Link href="/job-offer">
          <Button className="flex items-center gap-2 bg-(--color-primary) hover:bg-primary-hover transition-colors">
            <TrendingUp className="h-4 w-4" />
            View Jobs
          </Button>
        </Link>

        <Link href="/">
          <Button className="flex items-center gap-2 bg-(--color-primary) hover:bg-primary-hover transition-colors">
            <Home className="h-4 w-4" />
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
