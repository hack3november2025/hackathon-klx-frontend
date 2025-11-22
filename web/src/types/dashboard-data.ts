import { StoredJobOffer, GeneratedJobOffer } from "./job-offer";
import { Candidate } from "./candidate";

export interface DashboardMetrics {
  total_open_jobs: number;
  total_applications: number;
  avg_time_to_fill_days: number;
  top_score_candidate_name: string;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  recent_candidates: Candidate[];
  active_jobs: StoredJobOffer[];
}
