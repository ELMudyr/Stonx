"use client";
import Link from 'next/link';
import { X } from 'lucide-react';
import { TradeData } from './ForexSelector';
import { Button } from './components/ui/button';
import { useEffect } from 'react';
import React from 'react';

interface HomeCardProps {
  tradeData: TradeData;
  onDelete?: () => void;
}

export default function HomeCard({ tradeData, onDelete }: HomeCardProps) {
  if (!tradeData) {
    return <div className="p-4 text-center">No trade data available</div>;
  }

  const { position, entry, takeProfit, stopLoss, lotSize, risk, timeEst, winRate, description, profit, id, pair, timestamp } = tradeData;

  const pairURL = tradeData.pair
  const idURL = tradeData.id


  useEffect(() => {
    const StorageKey = `Trade_${idURL} `
    localStorage.setItem(StorageKey, JSON.stringify(tradeData))
  }, [pairURL, idURL, tradeData]);


  const formattedDate = timestamp
    ? new Date(Number(timestamp)).toLocaleString()
    : "Unknown date";

  const pairDisplay = pair || "Unknown pair";

  return (
    <div className="bg-card border w-screen sm:max-w-fit scrollbar-hide rounded-xl shadow px-6 py-4 relative">

      <div className="flex gap-24 items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
          <h1>
            {pairDisplay}
            <span className="text-xs ml-3 text-muted-foreground">{position}</span>
          </h1>
        </div>
        <div className="gap-8">
          <h1 className="text-chart-2 text-sm font-bold">TP: {takeProfit}</h1>
          <h1 className="text-ring text-sm font-bold">SL: {stopLoss}</h1>
        </div>
      </div>
      <div className="flex items-center mt-3 gap-12 justify-between">
        <p className="text-xs text-muted-foreground w-64 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: description }}>
        </p>
        <Link href={`/trade-details/${idURL}`} className="text-xs">
          Expand {'->'}
        </Link>
      </div>
    </div>
  );
}

