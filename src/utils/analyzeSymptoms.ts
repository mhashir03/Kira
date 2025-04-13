import { ApiResponse } from '../types';

export async function analyzeSymptoms(
  transcript: string,
  imageBase64?: string
): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript, imageBase64 }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        result: {
          summary: '',
          conditions: '',
          doctor_type: '',
          disclaimer: '',
          image_analysis: '',
        },
        error: errorData.error || 'API error',
      };
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching from /api/gemini:', err);
    return {
      result: {
        summary: '',
        conditions: '',
        doctor_type: '',
        disclaimer: '',
        image_analysis: '',
      },
      error: 'Network or server error',
    };
  }
}
