export type JobOfferTone = "formal" | "friendly" | "inclusive";

export interface JobOfferRequest {
  summary: string;
  tone: JobOfferTone;
  department?: string;
  location?: string;
  employment_type?: string;
  salary_range?: string;
}

export interface GeneratedJobOffer {
  job_title: string;
  department: string;
  location: {
    city: string;
    work_type: string;
  };
  employment_type: string;
  salary_range: {
    min: string;
    max: string;
    currency: string;
  };
  job_summary: string;
  key_responsibilities: string[];
  required_skills: string[];
  required_skills_keywords: string[];
  preferred_skills: string[];
  preferred_skills_keywords: string[];
  soft_skills: string[];
  soft_skills_keywords: string[];
  company_values_and_culture: {
    collaboration: string;
    ownership: string;
    diversity_and_inclusion: string;
    continuous_improvement: string;
    transparency: string;
  };
  application_encouragement: string;
}

export interface StoredJobOffer extends GeneratedJobOffer {
  id: string;
  status: "Draft" | "Open" | "Closed";
  created_at: string;
}
