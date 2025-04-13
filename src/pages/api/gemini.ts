import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../types';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Gen AI SDK with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed', 
      result: { summary: '', conditions: '', doctor_type: '', disclaimer: '' } 
    });
  }

  const { transcript } = req.body;

  if (!transcript) {
    return res.status(400).json({ 
      error: 'Transcript is required', 
      result: { summary: '', conditions: '', doctor_type: '', disclaimer: '' } 
    });
  }

  try {
    // Create a prompt for the Gemini model
    const prompt = `
      You are a medical triage assistant. Analyze the following symptom description and provide:
      1. A brief summary of the symptoms described
      2. 1-2 possible medical condition categories (not specific diagnoses)
      3. What type of doctor the person should consider seeing
      4. A medical disclaimer

      Format your response as a JSON object with these fields:
      {
        "summary": "brief summary of symptoms",
        "conditions": "1-2 possible condition categories",
        "doctor_type": "recommended medical professional",
        "disclaimer": "standard medical disclaimer"
      }

      Symptom description: "${transcript}"
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
      
      const analysisResult = JSON.parse(jsonStr);
      
      return res.status(200).json({ result: analysisResult });
    } catch (jsonError) {
      console.error('Error parsing JSON response:', jsonError);
      
      // Fallback in case JSON parsing fails
      return res.status(500).json({
        error: 'Failed to parse analysis results',
        result: {
          summary: 'Unable to properly analyze symptoms.',
          conditions: 'Analysis not available.',
          doctor_type: 'Please consult with your primary care physician.',
          disclaimer: 'This is not a medical diagnosis. Always consult with healthcare professionals.'
        }
      });
    }
  } catch (error) {
    console.error('Error processing request', error);
    return res.status(500).json({ 
      error: 'Failed to analyze symptoms', 
      result: { summary: '', conditions: '', doctor_type: '', disclaimer: '' } 
    });
  }
}
