import React, { useEffect, useState } from "react";
import HomeCard from "./HomeCard";
import CardSkeleton from "./components/ui/cardSkeleton";
import { TradeData } from "./ForexSelector";
import CardAnimation from "./components/animations/cardAnimation";
import ClearCards from "./ClearCards"; // Import the ClearButton

const STORAGE_KEY = "SavedTrades";

interface HandleCardDisplayProps {
  tradeData: TradeData[];
  loading: boolean;
}

const HandleCardDisplay: React.FC<HandleCardDisplayProps> = ({
  tradeData,
  loading,
}) => {
  const [savedTrades, setSavedTrades] = useState<TradeData[]>([]);

  // Load saved trades from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      setSavedTrades(JSON.parse(storedData));
    }
  }, []);

  // Merge new trades and persist in localStorage
  useEffect(() => {
    if (tradeData.length > 0) {
      setSavedTrades((prevTrades) => {
        const updatedTrades = [
          ...new Map([...prevTrades, ...tradeData].map((trade) => [trade.id, trade])).values(),
        ]; // Avoid duplicates
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrades));
        return updatedTrades;
      });
    }
  }, [tradeData]);

  // Function to clear saved trades from both localStorage and state

  return (
    <CardAnimation>
      <div className="space-y-4 h-96 scrollbar-hide flex mt-8 flex-col">
        {/* Pass savedTrades and clearSavedTrades to the ClearButton */}

        {loading && <CardSkeleton />}

        {/* Render HomeCard components */}
        {savedTrades.map((trade) => (
          <HomeCard key={trade.id} tradeData={trade} />
        ))}
      </div>
    </CardAnimation>
  );
};

export default HandleCardDisplay;
