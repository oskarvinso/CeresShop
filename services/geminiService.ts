
import { GoogleGenAI, Type } from "@google/genai";

export const geminiService = {
  async generateListingOptimization(title: string, details: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Actúa como un experto redactor de productos para bebés. Tengo un anuncio titulado "${title}" con estos detalles: "${details}". Genera una descripción de producto cálida, confiable y atractiva (máx. 100 palabras) en ESPAÑOL y sugiere un rango de precio justo para un artículo de segunda mano en Pesos Colombianos (COP). Salida como JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            optimizedDescription: { type: Type.STRING },
            suggestedPriceRange: { type: Type.STRING }
          },
          required: ["optimizedDescription", "suggestedPriceRange"]
        }
      }
    });
    return JSON.parse(response.text);
  },

  async getParentingAdvice(question: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Eres un mentor de crianza cálido, solidario y experto. Responde esta pregunta de un padre primerizo: "${question}". Mantén una respuesta alentadora, basada en evidencia y empática en ESPAÑOL.`,
      config: {
        systemInstruction: "Prioriza siempre la seguridad y el bienestar. Si se necesita consejo médico, recomienda consultar con un pediatra. Responde siempre en español."
      }
    });
    return response.text;
  }
};
