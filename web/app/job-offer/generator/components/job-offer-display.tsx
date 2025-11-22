import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from "@/components/ui";
import { GeneratedJobOffer } from "@/types";
import { CheckCircle, Edit, RefreshCw } from "lucide-react";

function JobOfferDisplay({
  jobOffer,
  onEdit,
  onRegenerate,
  onAccept,
  jobOfferId,
}: {
  jobOffer: GeneratedJobOffer;
  onEdit: () => void;
  onRegenerate: () => void;
  onAccept: () => void;
  jobOfferId?: string | null;
}) {
  return (
    <Card className="mt-8 shadow-xl">
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle className="text-3xl font-bold text-(--color-primary)">
            {jobOffer.job_title}
          </CardTitle>
          {jobOfferId && (
            <p className="text-sm text-(--color-muted-foreground)">
              Offer ID: {jobOfferId}
            </p>
          )}
          <p className="text-sm text-(--color-muted-foreground)">
            {jobOffer.department} |
            {jobOffer.location?.city ?? "N/A"}
            {jobOffer.location?.work_type ? ` (${jobOffer.location.work_type})` : ""}
            {jobOffer.employment_type ? ` | ${jobOffer.employment_type}` : ""}
          </p>
          <p className="text-lg font-semibold mt-2">
            Salary: {jobOffer.salary_range.min} - {jobOffer.salary_range.max}{" "}
            {jobOffer.salary_range.currency}
          </p>
        </div>
        <div className="space-x-2 flex">
          <Button
            variant="outline"
            onClick={onRegenerate}
            className="flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
          <Button
            variant="outline"
            onClick={onEdit}
            className="flex items-center"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            onClick={onAccept}
            className="bg-(--color-primary) hover:bg-(--color-hover-background) flex items-center text-(--color-primary-foreground)"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Accept & Post
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Separator />

        <section>
          <h3 className="text-xl font-semibold mb-2">Role Summary</h3>
          <p className="text-(--color-foreground)">{jobOffer.job_summary}</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Key Responsibilities</h3>
          <ul className="list-disc list-inside space-y-1 ml-4 text-(--color-foreground)">
            {jobOffer.key_responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {jobOffer.required_skills_keywords.map((skill) => (
                <Badge
                  key={skill}
                  variant="default"
                  className="bg-(--color-accent) text-(--color-accent-foreground) hover:bg-(--color-hover-background)"
                >
                  {skill}
                </Badge>
              ))}
              <p className="text-sm text-(--color-muted-foreground) mt-2 w-full">
                {jobOffer.required_skills.join(" / ")}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Preferred Skills</h3>
            <div className="flex flex-wrap gap-2">
              {jobOffer.preferred_skills_keywords.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="text-(--color-muted-foreground) border-(--color-border)"
                >
                  {skill}
                </Badge>
              ))}
              <p className="text-sm text-(--color-muted-foreground) mt-2 w-full">
                {jobOffer.preferred_skills.join(" / ")}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Culture & Values</h3>
          <div className="space-y-2 text-sm text-(--color-foreground)">
            {Object.entries(jobOffer.company_values_and_culture).map(
              ([key, value]) => (
                <p key={key}>
                  <strong className="capitalize">
                    {key.replace("_", " ")}:
                  </strong>{" "}
                  {value}
                </p>
              )
            )}
          </div>
        </section>

        <div className="p-4 bg-(--warning) border-l-4 border-(--warning-foreground) text-(--warning-foreground)">
          <p>{jobOffer.application_encouragement}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export { JobOfferDisplay };
