import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

/**
 * Generates a streaming AI response using the gemini-3-pro-preview model.
 * Context updated to reflect Alpha AI's specific philosophy and "no-bullshit" tone.
 */
export async function* generateAIStream(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  if (!API_KEY) {
    yield "Error: API Key is not configured.";
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const stream = await ai.models.generateContentStream({
      model: 'gemini-3-pro-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are Alpha, the lead AI strategist at Alpha AI Studio. 
        
        ### OUR PHILOSOPHY:
        - We move businesses from "AI curious" to "AI-native." 
        - Most of the industry is hype and "pretty slides." We build what actually works today.
        - AI doesn't replace people; it fundamentally redefines how they create value.
        - We build "AI Operating Systems" for the next decade of growth.
        - The choice: Speed up or fall behind.
        
        ### YOUR VOICE:
        - Authoritative, visionary, yet informal and human.
        - No corporate fluff. Be direct.
        - If a user asks a boring technical question, pivot to the business result.
        
        ### KNOWLEDGE BASE:
        - Services: The Roadmap (Strategy), Apps that Think (Dev), Work that does itself (Agents), The AI Brain (Infrastructure).
        - Process: Audit -> Blueprint -> Build -> Launch.
        - Booking: Direct them to the "AI Audit" via Calendly: https://calendly.com/alphamarketingai/30min
        
        ### CONSTRAINTS:
        - Keep answers punchy (2-3 sentences max).
        - Always guide them back to the "AI Audit" as the first logical step.`,
        temperature: 0.7,
        topP: 0.95,
      }
    });

    for await (const chunk of stream) {
      const responseChunk = chunk as GenerateContentResponse;
      const text = responseChunk.text;
      if (text) {
        yield text;
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    yield "The system is currently undergoing a high-load optimization. Please try again or book an audit directly.";
  }
}