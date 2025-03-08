import Groq from 'groq-sdk';
import { env } from '~/env.js';
import type { TradeData } from '~/app/_components/ForexSelector';

type QuoteData = {
  price: number;
  time: string;
};

type ChartResult = {
  quotes: QuoteData[];
};

// Initialize Groq client
const groq = new Groq({
  apiKey: env.NEXT_PUBLIC_GROQ_API,
  dangerouslyAllowBrowser: true
});

// System prompt for the AI
const SYSTEM_PROMPT = `You are a Professional Daytime trader, with the ability to apply chart technical analysis to predict entry positions for maximum profit for a $100 trading account with 100% leverage.
          
Analyze the data provided from the last 24Hrs and only provide a response if you're sure that the trade is profitable, or else respond with a few lines stating when to enter, keeping in mind other market openings and the date which might impact the price's volatility.
Respond in JSON format providing:
- position (Long or Short)
- entry (number)
- takeProfit (array of numbers or single number)
- stopLoss (number)
- lotSize (number)
- risk (number)
- timeEst (number of hours)
- winRate (percentage number)
- description (string)
- profit (dollar amount number)`;

// Add throttling to prevent rate limiting
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
let lastCallTime = 0;
const MIN_CALL_INTERVAL = 30000; // 30 seconds

export async function fetchAiResponse(chartResult: ChartResult): Promise<TradeData | null> {
  try {
    if (!chartResult?.quotes || chartResult.quotes.length === 0) {
      console.error('Missing or empty quotes data');
      return null;
    }

    // Throttle API calls
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;
    if (timeSinceLastCall < MIN_CALL_INTERVAL) {
      const waitTime = MIN_CALL_INTERVAL - timeSinceLastCall;
      console.log(`Waiting ${waitTime}ms to avoid rate limiting`);
      await delay(waitTime);
    }

    lastCallTime = Date.now();

    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: JSON.stringify(chartResult.quotes) }
      ],
      model: 'deepseek-r1-distill-llama-70b',
      temperature: 0.6,
      max_completion_tokens: 4096,
      top_p: 0.95,
      stream: false,
      response_format: { type: 'json_object' }
    });

    const aiMessage = response.choices?.[0]?.message?.content;

    if (!aiMessage) {
      throw new Error('AI response is empty or invalid.');
    }

    try {
      // Parse JSON response
      const rawResponse = JSON.parse(aiMessage);

      // Map the AI response to our expected format
      const parsedResponse: TradeData = {
        position: rawResponse.position || rawResponse.Position || '',
        entry: rawResponse.entry || rawResponse['Entry Point'] || 0,
        takeProfit: rawResponse.takeProfit || rawResponse['Take Profit'] || 0,
        stopLoss: rawResponse.stopLoss || rawResponse['Stop Loss'] || 0,
        lotSize: rawResponse.lotSize || rawResponse['Lot size'] || 0,
        risk: rawResponse.risk || rawResponse['Risk %'] || 0,
        timeEst: rawResponse.timeEst || rawResponse.TimeEst || 0,
        winRate: rawResponse.winRate || rawResponse['Winrate %'] || 0,
        description: rawResponse.description || rawResponse.Description || '',
        profit: rawResponse.profit || rawResponse['Profit$'] || 0
      };

      return parsedResponse;
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      throw new Error('Invalid JSON response from AI');
    }
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return null;
  }
}
