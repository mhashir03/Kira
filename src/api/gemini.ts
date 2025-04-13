import { AnalysisResult } from '../types';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API with your key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function analyzeSymptoms(transcript: string, imageFile?: File) {
  try {
    // Build the prompt
    const promptText = `
    You are a clinical assistant AI trained to help analyze patient input using both textual and visual information.
    
    You will receive:
    - A patient transcript describing symptoms
    - An optional image (e.g., rash, wound, swelling)
    
    Your goal is to:
    1. **Analyze the symptoms** described in the transcript for clarity and clinical relevance.
    2. **Analyze the image**, identifying any visual signs (e.g., color, texture, swelling, abnormality). If no image is provided, state that explicitly.
    3. **Correlate findings** from the image and the transcript. Do the visual signs confirm or contradict the described symptoms?
    4. **Suggest possible medical conditions** based on both inputs. Be specific and consider plausible differential diagnoses, not just general possibilities.
    5. **Recommend what type of doctor** the patient should consult (e.g., dermatologist, general physician, orthopedist).
    6. Provide a clear **medical disclaimer**.
    
    ### Output Format (JSON):
    
    {
      "summary": "Clear summary of the described symptoms",
      "image_analysis": "Detailed analysis of the image or 'No image provided'",
      "correlation": "How the image supports or contradicts the symptoms",
      "conditions": "Specific possible conditions or differential diagnoses",
      "doctor_type": "Type of doctor to consult",
      "disclaimer": "Not a diagnosis. Always consult a licensed medical professional."
    }
    
    Transcript:
    "${transcript}"
    `;
    


    // Prepare the model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Convert image file to base64 if present
    let imagePart = null;
    if (imageFile) {
      const base64 = await readFileAsBase64(imageFile);
      imagePart = {
        inlineData: {
          mimeType: imageFile.type,
          data: base64.split(',')[1], // Remove data URL prefix
        },
      };
    }

    // Construct parts: always include text, optionally add image
    const parts = imagePart
      ? [{ text: promptText }, imagePart]
      : [{ text: promptText }];

    const result = await model.generateContent({ contents: [{ role: 'user', parts }] });
    const text = result.response.text();

    // Extract JSON from the response
    const jsonStr = text.includes('```json')
      ? text.split('```json')[1].split('```')[0].trim()
      : text.includes('```')
        ? text.split('```')[1].split('```')[0].trim()
        : text;

    const analysisResult = JSON.parse(jsonStr) as AnalysisResult;

    return { result: analysisResult };
  } catch (error) {
    console.error('Gemini analysis failed:', error);
    return {
      error: 'Failed to analyze symptoms. Please try again.',
      result: {
        summary: '',
        conditions: '',
        doctor_type: '',
        disclaimer: 'This is not a medical diagnosis. Always consult a healthcare professional.',
      },
    };
  }
}

// Helper function to read file as base64
function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
