"use server"
import axios from "axios"

const apiKey = process.env.NEXT_PUBLIC_TWELVE_DATA_API
const apiUrl = 'https://api.twelvedata.com/batch';

export default async function fetchIndicators(selectedPair: string) {

  // Format Currency Pair
  const pairSplit = Array.from(selectedPair)
  pairSplit.splice(3, 0, '/')
  const pair = pairSplit.join('')


  const requestData = {
    ema: {
      url: `/ema?symbol=${pair}&interval=4h&apikey=${apiKey}&outputsize=100`
    },
    ad: {
      url: `/ad?symbol=${pair}&interval=4h&apikey=${apiKey}&outputsize=30`
    },
    atr: {
      url: `/atr?symbol=${pair}&interval=4h&apikey=${apiKey}&outputsize=30`
    },
    macd: {
      url: `/macd?symbol=${pair}&interval=4h&apikey=${apiKey}&outputsize=100`
    },
    rsi: {
      url: `/rsi?symbol=${pair}&interval=4h&apikey=${apiKey}&outputsize=100`
    },
  };

  try {
    const results = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // console.log(JSON.stringify(results.data, null, 2))
    return results.data
    // console.log(results.data.data.rsi.response.code)
    // (JSON.stringify(results.data, null, 2))
  } catch (error) {
    console.error('Error:', error);
  }

}

