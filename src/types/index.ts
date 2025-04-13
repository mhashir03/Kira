export interface AnalysisResult {
  summary: string;
  conditions: string;
  doctor_type: string;
  disclaimer: string;
  image_analysis?: string;
}

export interface ApiResponse {
  result: AnalysisResult;
  error?: string;
}