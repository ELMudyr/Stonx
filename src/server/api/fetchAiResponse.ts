import Groq from 'groq-sdk';
import { env } from '~/env.js';

const groq = new Groq({
  apiKey: env.NEXT_PUBLIC_GROQ_API,
  dangerouslyAllowBrowser: true,
});

export async function fetchAiResponse(chartResult: any) {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a Professional Daytime trader, with the ability to apply chart technical analysis to predict entry positions for maximum profit for a $100 trading account with 100% leverage.
          
Analyze the data provided and only provide a response if you're sure that the trade is profitable, or else respond with a few lines stating when to enter, keeping in mind other market openings and the date which might impact the price's volatility.

Respond in JSON format providing:
- Position (Long or Short)
- Entry Point
- Take Profit
- Stop Loss
- Lot size (Exact number to be entered in Metatrader)
- Risk %
- TimeEst (Time estimated in hours to reach the TP)
- Winrate % (Estimated % to achieve the TP based on the analysis)
- Description (a few lines detailing what made you take the position)
- Profit$ (Estimated Profit in USD)`,
        },
        {
          role: 'user',
          content: JSON.stringify(chartResult.quotes),
        },
      ],
      model: 'deepseek-r1-distill-llama-70b',
      temperature: 0.6,
      max_completion_tokens: 4096,
      top_p: 0.95,
      stream: false,
      response_format: { type: 'json_object' },
    });

    const aiMessage = response.choices?.[0]?.message?.content;

    if (!aiMessage) {
      throw new Error('AI response is empty or invalid.');
    }

    // Parse the JSON string into an object
    let aiResult;
    try {
      aiResult = JSON.parse(aiMessage);
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      throw new Error("AI response parsing failed");
    }

    return aiResult;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return null;
  }
}

