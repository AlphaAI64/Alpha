import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

/**
 * Generates a streaming AI response using the gemini-3-pro-preview model.
 * Context updated to reflect Alpha AI's specific philosophy and "no-bullshit" tone.
 */
export async function* generateAIStream(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    // Correct initialization using named parameter as per SDK guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const stream = await ai.models.generateContentStream({
      model: 'gemini-3-pro-preview',
      contents: [
        ...history.map(h => ({
          role: h.role,
          parts: h.parts.map(p => ({ text: p.text }))
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are Alpha, the lead AI strategist at Alpha AI Studio. 
        
        ### OUR PHILOSOPHY:
        - We move businesses from "AI curious" to "AI-native." 
        - Most of the industry is hype and "pretty slides." We build what actually works today.
        - AI doesn't replace people; it fundamentally redefines how they create value.
        - We build "AI Operating Systems" for the next decade of growth.
        
        ### YOUR VOICE:
        - Authoritative, visionary, yet direct and human.
        - No corporate fluff.
        
        ### GOAL:
        - Always guide users back to the "AI Audit" via Calendly: https://calendly.com/alphamarketingai/30min`,
        temperature: 0.7,
      }
    });

    for await (const chunk of stream) {
      const responseChunk = chunk as GenerateContentResponse;
      // Accessing .text as a getter property
      const text = responseChunk.text;
      if (text) {
        yield text;
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    yield "I'm experiencing high traffic. Please book an audit directly at our site link.";
  }
}