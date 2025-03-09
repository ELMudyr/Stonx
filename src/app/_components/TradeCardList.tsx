// TradeCardList.tsx
"use client";

import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import HomeCard from "./HomeCard";
import { CardSkeleton } from "./components/ui/cardSkeleton";
import { Separator } from "./components/ui/separator";
import { toast } from "sonner";

// Define TradeData type here so component can be fully independent
export type TradeData = {
  position: string;
  entry: number;
  takeProfit: number[] | number;
  stopLoss: number;
  lotSize: number;
  risk: number;
  timeEst: number;
  winRate: number;
  description: string;
  profit: number;
  id?: string;
  timestamp?: number;
  pair?: string;
};

// Define the ref methods interface
export interface TradeCardListHandle {
  addCard: (card: TradeData) => void;
  getAllCards: () => TradeData[];
  clearCards: () => void;
}

interface TradeCardListProps {
  loading?: boolean;
  onAddCard?: (card: TradeData) => void;
  storageKey?: string;
  initialCards?: TradeData[];
}

const TradeCardList = forwardRef<TradeCardListHandle, TradeCardListProps>(({
  loading = false,
  onAddCard,
  storageKey = "forex_trade_cards",
  initialCards = []
}, ref) => {
  const [tradeCards, setTradeCards] = useState<TradeData[]>(initialCards);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    addCard: (card: TradeData) => {
      setTradeCards(prev => [card, ...prev]);
      if (onAddCard) onAddCard(card);
    },
    getAllCards: () => tradeCards,
    clearCards: () => setTradeCards([])
  }));

  // Load saved cards from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined" && !initialCards.length) {
      try {
        const savedCards = localStorage.getItem(storageKey);
        if (savedCards) {
          setTradeCards(JSON.parse(savedCards));
        }
      } catch (error) {
        console.error("Error loading saved trade cards:", error);
      }
    }
  }, [storageKey, initialCards]);

  // Save cards to localStorage whenever tradeCards changes
  useEffect(() => {
    if (typeof window !== "undefined" && tradeCards.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(tradeCards));
    }
  }, [tradeCards, storageKey]);

  // Delete a card from the list
  const handleDeleteCard = (id: string) => {
    setTradeCards(prev => prev.filter(card => card.id !== id));
    toast.info("Trade signal removed");
  };

  return (
    <div className="w-full">
      {/* Loading State */}
      {loading && (
        <div className="mt-4 space-y-4">
          <h2 className="text-lg font-medium ml-5 animate-pulse text-text-muted-foreground">
            Analyzing Chart...
          </h2>
          <div className="grid items-center grid-cols-1 gap-4 md:grid-cols-2">
            {[...Array(2)].map((_, index) => (
              <CardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        </div>
      )}

      {/* Trade Cards Display */}
      {tradeCards.length > 0 && (
        <div className="mt-18 space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg ml-5 tex-text-secondary-foreground">Signal History</h2>
            <Separator />
          </div>
          <div className="grid items-center grid-cols-1 gap-4 md:grid-cols-2">
            {tradeCards.map(card => (
              <HomeCard
                key={card.id}
                tradeData={card}
                onDelete={() => handleDeleteCard(card.id as string)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

// Add display name for better debugging
TradeCardList.displayName = "TradeCardList";

export default TradeCardList;
