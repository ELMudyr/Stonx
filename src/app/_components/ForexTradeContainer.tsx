"use client";

import * as React from "react";
import ForexSelector, { TradeData } from "./ForexSelector";
import HandleCardDisplay from "./HandleCardDisplay";

const ForexTradeContainer = () => {
  const [trades, setTrades] = React.useState<TradeData[]>([]);
  const [savedTrades, setSavedTrades] = React.useState<TradeData[]>([]);
  const [loading, setLoading] = React.useState(false);

  // Function that will be called when the Fetch Data button is clicked
  const handleFetchClick = () => {
    console.log("Fetch button clicked, setting loading to true");
    setLoading(true);
  };

  // Function that will be called when trade data is received
  const handleNewTradeData = (trade: TradeData) => {
    console.log("Trade data received, adding to list and setting loading to false");
    setTrades((prev) => [trade, ...prev]); // Add new trade on top
    setLoading(false);
  };

  // // Function to clear saved trades from both localStorage and state
  // const clearSavedTrades = () => {
  //   localStorage.removeItem("SavedTrades"); // Remove saved trades from localStorage
  //   setSavedTrades([]); // Clear the state
  // };

  // Load saved trades from localStorage
  React.useEffect(() => {
    const storedData = localStorage.getItem("SavedTrades");
    if (storedData) {
      setSavedTrades(JSON.parse(storedData));
    }
  }, []);
  return (
    <div className=" overflow-y-hidden flex flex-col items-center">
      <ForexSelector
        onTradeData={handleNewTradeData}
        onFetchClick={handleFetchClick}
      />

      <div className="grid  container gap-8 my-8 items-center w-screen justify-items-stretch">
        <div className="w-fit flex flex-col self-start  justify-self-center">
          <HandleCardDisplay tradeData={trades} loading={loading} />
        </div>
      </div>
      {/* <Chart /> */}
    </div>
  );
};

export default ForexTradeContainer;
