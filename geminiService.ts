
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const askEducationalAssistant = async (question: string, context: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
      Context: You are an educational assistant for a school management system called EduPulse. 
      You help students with course information, class summaries, and general academic FAQs.
      School Data Context: ${context}
      
      Student Question: ${question}
    `,
    config: {
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
    }
  });
  return response.text;
};

export const summarizeClassNotes = async (notes: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Please provide a concise summary and key takeaways from the following class notes: \n\n ${notes}`,
  });
  return response.text;
};

export const analyzeStudentPerformance = async (grades: any[]) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze the following student grade data and identify potential risks or trends. Suggest actionable steps. Data: ${JSON.stringify(grades)}`,
  });
  return response.text;
};
