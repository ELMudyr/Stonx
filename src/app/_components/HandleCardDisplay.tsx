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
  const clearSavedTrades = () => {
    localStorage.removeItem(STORAGE_KEY); // Remove saved trades from localStorage
    setSavedTrades([]); // Clear the state
  };

  return (
    <CardAnimation>
      <div className="space-y-4 max-h-[500px] overflow-y-scroll inset-shadow-red-500 inset-shadow-sm w-screen md:max-w-fit flex  flex-col">
        {/* Pass savedTrades and clearSavedTrades to the ClearButton */}
        <div className="sticky top-0 ml-auto z-10 ">
          <ClearCards savedTrades={savedTrades} clearSavedTrades={clearSavedTrades} />
        </div>
        <div className="space-y-4 md:max-w-fit w-screen overflow-x-hidden">
          {loading && <CardSkeleton />}
          {/* Render HomeCard components */}
          {savedTrades.map((trade) => (
            <HomeCard key={trade.id} tradeData={trade} />
          ))}
        </div>
      </div>
    </CardAnimation>
  );
};

export default HandleCardDisplay;
