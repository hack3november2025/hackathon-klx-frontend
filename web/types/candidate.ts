export interface EvaluationMetrics {
  skills_match_score: number;
  experience_relevance_score: number;
  education_fit_score: number;
  achievement_impact_score: number;
  keyword_density_score: number;
  employment_gap_score: number;
  readability_score: number;
  ai_confidence_score: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  current_title: string;
  years_experience: number;
  fit_score: number;
  metrics: EvaluationMetrics;
  job_id: string;
  cv_summary: string;
}
