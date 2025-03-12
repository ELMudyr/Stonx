import React, { useEffect, useState } from "react";
import HomeCard from "./HomeCard";
import CardSkeleton from "./components/ui/cardSkeleton";
import { TradeData } from "./ForexSelector";
import CardAnimation from "./components/animations/cardAnimation"
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "./components/ui/button";

interface HandleCardDisplayProps {
  tradeData: TradeData[];
  loading: boolean;
}
const STORAGE_KEY = "SavedTrades";

const HandleCardDisplay: React.FC<HandleCardDisplayProps> = ({
  tradeData,
  loading
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
        const updatedTrades = [...new Map([...prevTrades, ...tradeData].map(trade => [trade.id, trade])).values()]; // Avoid duplicates
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrades));
        return updatedTrades;
      });
    }
  }, [tradeData]);
  // Clear all trades in localStorage and reset savedTrades state
  const clearSavedTrades = () => {
    localStorage.removeItem(STORAGE_KEY); // Remove all saved trades
    // Optionally clear any other keys related to HomeCard, e.g., individual trade keys
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("Trade_")) {
        localStorage.removeItem(key); // Remove individual trade data saved by HomeCard
      }
    });
    setSavedTrades([]); // Clear the state
  };
  return (
    <CardAnimation>
      <div className="space-y-4 flex mt-8 flex-col">
        {savedTrades.length > 0 && ( // Only show the clear button if there are saved trades
          <Button
            variant="outline"
            onClick={clearSavedTrades}
            className="w-fit px-4  self-end mr-3"
          >Clear
            <FaRegTrashAlt />
          </Button>
        )}
        {loading && <CardSkeleton />}
        {savedTrades.map((trade) => (
          <HomeCard key={trade.id} tradeData={trade} />
        ))}
      </div>
    </CardAnimation>
  );
};

export default HandleCardDisplay;
