import React from "react";
import HomeCard from "./HomeCard";
import CardSkeleton from "./components/ui/cardSkeleton";
import { TradeData } from "./ForexSelector";
import CardAnimation from "./components/animations/cardAnimation"

interface HandleCardDisplayProps {
  tradeData: TradeData[];
  loading: boolean;
}

const HandleCardDisplay: React.FC<HandleCardDisplayProps> = ({
  tradeData,
  loading
}) => {
  console.log("HandleCardDisplay loading:", loading); // Debug log

  return (
    <CardAnimation>
      <div className="space-y-4">
        {loading && <CardSkeleton />} {/* This should show when loading is true */}
        {tradeData.map((trade) => (
          <HomeCard key={trade.id} tradeData={trade} />
        ))}
      </div>
    </CardAnimation>
  );
};

export default HandleCardDisplay;
