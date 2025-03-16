import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "./components/ui/button"; // Assuming you're using a UI library for button styles

interface ClearCardsProps {
  savedTrades: any[];  // Array of trades (you can be more specific with the type here)
  clearSavedTrades: () => void;
}

const ClearCards: React.FC<ClearCardsProps> = ({ savedTrades, clearSavedTrades }) => {
  if (savedTrades.length === 0) return null; // If no saved trades, don't render the button

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
