import { toast } from "sonner";
import { env } from "../..//env.js";
// import { fetchAiResponse } from "./fetchAiResponse";
import geminiFetch from "./gemini";
import fetchIndicators from "./fetchIndicators";

export const fetchForexData = async (selectedPair: string): Promise<any> => {
  const apiKey = env.NEXT_PUBLIC_TD_API;
  const baseUrl = "https://marketdata.tradermade.com/api/v1/timeseries";

  const now = new Date();
  const past3Days = new Date(now);
  past3Days.setUTCDate(now.getUTCDate() - 4);
  past3Days.setUTCHours(0, 0, 0, 0);

  const formatDate = (date: Date) =>
    date.toISOString().slice(0, 16).replace("T", "-");

  const startDate = formatDate(past3Days);
  const endDate = formatDate(now);

  if (!apiKey) {
    throw new Error("API key is missing. Please check your environment variables.");
  }
  const url = `${baseUrl}?api_key=${apiKey}&currency=${selectedPair}&format=records&start_date=${startDate}&end_date=${endDate}&interval=minute&period=30`;

  try {
    const response = await fetch(url);
    const chartResult = await response.json();
    if (chartResult.status === "error" || chartResult.error) {
      throw new Error(chartResult.message || "Failed to fetch forex data");
    } else {
      toast("Success", {
        description: `Fetched chart from ${startDate} to ${endDate}`,
      });
    }
    console.log(chartResult);
    // Process with AI API and return the trade data
    // const aiResult = await fetchAiResponse(chartResult);
    // return aiResult;

    // Get Technical Indicators
    try {
      const indicators = await fetchIndicators(selectedPair)
      console.log(indicators)
      if (indicators) {
        // Get AI Analysis
        try {
          const aiResult = await geminiFetch(chartResult, indicators)
          console.log("takeProfit: " + aiResult.takeProfit)
          return aiResult

        } catch (error) {
          console.error("Error fetching AI response:", error);
        }
      }
    }
    catch (error) {
      console.log(error)
    }


  } catch (error) {
    throw new Error("Something went wrong while fetching forex data");
  }
};

