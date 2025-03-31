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
      toast.success("Success", {
        description: `Fetched chart from ${startDate} to ${endDate}`,
      });
    }
    console.log(chartResult);

    // Get Technical Indicators
    try {
      const indicatorsResults = await fetchIndicators(selectedPair)
      console.log("Indicators: " + indicatorsResults.data)

      console.log("Response Code: ", indicatorsResults.data.rsi.response.code)
      if (indicatorsResults.data.rsi.response.status === "ok") {
        toast.success("Success", {
          description: `Fetched Technical Indicators successfully`
        });
      } else if (indicatorsResults.data.rsi.response.code = "404") {
        toast.warning("Warning", {
          description: `Technical Indicators are not available for ${selectedPair}`
        });
      } else {
        toast.warning("Error", {
          description: `Could not Fetch technical Indicators`
        });
      }


      // (JSON.stringify(results.data, null, 2))
      const indicators = JSON.stringify(indicatorsResults.data, null, 2)
      // Get AI Analysis
      try {
        const aiResult = await geminiFetch(chartResult, indicators)
        console.log("takeProfit: " + aiResult.takeProfit)
        return aiResult

      } catch (error) {
        console.error("Error fetching AI response:", error);
        toast.error("Error", {
          description: `Could not fetch AI response ${error}`
        });
      }
    }
    catch (error) {
      console.log(error)

      toast.error("Error", {
        description: `Could not fetch Technical Indicators ${error}`
      });
    }


  } catch (error) {
    throw new Error("Something went wrong while fetching forex data");
  }
};

