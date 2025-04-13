import { AnalysisResult } from '../types';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Gen AI SDK with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function analyzeSymptoms(transcript: string): Promise<{
  result: AnalysisResult;
  error?: string;
}> {
  try {
    // Create a prompt for the Gemini model
    const prompt = `
    Analyze the following patient symptom transcript and provide:
    1. A brief summary of the symptoms
    2. Possible conditions based on these symptoms
    3. Type of doctor the patient should consult
    4. A medical disclaimer

    Patient transcript: "${transcript}"
    
    Format your response as JSON with the following structure:
    {
      "summary": "Brief summary of the symptoms",
      "conditions": "Possible conditions",
      "doctor_type": "Type of doctor to consult",
      "disclaimer": "Medical disclaimer"
    }
    `;

    // Access the Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    try {
      // Parse the response text as JSON
      const text = response.text();
      // Extract JSON from the response (handling potential markdown code blocks)
      const jsonStr = text.includes('```json') 
        ? text.split('```json')[1].split('```')[0].trim() 
        : text.includes('```') 
          ? text.split('```')[1].split('```')[0].trim()
          : text;
      
      const analysisResult = JSON.parse(jsonStr) as AnalysisResult;
      
      return {
        result: analysisResult
      };
    } catch (jsonError) {
      console.error('Error parsing JSON response:', jsonError);
      
      // Fallback in case JSON parsing fails
      return {
        result: {
          summary: 'Unable to properly analyze symptoms.',
          conditions: 'Analysis not available.',
          doctor_type: 'Please consult with your primary care physician.',
          disclaimer: 'This is not a medical diagnosis. Always consult with healthcare professionals.',
        },
        error: 'Failed to parse analysis results.',
      };
    }
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    return {
      error: 'Failed to analyze symptoms. Please try again.',
      result: {
        summary: '',
        conditions: '',
        doctor_type: '',
        disclaimer: 'This is not a medical diagnosis. Always consult with healthcare professionals.',
      },
    };
  }
}