import { Candidate } from "@/src/types";
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
import { cn } from "@/src/lib/utils";

function CandidateCard({ candidate }: { candidate: Candidate }) {
  const colorClass = useMemo(() => {
    if (candidate.fit_score >= 90) return "text-green-600";
    if (candidate.fit_score > 50 && candidate.fit_score < 90)
      return "text-yellow-600";
    if (candidate.fit_score <= 50) return "text-red-600";
  }, [candidate]);

  const borderColorClass = useMemo(() => {
    if (candidate.fit_score >= 90) return "border-green-600";
    if (candidate.fit_score > 50 && candidate.fit_score < 90)
      return "border-yellow-600";
    if (candidate.fit_score <= 50) return "border-red-600";
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
          <Zap className="w-4 h-4 text-yellow-500" />
          <span className="text-sm text-muted-foreground">
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

          <p className="text-sm text-gray-600 italic line-clamp-2">
            {candidate.cv_summary}
          </p>

          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-500">
            <span>
              <Star className="w-3 h-3 inline mr-1 text-yellow-400" /> Exp:{" "}
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
