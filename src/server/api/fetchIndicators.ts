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
    return (JSON.stringify(results.data, null, 2))
  } catch (error) {
    console.error('Error:', error);
  }

  //
  //
  // console.log("API: " + polygonAPI)
  // taapi.resetBulkConstructs();
  // taapi.setProvider("polygon", polygonAPI)
  //
  // // Add calculations
  // taapi.addCalculation("rsi", "EUR/USD", "1d", "rsi_1h");
  // // taapi.addCalculation("macd", pair, "1h", "macd_1h");
  // // taapi.addCalculation("ema", pair, "1h", "ema_fast_1h", { period: 9, backtrack: 1 });
  // // taapi.addCalculation("ema", pair, "1h", "ema_slow_1h", { period: 20, backtrack: 1 });
  // try {
  //   taapi.executeBulk("forex").then(results => {
  //     console.log(results);
  //   });
  // }
  // catch (error) {
  //   console.error("Indicator Error: " + error.response.data)
  // }
}

