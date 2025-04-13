
export interface AnalysisResult {
  summary: string;
  conditions: string;
  doctor_type: string;
  disclaimer: string;
}

export interface ApiResponse {
  result: AnalysisResult;
  error?: string;
}
