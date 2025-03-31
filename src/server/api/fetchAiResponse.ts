import Groq from 'groq-sdk';
import { env } from '~/env.js';
//
// const groq = new Groq({
//   apiKey: env.NEXT_PUBLIC_GROQ_API,
//   dangerouslyAllowBrowser: true,
// });
//
// export async function fetchAiResponse(chartResult: any) {
//   try {
//     const response = await groq.chat.completions.create({
//       messages: [
//         {
//           role: 'system',
//           content: `You are a Professional Daytime trader, with the ability to apply chart technical analysis to predict entry positions for maximum profit for a $100 trading account with 100% leverage.
//
// Analyze the data provided and only provide a response if you're sure that the trade is profitable, or else respond with a few lines stating when to enter, keeping in mind other market openings and the date which might impact the price's volatility.
//
// You are in no position to feel obligated to suggest a trade, if you see that the data is not enought for analysis or the investor should wait for a specific break through before taking the trade respond in the description section.
//
// Respond in JSON format providing:
// - Position (either Long or Short based on chart history)
// - Entry Point
// - Take Profit
// - Stop Loss
// - Lot size (Exact number to be entered in Metatrader)
// - Risk %
// - TimeEst (Time estimated in hours to reach the TP preferably 1hour)
// - Winrate % (Estimated % to achieve the TP based on the analysis)
// - Description (a few lines detailing what made you take the position)
// - Profit$ (Estimated Profit in USD)`,
//         },
//         {
//           role: 'user',
//           content: JSON.stringify(chartResult.quotes),
//         },
//       ],
//       model: "deepseek-r1-distill-llama-70b",
//       temperature: 0.6,
//       max_completion_tokens: 4096,
//       top_p: 0.95,
//       stream: false,
//       response_format: { type: 'json_object' },
//     });
//
//     const aiMessage = response.choices?.[0]?.message?.content;
//
//     if (!aiMessage) {
//       throw new Error('AI response is empty or invalid.');
//     }
//
//     // Parse the JSON string into an object
//     let aiResult;
//     try {
//       aiResult = JSON.parse(aiMessage);
//     } catch (parseError) {
//       console.error("Error parsing AI response:", parseError);
//       throw new Error("AI response parsing failed");
//     }
//
//     return aiResult;
//   } catch (error) {
//     console.error('Error fetching AI response:', error);
//     return null;
//   }
// }
//
//

// import { GoogleGenAI, Type } from "@google/genai";
// // const apiKey = process.env.GEMINI_API_KEY;
// const genAI = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API });
//
// export async function fetchAiResponse(chartResult: any) {
//   const response = await genAI.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: "Explain how AI works",
//   });
//   console.log(response.text);
//   // try {
//   //   const response = await genAI.models.generateContent({
//   //     model: "gemini-2.5-pro-exp-03-25",
//   //     contents: JSON.stringify(chartResult),
//   //     config: {
//   //       systemInstruction: "You are a Professional  trader, with the ability to apply chart technical analysis to predict entry positions for maximum profit for a $3000 trading account with 50% broker leverage.\n\n Analyze the chart data provided and only provide a response if you're sure that the trade is profitable, or else return a desciption only providing when to enter the trade, keeping in mind other market openings and the date which might impact the price's volatility.\n\n   You are in no position to feel obligated to suggest a trade, if you see that the data is not enought for analysis or the investor should wait for a specific break through before taking the trade respond in the description section.\n\n   Respond using this JSON object schema:\n   - Position (either Long or Short based on chart history)\n   - Entry Point\n   - Take Profit\n   - Stop Loss\n   - Lot size (Exact number to be entered in Metatrader)\n   - Risk %\n   - TimeEst (Time estimated in hours to reach the TP preferably 1hour)\n   - Winrate % (Estimated % to achieve the TP based on the analysis)\n   - Description (a few lines detailing what made you take the position)\n   - Profit$ (Estimated Profit in USD)\n",
//   //       temperature: 0.25,
//   //       topP: 0.95,
//   //       topK: 64,
//   //       maxOutputTokens: 65536,
//   //       responseModalities: [],
//   //       responseMimeType: "application/json",
//   //       responseSchema: {
//   //         type: Type.OBJECT,
//   //         properties: {
//   //           takeProfit: {
//   //             type: Type.NUMBER
//   //           },
//   //           stopLoss: {
//   //             type: Type.NUMBER
//   //           },
//   //           position: {
//   //             type: Type.STRING
//   //           },
//   //           lotSize: {
//   //             type: Type.NUMBER
//   //           },
//   //           riskPercentage: {
//   //             type: Type.NUMBER
//   //           },
//   //           timeEst: {
//   //             type: Type.NUMBER
//   //           },
//   //           winRate: {
//   //             type: Type.NUMBER
//   //           },
//   //           profitUSD: {
//   //             type: Type.NUMBER
//   //           },
//   //           description: {
//   //             type: Type.STRING
//   //           }
//   //         },
//   //         required: [
//   //           "description"
//   //         ]
//   //       },
//   //     }
//   //   });
//   //   console.log(response)
//   // } catch (error) {
//   //   console.error("AI ERR" + error)
//   // }
// }
//
