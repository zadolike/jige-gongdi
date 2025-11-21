import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let aiClient: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (API_KEY && !aiClient) {
    aiClient = new GoogleGenAI({ apiKey: API_KEY });
  }
};

export const generateForemanResponse = async (
  message: string,
  history: { role: string; text: string }[]
): Promise<string> => {
  if (!aiClient) initializeGemini();
  if (!aiClient) return "咯咯哒！(API Key未配置，无法连接大脑)";

  try {
    const systemInstruction = `
      你是一个名为“鸡工头”的建筑工地智能助手。
      你的性格：勤奋、严格但有趣，说话喜欢带一点“咯咯”、“咕咕”的语气词。
      你的职责：回答关于工地安全、进度管理、搬砖技巧的问题。
      如果有人问不相关的问题，礼貌地拒绝并建议他们去搬砖。
      请用中文回答，保持简短有力。
    `;

    // Construct the prompt with history for context
    // Note: For a real chat app we would use chat.sendMessage, but for this stateless service demo
    // we will construct a single prompt block or use the proper chat history object if persistence was robust.
    // Here we act as a simple transactional query for simplicity.
    
    const response: GenerateContentResponse = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "咕咕？我没听清。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "咯咯...服务器出错了，请稍后再试。";
  }
};