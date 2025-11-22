import {
  Candidate,
  DashboardData,
  GeneratedJobOffer,
  StoredJobOffer,
} from "@/src/types";

export const mockJob: StoredJobOffer = {
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

export const mockCandidates: Candidate[] = [
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
    fit_score: 49,
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
    fit_score: 81,
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

export const mockDashboardData: DashboardData = {
  metrics: {
    total_open_jobs: 5,
    total_applications: 128,
    avg_time_to_fill_days: 35,
    top_score_candidate_name: "Alice Johnson",
  },
  active_jobs: [
    {
      id: "JOB-001",
      job_title: "Senior Backend Engineer",
      department: "Engineering",
      status: "Open",
      created_at: "2025-11-01",
      job_summary: "...",
      key_responsibilities: [],
      required_skills: [],
      required_skills_keywords: [],
      preferred_skills: [],
      preferred_skills_keywords: [],
      soft_skills: [],
      soft_skills_keywords: [],
      company_values_and_culture: {
        collaboration: "",
        ownership: "",
        diversity_and_inclusion: "",
        continuous_improvement: "",
        transparency: "",
      },
      application_encouragement: "",
      employment_type: "Full-time",
      location: { city: "Lisbon", work_type: "Hybrid" },
      salary_range: { min: "60000", max: "80000", currency: "EUR" },
    },
    {
      id: "JOB-002",
      job_title: "Product Manager",
      department: "Product",
      status: "Open",
      created_at: "2025-11-10",
      job_summary: "...",
      key_responsibilities: [],
      required_skills: [],
      required_skills_keywords: [],
      preferred_skills: [],
      preferred_skills_keywords: [],
      soft_skills: [],
      soft_skills_keywords: [],
      company_values_and_culture: {
        collaboration: "",
        ownership: "",
        diversity_and_inclusion: "",
        continuous_improvement: "",
        transparency: "",
      },
      application_encouragement: "",
      employment_type: "Full-time",
      location: { city: "Remote", work_type: "Remote" },
      salary_range: { min: "80000", max: "100000", currency: "EUR" },
    },
  ],
  recent_candidates: [
    {
      id: "CAND-005",
      name: "Alice Johnson",
      current_title: "Java Architect",
      job_id: "JOB-001",
      fit_score: 92,
      email: "",
      years_experience: 10,
      cv_summary: "",
      metrics: {} as any,
    },
    {
      id: "CAND-006",
      name: "Bob Williams",
      current_title: "Data Scientist",
      job_id: "JOB-002",
      fit_score: 85,
      email: "",
      years_experience: 5,
      cv_summary: "",
      metrics: {} as any,
    },
  ],
};

export const mockGeneratedJobOffer: GeneratedJobOffer = {
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

export const mockPartialDashboardData: DashboardData = {
  metrics: {
    total_open_jobs: 5,
    total_applications: 128,
    avg_time_to_fill_days: 35,
    top_score_candidate_name: "Alice Johnson",
  },
  active_jobs: [], // Nao precisamos da lista completa aqui
  recent_candidates: [], // Nao precisamos da lista completa aqui
};
