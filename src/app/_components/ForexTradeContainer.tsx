"use client";
import * as React from "react";
import ForexSelector, { TradeData } from "./ForexSelector";
import HandleCardDisplay from "./HandleCardDisplay";

const ForexTradeContainer = () => {
  const [trades, setTrades] = React.useState<TradeData[]>([]);
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

  return (
    <div className="space-y-6 flex flex-col items-center">
      <ForexSelector
        onTradeData={handleNewTradeData}
        onFetchClick={handleFetchClick}
      />
      <HandleCardDisplay tradeData={trades} loading={loading} />
    </div>
  );
};

export default ForexTradeContainer;
