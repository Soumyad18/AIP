export interface AnalyzePayload {
  resumeText: string;
  jobDescription: string;
}

export interface AnalyzeResponse {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  totalKeywords: number;
}
