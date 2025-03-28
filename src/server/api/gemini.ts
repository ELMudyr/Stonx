"use server"
import { GoogleGenAI, Type } from "@google/genai";
const genAI = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API });

export default async function geminiFetch(chartResult: any) {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-pro-exp-03-25",
      // contents: "Explain ai to me in a few words "
      contents: JSON.stringify(chartResult.quotes),
      config: {
        systemInstruction: `You are a Professional  trader, with the ability to apply chart technical analysis to predict entry positions for maximum profit for a $3000 trading account with 50% broker leverage.\n\n Analyze the chart data provided and only provide a response if you're sure that the trade is profitable, or else return a desciption only providing when to enter the trade, keeping in mind other market openings and the date which might impact the price's volatility.\n\n   You are in no position to feel obligated to suggest a trade, if you see that the data is not enought for analysis or the investor should wait for a specific break through before taking the trade respond in the description section.\n\n   Respond using this JSON object schema:\n   - Position (either Long , Short or Wait)\n   - Entry Point\n   - Take Profit\n   - Stop Loss\n   - Lot size (Exact number to be entered in Metatrader)\n   - Risk %\n   - TimeEst (Time estimated in hours to reach the TP preferably 1hour)\n   - Winrate % (Estimated % to achieve the TP based on the analysis)\n   - Description (a few lines detailing what made you take the position make sure you format it to be humandly readable using '\n')\n   - Profit$ (Estimated Profit in USD)`,
        temperature: 0.25,
        topP: 0.95,
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
