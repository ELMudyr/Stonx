"use client"
import axios from "axios"

const apiKey = process.env.NEXT_PUBLIC_TWELVE_DATA_NEWS_API
export default async function fetchNews(selectedPair: string) {

  //Split Currency Pair
  const firstCurrency = selectedPair.slice(0, 3)
  const secondCurrency = selectedPair.slice(3, 6)
  const date = new Date();
  date.setDate(date.getDate() - 7); // Subtract 7 days

  const fromDate = date.getFullYear().toString() +
    String(date.getMonth() + 1).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0') + 'T' +
    String(date.getHours()).padStart(2, '0') +
    String(date.getMinutes()).padStart(2, '0');

  const requestData =
    `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=FOREX:${firstCurrency},FOREX:${secondCurrency}&time_from=${fromDate}&limit=10&sort=RELEVANCE&apikey=${apiKey}`

  try {
    const results = await axios.get(requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("NEWS: ", results)
    // console.log(JSON.stringify(results.data, null, 2))
    return results.data
    // console.log(results.data.data.rsi.response.code)
    // (JSON.stringify(results.data, null, 2))
  } catch (error) {
    console.error('Error:', error);
  }

}

