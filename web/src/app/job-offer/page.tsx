// /home/hack3-vl03-user/KLx/hackathon-klx-frontend/web/src/app/job-offer/page.tsx
"use client";

import { useState, useMemo } from "react";
import {
  ClipboardList,
  RefreshCw,
  CheckCircle,
  Edit,
  Send,
} from "lucide-react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

// Componentes UI
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { GeneratedJobOffer, JobOfferRequest } from "@/src/types";
import {
  Badge,
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Textarea,
} from "@/src/components/ui";

// Componente de Layout Padro
// Mock Data (Assumindo que este mock existe em "@/src/mocks" como na sua importao)
import { mockGeneratedJobOffer } from "@/src/mocks";
import { PageCreate } from "@/src/components";

function JobOfferDisplay({
  jobOffer,
  onEdit,
  onRegenerate,
  onAccept,
}: {
  jobOffer: GeneratedJobOffer;
  onEdit: () => void;
  onRegenerate: () => void;
  onAccept: () => void;
}) {
  return (
    <Card className="mt-8 shadow-xl">
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle className="text-3xl font-bold text-blue-700">
            {jobOffer.job_title}
          </CardTitle>
          <p className="text-sm text-gray-500">
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
            className="bg-green-600 hover:bg-green-700 flex items-center"
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
          <p className="text-gray-700">{jobOffer.job_summary}</p>
        </section>

        {/* Responsibilities */}
        <section>
          <h3 className="text-xl font-semibold mb-2">Key Responsibilities</h3>
          <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
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
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                >
                  {skill}
                </Badge>
              ))}
              <p className="text-sm text-gray-500 mt-2 w-full">
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
                  className="text-gray-600 border-gray-300"
                >
                  {skill}
                </Badge>
              ))}
              <p className="text-sm text-gray-500 mt-2 w-full">
                {jobOffer.preferred_skills.join(" / ")}
              </p>
            </div>
          </div>
        </section>

        {/* Culture */}
        <section>
          <h3 className="text-xl font-semibold mb-2">Culture & Values</h3>
          <div className="space-y-2 text-sm text-gray-700">
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
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700">
          <p>{jobOffer.application_encouragement}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function JobOfferCreationPage() {
  const [generatedOffer, setGeneratedOffer] =
    useState<GeneratedJobOffer | null>(null);
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

    // TODO: Substituir por chamada real ao backend Python (ex: fetch('/api/generate-job-offer', { method: 'POST', body: JSON.stringify(data) }))

    // Simulação de atraso de IA
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Request sent to AI:", data);

    // Simulação de recebimento da resposta
    setGeneratedOffer(mockGeneratedJobOffer);
    setIsLoading(false);
  };

  const handleAccept = () => {
    if (generatedOffer) {
      // TODO: Aqui você faria a chamada para salvar a vaga no backend e redirecionar
      console.log(
        "Job Offer Accepted and Saved (Simulated). Redirecting to job detail page..."
      );
      // Ex: router.push(`/jobs/${jobId}`);
      alert(`Job Offer: "${generatedOffer.job_title}" accepted!`); // Usando alert apenas no mock
    }
  };

  return (
    <PageCreate
      title="AI Job Offer Generator"
      description="Enter a brief description to generate a complete, structured job posting."
      icon={ClipboardList}
    >
      {/* Input Form Section (Always visible) */}
      <Card>
        <CardHeader>
          <CardTitle>1. Define the Role</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Envolvendo o formulário com FormProvider */}
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(generateJobOffer)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="summary"
                rules={{ required: "A summary is required." }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Summary (Required)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="E.g., Senior Python developer for data processing pipelines..."
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tone Preference</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select tone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="inclusive">Inclusive</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Engineering" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., Lisbon or Remote"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="employment_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Type (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Full-time" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salary_range"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Range (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., 60000-80000 EUR" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="mt-4 w-full md:w-auto"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating Offer...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Generate Offer Draft
                  </>
                )}
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>

      {/* Output Display Section */}
      {generatedOffer && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            2. Review & Finalize AI Draft
          </h2>
          <JobOfferDisplay
            jobOffer={generatedOffer}
            onEdit={() =>
              alert("Simulating Edit mode / Editing the raw text...")
            }
            onRegenerate={form.handleSubmit(generateJobOffer)}
            onAccept={() => handleAccept()}
          />
        </div>
      )}
    </PageCreate>
  );
}