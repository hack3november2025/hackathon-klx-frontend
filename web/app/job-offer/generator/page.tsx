"use client";

import { useState } from "react";
import { ClipboardList } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";

import { GeneratedJobOffer, JobOfferRequest } from "@/types";

import { PageCreate } from "@/components/shared";
import CreateJobOfferForm from "./components/create-job-offer-form";
import { JobOfferDisplay } from "./components/job-offer-display";
import { toast } from "sonner";
import { useJobOffer } from "@/modules/job-offer/hooks/useJobOffer";
import { useRouter } from "next/navigation";

const api = process.env.NEXT_PUBLIC_API_URL;

export default function JobOfferCreationPage() {
  const router = useRouter();

  const {
    handleGenerateJobOffer,
    handleSaveJobOffer,
    loading: isLoading,
  } = useJobOffer();

  const [generatedOffer, setGeneratedOffer] =
    useState<GeneratedJobOffer | null>(null);
  const [jobOfferId, setJobOfferId] = useState<string | null>(null);

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

  const generateJobOffer = async (data: JobOfferRequest) => {
    handleGenerateJobOffer({
      props: data,
      onSuccess: (response) => {
        setGeneratedOffer((response as GeneratedJobOffer) ?? null);
        console.log("handleGenerateJobOffer deu certo");
      },
    });
  };

  const handleAccept = () => {
    if (!generatedOffer) return;

    handleSaveJobOffer({
      props: generatedOffer,
      onSuccess: (response) => {
        const jobID = response?._id;
        setJobOfferId(jobID!);
        router.push(`/job-offer/${jobID}`);
      },
    });
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
