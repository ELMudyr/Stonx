import { toast } from "sonner";
import { env } from "~/env.js"
import { fetchAiResponse } from "./fetchAiResponse";

export const fetchForexData = async (selectedPair: string): Promise<any> => {
  const apiKey = env.NEXT_PUBLIC_TD_API; // Use env variable
  const baseUrl = "https://marketdata.tradermade.com/api/v1/timeseries";

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setUTCDate(now.getUTCDate() - 1); // Go to the same time yesterday in GMT
  yesterday.setUTCHours(0, 0, 0, 0); // Set time to 00:00:00

  const formatDate = (date: Date) => date.toISOString().slice(0, 16).replace("T", "-"); // Format date

  const startDate = formatDate(yesterday)
  const endDate = formatDate(now)

  if (!apiKey) {
    throw new Error("API key is missing. Please check your environment variables.");
  }
  const url = `${baseUrl}?api_key=${apiKey}&currency=${selectedPair}&format=records&start_date=${startDate}&end_date=${endDate}&interval=minute&period=15`;

  try {
    const response = await fetch(url);
    const chartResult = await response.json();
    // If API returns an error, throw an error to be caught in the component
    if (chartResult.status === "error" || chartResult.error) {
      throw new Error(chartResult.message || "Failed to fetch forex data");
    } else {
      toast(
        "Success", {
        description: `Fetched chart from ${startDate} to ${endDate}`
      });
    }
    console.log(chartResult)
    await fetchAiResponse(chartResult)
    return chartResult;
  } catch (error) {
    throw new Error("Something went wrong while fetching forex data");
  }
};
