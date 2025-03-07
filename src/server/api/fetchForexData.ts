import { env } from "~/env.js"

export const fetchForexData = async (selectedPair: string): Promise<any> => {
  const apiKey = env.NEXT_PUBLIC_TD_API; // Use env variable
  const baseUrl = "https://marketdata.tradermade.com/api/v1/timeseries";

  if (!apiKey) {
    throw new Error("API key is missing. Please check your environment variables.");
  }
  // const url = " https://marketdata.tradermade.com/api/v1/timeseries?api_key=4T9goAaU31ltEjEuk25w&currency=XAUUSD&format=records&start_date=2025-03-06-11:11&end_date=2025-03-07-11:11&interval=minute&period=15"
  const url = `${baseUrl}?
            api_key=${apiKey}
            &curency=${selectedPair}
            &format=records
            &start_date=2025-03-06-11:11
            &end_date=2025-03-07-11:11
            &interval=minute
            &period=15`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(selectedPair)
    // If API returns an error, throw an error to be caught in the component
    if (result.status === "error" || result.error) {
      throw new Error(result.message || "Failed to fetch forex data");
    }

    return result;
  } catch (error) {
    throw new Error("Something went wrong while fetching forex data");
  }
};

