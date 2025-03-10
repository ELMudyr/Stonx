"use client";

import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { toast } from "sonner";
import { TradeData } from "./ForexSelector"; // Import TradeData from ForexTradeSelector

export interface SaveToStorageHandle {
  addTrade: (trade: TradeData) => void;
  getAllTrades: () => TradeData[];
  clearTrades: () => void;
}

interface SaveToStorageProps {
  storageKey?: string;
}

const SaveToStorage = forwardRef<SaveToStorageHandle, SaveToStorageProps>(
  ({ storageKey = "forex_trade_requests" }, ref) => {
    const [trades, setTrades] = useState<TradeData[]>(() => {
      if (typeof window !== "undefined") {
        const savedTrades = localStorage.getItem(storageKey);
        return savedTrades ? JSON.parse(savedTrades) : [];
      }
      return [];
    });

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      addTrade: (trade: TradeData) => {
        setTrades(prevTrades => {
          const updatedTrades = [...prevTrades, trade]; // Save each request separately
          localStorage.setItem(storageKey, JSON.stringify(updatedTrades));
          return updatedTrades;
        });
        toast.success("Trade saved!");
      },
      getAllTrades: () => trades,
      clearTrades: () => {
        setTrades([]);
        localStorage.removeItem(storageKey);
        toast.info("All trades cleared!");
      },
    }));

    // Keep localStorage updated
    useEffect(() => {
      if (trades.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(trades));
      }
    }, [trades, storageKey]);

    return null; // This component doesn't render UI
  }
);

SaveToStorage.displayName = "SaveToStorage";
export default SaveToStorage;

