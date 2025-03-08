import Groq from 'groq-sdk';
import { env } from "~/env.js"

const groq = new Groq({ apiKey: env.NEXT_PUBLIC_GROQ_API, dangerouslyAllowBrowser: true });

export async function fetchAiResponse(chartResult: any) {

  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
  // console.log(forexData)
  async function getGroqChatCompletion() {
    return groq.chat.completions.create({
      "messages": [
        {
          "role": "system",
          "content": "You are a Professional Daytime trader, with the ability to apply chart technical analysis to predict entry positions for maximum profit for a 100$ trading account with 100% leverage.\nAnalyze the data provided from the last 24Hrs and only provide a response if you're sure that the trade is profitable or else respond with a few lines stating when to enter, keeping in mind other market openings and the date which might impact the price's volatility.\n\nRespond in JSON format providing:\n-Position(Long or Short)\n-Entry Point.\n-Take Profit (Could be multiple depending on the trade)\n-Stop Loss\n-Lot size(Exact number to be entered in metamask)\n-Risk %\n-TimeEst (Time estimated in hours to reach the TP)\n-winrate % (Estimated % to achieve the TP based on the analysis)\n-description (a few lines detailing what made you take the position)\n-Profit$(Estimated Profit in usd)"
        },
        {
          "role": "user",
          "content": JSON.stringify(chartResult.quotes)
        }
      ],
      "model": "deepseek-r1-distill-llama-70b",
      "temperature": 0.6,
      "max_completion_tokens": 4096,
      "top_p": 0.95,
      "stream": false,
      "response_format": {
        "type": "json_object"
      },
      "stop": null
    });
  }


}
