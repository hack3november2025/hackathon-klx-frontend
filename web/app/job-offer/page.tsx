"use client";

import { useState, useMemo } from "react";
import {
  ClipboardList,
  RefreshCw,
  CheckCircle,
  Edit,
  Send,
} from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GeneratedJobOffer, JobOfferRequest } from "@/types";
import { Badge, Button, Separator } from "@/components/ui";

import { PageCreate } from "@/components/shared";
import CreateJobOfferForm from "./components/create-job-offer-form";
import { toast } from "sonner";

const API_URL = "http://10.208.1.7:8000/generate-job-offer";

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
            {jobOffer.department} | {jobOffer.location.city} (
            {jobOffer.employment_type})
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

        {/* Summary */}
        <section>
          <h3 className="text-xl font-semibold mb-2">Role Summary</h3>
          <p className="text-(--color-foreground)">{jobOffer.job_summary}</p>
        </section>

        {/* Responsibilities */}
        <section>
          <h3 className="text-xl font-semibold mb-2">Key Responsibilities</h3>
          <ul className="list-disc list-inside space-y-1 ml-4 text-(--color-foreground)">
            {jobOffer.key_responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </section>

        {/* Skills */}
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

        {/* Culture */}
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

        {/* Encouragement */}
        <div className="p-4 bg-(--warning) border-l-4 border-(--warning-foreground) text-(--warning-foreground)">
          <p>{jobOffer.application_encouragement}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function JobOfferCreationPage() {
  const [generatedOffer, setGeneratedOffer] =
    useState<GeneratedJobOffer | null>(null);
  const [jobOfferId, setJobOfferId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Criando o form hook
  const form = useForm<JobOfferRequest>({
    defaultValues: {
      summary:
        "Senior backend developer with strong Java and AWS experience to build scalable services.",
      tone: "inclusive",
      department: "Engineering",
      location: "Lisbon",
      employment_type: "Full-time",
      salary_range: "60000-80000 EUR",
    },
  });

  // Função para simular a chamada de backend
  const generateJobOffer: SubmitHandler<JobOfferRequest> = async (data) => {
    setIsLoading(true);
    setGeneratedOffer(null);
    setJobOfferId(null);

    try {
      console.log("Sending request to AI:", data);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast(`API returned status ${response.status}: ${response.statusText}`);
        throw new Error(
          `API returned status ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();

      // Support both flat GeneratedJobOffer and wrapped { job_offer_id, job_offer }
      if (result && result.job_offer) {
        setGeneratedOffer(result.job_offer as GeneratedJobOffer);
        setJobOfferId(result.job_offer_id ?? null);
      } else {
        setGeneratedOffer(result as GeneratedJobOffer);
        setJobOfferId(null);
      }

      toast.success("Job offer generated successfully.");
    } catch (error) {
      console.error("Error generating job offer:", error);
      toast.error(`Error generating job offer : ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => {
    if (generatedOffer) {
      // TODO: Aqui você faria a chamada para salvar a vaga no backend e redirecionar

      toast.warning(`Job Offer: "${generatedOffer.job_title}" accepted!`);
      toast.warning("Simulating Job Offer acceptance...");
    }
  };

  return (
    <PageCreate
      title="AI Job Offer Generator"
      description="Enter a brief description to generate a complete, structured job posting."
      icon={ClipboardList}
    >
      <CreateJobOfferForm
        form={form}
        onSubmit={generateJobOffer}
        isLoading={isLoading}
      />

      {generatedOffer && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            2. Review & Finalize AI Draft
          </h2>
          <JobOfferDisplay
            jobOffer={generatedOffer}
            onEdit={() =>
              toast.warning("Simulating Edit mode / Editing the raw text...")
            }
            onRegenerate={form.handleSubmit(generateJobOffer)}
            onAccept={() => handleAccept()}
            jobOfferId={jobOfferId}
          />
        </div>
      )}
    </PageCreate>
  );
}
