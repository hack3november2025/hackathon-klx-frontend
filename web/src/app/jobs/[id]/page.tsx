import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
  Separator,
} from "@/src/components/ui";
import { Candidate, StoredJobOffer } from "@/src/types";
import { Briefcase, UserCheck, Star, Zap, Settings } from "lucide-react";

// 1. A Vaga Finalizada
const mockJob: StoredJobOffer = {
  id: "JOB-001",
  job_title: "Senior Backend Developer (Java & AWS)",
  department: "Engineering",
  status: "Open",
  created_at: "2025-11-01",
  job_summary:
    "We are seeking a Senior Backend Developer with strong Java and AWS experience to design, build, and maintain scalable, secure, and high-performance backend services...",
  location: { city: "Lisbon", work_type: "Hybrid" },
  employment_type: "Full-time",
  salary_range: { min: "60000", max: "80000", currency: "EUR" },
  key_responsibilities: [
    "Design, develop, and maintain backend services...",
    "Architect and optimize scalable solutions...",
  ],
  required_skills: [
    "Strong hands-on experience with Java for backend development.",
    "Practical experience designing, deploying, and operating applications on AWS.",
  ],
  required_skills_keywords: ["Java", "AWS", "REST"],
  preferred_skills: [
    "Microservices architectures and containerization (Docker, Kubernetes).",
  ],
  preferred_skills_keywords: ["Microservices", "Docker"],
  soft_skills: ["Excellent communication and collaboration skills."],
  soft_skills_keywords: ["Collaboration", "Ownership"],
  company_values_and_culture: {
    collaboration: "...",
    ownership: "...",
    diversity_and_inclusion: "...",
    continuous_improvement: "...",
    transparency: "...",
  },
  application_encouragement:
    "We encourage you to apply even if you don’t meet every requirement...",
};

// 2. Candidatos Aplicados (com score)
const mockCandidates: Candidate[] = [
  {
    id: "CAND-005",
    name: "Alice Johnson",
    current_title: "Java Architect",
    job_id: "JOB-001",
    years_experience: 10,
    email: "alice@example.com",
    cv_summary: "Former architect with focus on performance.",
    fit_score: 92, // High Match
    metrics: {
      skills_match_score: 98,
      experience_relevance_score: 9,
      education_fit_score: 8,
      achievement_impact_score: 9,
      keyword_density_score: 90,
      employment_gap_score: 10,
      readability_score: 8,
      ai_confidence_score: 95,
    },
  } as Candidate,
  {
    id: "CAND-006",
    name: "Bob Williams",
    current_title: "Junior Backend Dev",
    job_id: "JOB-001",
    years_experience: 2,
    email: "bob@example.com",
    cv_summary: "Recent graduate with strong Python focus.",
    fit_score: 65, // Medium Match (low experience/skill mismatch)
    metrics: {
      skills_match_score: 55,
      experience_relevance_score: 4,
      education_fit_score: 9,
      achievement_impact_score: 6,
      keyword_density_score: 70,
      employment_gap_score: 10,
      readability_score: 7,
      ai_confidence_score: 90,
    },
  } as Candidate,
  {
    id: "CAND-007",
    name: "Carlos Diaz",
    current_title: "DevOps Engineer",
    job_id: "JOB-001",
    years_experience: 7,
    email: "carlos@example.com",
    cv_summary:
      "Highly skilled in AWS infrastructure and DevOps, less Java experience.",
    fit_score: 81, // Good Match (strong AWS but some language gap)
    metrics: {
      skills_match_score: 75,
      experience_relevance_score: 8,
      education_fit_score: 7,
      achievement_impact_score: 8,
      keyword_density_score: 80,
      employment_gap_score: 10,
      readability_score: 9,
      ai_confidence_score: 92,
    },
  } as Candidate,
];

// Componente para exibir o score de um candidato
function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <Card className="hover:shadow-lg transition-shadow border-l-4 border-blue-600">
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
            <span className="text-2xl font-extrabold text-blue-600">
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

// Componente principal da página de detalhes
export default function JobDetailPage({ params }: { params: { id: string } }) {
  // Em produção, você buscará a vaga (mockJob) e os candidatos (mockCandidates) usando params.id
  const job = mockJob;
  const candidates = mockCandidates.sort((a, b) => b.fit_score - a.fit_score); // Sort by highest fit score

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center">
          <Briefcase className="w-8 h-8 mr-3 text-blue-600" />
          Job Details: {job.job_title}
        </h1>
        <Badge className="bg-green-500 hover:bg-green-600 text-white text-md py-1 px-3">
          {job.status}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Job Overview</CardTitle>
          <p className="text-sm text-gray-500">
            Posted on: {job.created_at} | ID: {job.id}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{job.job_summary}</p>
          <div className="mt-4 flex space-x-4">
            <Badge variant="outline">{job.department}</Badge>
            <Badge variant="outline">
              {job.location.city} ({job.location.work_type})
            </Badge>
            <Badge variant="outline">{job.employment_type}</Badge>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-bold tracking-tight flex items-center pt-4">
        <UserCheck className="w-6 h-6 mr-2 text-green-600" />
        Top Candidates Match ({candidates.length} Found)
      </h2>
      <p className="text-lg text-gray-500">
        Candidates ranked by AI-generated Overall Candidate Fit Score (0-100%).
      </p>

      {/* Candidate List */}
      <div className="grid gap-6 lg:grid-cols-2">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}
