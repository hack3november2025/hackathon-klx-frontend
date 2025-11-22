export interface TopResult {
  cv_id: string;
  similarity: number;
}

export interface ChatAnswer {
  query: string;
  top_results: TopResult[];
  answer: string;
}