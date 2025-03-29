import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "./components/ui/button";

interface ClearCardsProps {
  savedTrades: any[];
  clearSavedTrades: () => void;
}

const ClearCards: React.FC<ClearCardsProps> = ({ savedTrades, clearSavedTrades }) => {
  if (savedTrades.length === 0) return null;

  return (
    <Button
      variant="outline"
      onClick={clearSavedTrades}
      className="w-fit m-0 px-4 self-end "
    >
      Clear <FaRegTrashAlt />
    </Button>
  );
};

export default ClearCards;
