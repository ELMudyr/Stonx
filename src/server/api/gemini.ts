"use server"
import { GoogleGenAI, Type } from "@google/genai";
const genAI = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API });

export default async function geminiFetch(chartResult: any, indicators: any, news: any) {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      // contents: "Explain ai to me in a few words "
      contents: JSON.stringify(chartResult.quotes) + indicators + news,
      config: {
        systemInstruction: `
You are a professional trader skilled in technical analysis, specializing in optimizing entry positions for a $3,000 trading account with 50% broker leverage.

Analyze the provided chart data and with the help of the technical indicators provided, 

Response Format (JSON):

    Position: "Long" or "Short", Suggect a "Wait" position if needed

    Entry Point: (Exact price)

    Take Profit: (Target price, avoid reaching exact price and play it safe)

    Stop Loss: (Risk limit)

    Lot Size: (Exact input for MetaTrader)

    Risk %: (Risk allocation)

    TimeEst: (Estimated time in hours to reach TP, ideally 1 hour)

    Winrate %: (Probability of hitting TP)

    Description: (HTML-formatted rationale with <br/> line breaks,aim for 10 lines maximum, technical indicators analysis should be in bullet points, exclude numbers for TI only abreviations) 

    Profit$: (Estimated USD profit)
`,
        temperature: 1,
        topP: 1,
        topK: 64,
        maxOutputTokens: 65536,
        responseModalities: [],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            takeProfit: {
              type: Type.NUMBER
            },
            stopLoss: {
              type: Type.NUMBER
            },
            entry: {
              type: Type.NUMBER
            },
            position: {
              type: Type.STRING
            },
            lotSize: {
              type: Type.NUMBER
            },
            risk: {
              type: Type.NUMBER
            },
            timeEst: {
              type: Type.NUMBER
            },
            winRate: {
              type: Type.NUMBER
            },
            profitUSD: {
              type: Type.NUMBER
            },
            description: {
              type: Type.STRING
            }
          },
          required: [
            "description",
            "position"
          ]
        },
      }
    });
    // Ensure response.text is not undefined before parsing
    if (!response.text) {
      throw new Error("Response text is undefined");
    }

    const parsedResponse = JSON.parse(response.text);

    console.log(parsedResponse); // Check the full object
    console.log("Description:", parsedResponse.description);
    console.log("Position:", parsedResponse.position);

    return parsedResponse;
  } catch (error) {
    console.error("AI ERR:", error);
    return null; // Return null to handle errors gracefully
  }
}
