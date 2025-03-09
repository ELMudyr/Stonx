"use client";
import Link from 'next/link';
import { X } from 'lucide-react';
import { TradeData } from './TradeCardList';
import { Button } from './components/ui/button';

interface HomeCardProps {
  tradeData: TradeData;
  onDelete?: () => void;
}

export default function HomeCard({ tradeData, onDelete }: HomeCardProps) {
  if (!tradeData) {
    return <div className="p-4 text-center">No trade data available</div>;
  }

  const { position, entry, takeProfit, stopLoss, description, pair, timestamp } = tradeData;

  // Format takeProfit: if array, join the values; otherwise, just display it
  // const formattedTakeProfit = Array.isArray(takeProfit)
  //   ? takeProfit.join(", ")
  //   : takeProfit;

  const formattedDate = timestamp
    ? new Date(Number(timestamp)).toLocaleString()
    : "Unknown date";

  const pairDisplay = pair || "Unknown pair";

  return (
    <div className="bg-card border rounded-xl shadow px-6 py-4 relative">
      {onDelete && (
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 absolute top-0 right-0 text-muted-foreground hover:text-destructive"
          onClick={onDelete}
        >
          <X className="h-4 w-4" />
        </Button>
      )}

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
        <p className="text-xs text-muted-foreground w-64 line-clamp-2">
          {description}
        </p>
        <Link href={`/trade-details?entry=${entry}`} className="text-xs">
          Expand {'->'}
        </Link>
      </div>
    </div>
  );
}

