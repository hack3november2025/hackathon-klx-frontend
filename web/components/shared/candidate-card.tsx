import { Candidate } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
  Separator,
} from "../ui";
import { Settings, Star, Zap } from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

function CandidateCard({ candidate }: { candidate: Candidate }) {
  const colorClass = useMemo(() => {
    if (candidate.fit_score >= 90) return "text-[var(--success)]";
    if (candidate.fit_score > 50 && candidate.fit_score < 90)
      return "text-[var(--warning)]";
    if (candidate.fit_score <= 50) return "text-[var(--destructive)]";
  }, [candidate]);

  const borderColorClass = useMemo(() => {
    if (candidate.fit_score >= 90) return "border-[var(--success)]";
    if (candidate.fit_score > 50 && candidate.fit_score < 90)
      return "border-[var(--warning)]";
    if (candidate.fit_score <= 50) return "border-[var(--destructive)]";
  }, [candidate]);

  return (
    <Card
      className={cn(
        "hover:shadow-lg transition-shadow border-l-4",
        borderColorClass
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{candidate.name}</CardTitle>
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-(--warning)" />
          <span className="text-sm text-(--color-muted-foreground)">
            {candidate.current_title}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Fit Score</span>
            <span className={cn("text-2xl font-extrabold", colorClass)}>
              {candidate.fit_score}%
            </span>
          </div>
          <Progress value={candidate.fit_score} className="h-2" />

          <Separator className="my-3" />

          <p className="text-sm text-(--color-muted-foreground) italic line-clamp-2">
            {candidate.cv_summary}
          </p>

          <div className="mt-3 pt-3 border-t border-(--color-border) flex justify-between text-xs text-(--color-muted-foreground)">
            <span>
              <Star className="w-3 h-3 inline mr-1 text-(--warning)" /> Exp:{" "}
              {candidate.years_experience} yrs
            </span>
            <span>
              <Settings className="w-3 h-3 inline mr-1" /> Skills Match:{" "}
              {candidate.metrics.skills_match_score}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { CandidateCard };
