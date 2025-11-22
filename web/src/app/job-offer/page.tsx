"use client";

import { useState, useMemo } from "react";
import {
  ClipboardList,
  RefreshCw,
  CheckCircle,
  Edit,
  Send,
} from "lucide-react";
import { useForm, SubmitHandler, Form } from "react-hook-form";

// Componentes ShadCN UI
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

// --- Mock Data: Simula a resposta do Backend Python ---
const mockGeneratedJobOffer: GeneratedJobOffer = {
  job_title: "Senior Backend Developer (Java & AWS)",
  department: "Engineering",
  location: { city: "Lisbon", work_type: "Hybrid" },
  employment_type: "Full-time",
  salary_range: { min: "60000", max: "80000", currency: "EUR" },
  job_summary:
    "We are seeking a Senior Backend Developer with strong Java and AWS experience to design, build, and maintain scalable, secure, and high-performance backend services. You will work closely with cross-functional teams to deliver robust APIs, integrate with cloud-native services, and drive technical decisions that shape our platform architecture.",
  key_responsibilities: [
    "Design, develop, and maintain backend services and RESTful APIs using Java and AWS.",
    "Architect and optimize scalable, secure, and high-availability cloud solutions in AWS.",
    "Collaborate with product, frontend, and DevOps teams to deliver end-to-end features from concept to production.",
    "Mentor junior engineers and contribute to technical documentation.",
  ],
  required_skills: [
    "Strong hands-on experience with Java for backend development.",
    "Practical experience designing, deploying, and operating applications on AWS.",
    "Proficiency in RESTful API design and implementation.",
  ],
  required_skills_keywords: ["Java", "AWS", "REST"],
  preferred_skills: [
    "Experience with microservices architectures and containerization (Docker, Kubernetes).",
    "Experience with relational and NoSQL databases, performance tuning, and monitoring tools.",
  ],
  preferred_skills_keywords: ["Microservices", "Docker", "Kubernetes"],
  soft_skills: [
    "Excellent communication and collaboration skills in cross-functional teams.",
    "Strong sense of ownership, problem-solving abilities, and proactive attitude.",
  ],
  soft_skills_keywords: ["Collaboration", "Ownership"],
  company_values_and_culture: {
    collaboration:
      "We work in cross-functional, supportive teams where everyones input is valued and knowledge-sharing is encouraged.",
    ownership:
      "We trust our engineers to take end-to-end responsibility for their services, from design to production support.",
    diversity_and_inclusion:
      "We are committed to building an inclusive environment where people from all backgrounds can thrive and feel respected.",
    continuous_improvement:
      "We promote learning, experimentation, and regular feedback to continually improve our product, processes, and ourselves.",
    transparency:
      "We communicate openly about goals, decisions, and challenges so everyone understands how their work contributes to our mission.",
  },
  application_encouragement:
    "We encourage you to apply even if you dont meet every requirement. If you are excited about backend development with Java and AWS and are eager to learn and grow, wed love to hear from you.",
};

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

  // Fun��o para simular a chamada da API (o seu backend Python)
  const generateJobOffer: SubmitHandler<JobOfferRequest> = async (data) => {
    setIsLoading(true);
    setGeneratedOffer(null);

    // TODO: Substituir por chamada real ao backend Python (ex: fetch('/api/generate-job-offer', { method: 'POST', body: JSON.stringify(data) }))

    // Simula��o de delay de IA
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Request sent to AI:", data);

    // Simula��o de recebimento do JSON de resposta
    setGeneratedOffer(mockGeneratedJobOffer);
    setIsLoading(false);
  };

  const handleAccept = () => {
    if (generatedOffer) {
      // TODO: Aqui voc� faria a chamada para salvar a vaga no backend e redirecionar
      console.log(
        "Job Offer Accepted and Saved (Simulated). Redirecting to job detail page..."
      );
      // Ex: router.push(`/jobs/${jobId}`);
      alert(`Job Offer: "${generatedOffer.job_title}" accepted!`); // Usando alert apenas no mock
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold tracking-tight flex items-center">
        <ClipboardList className="w-8 h-8 mr-3 text-blue-600" />
        AI Job Offer Generator
      </h1>
      <p className="text-lg text-gray-500">
        Enter a brief description to generate a complete, structured job
        posting.
      </p>

      {/* Input Form Section (Always visible) */}
      <Card>
        <CardHeader>
          <CardTitle>1. Define the Role</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
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
          </Form>
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
            onRegenerate={form.handleSubmit(generateJobOffer)} // Reutiliza o mesmo formul�rio para regenerar
            onAccept={handleAccept}
          />
        </div>
      )}
    </div>
  );
}
