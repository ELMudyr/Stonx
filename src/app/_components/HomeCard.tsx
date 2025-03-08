'use client';
import Link from 'next/link';
import { TradeData } from './ForexSelector';

interface HomeCardProps {
  tradeData: TradeData | null;
}

export default function HomeCard({ tradeData }: HomeCardProps) {
  // Early return if tradeData is null
  if (!tradeData) {
    return <div className="p-4 text-center">No trade data available</div>;
  }

  const { position, takeProfit, stopLoss, description, entry } = tradeData;
  const formattedTakeProfit = Array.isArray(takeProfit) ? takeProfit.join(', ') : takeProfit;

  return (
    <div className="bg-card border max-w-[500px] rounded-xl shadow px-6 py-4">
      <div className="flex gap-24 items-center justify-between">
        <div>
          <h1 className="text-xs text-muted-foreground">Trade Signal</h1>
          <h1>{position}</h1>
        </div>
        <div className="gap-8">
          <h1 className="text-chart-2 text-sm font-bold">TP: {formattedTakeProfit}</h1>
          <h1 className="text-ring text-sm font-bold">SL: {stopLoss}</h1>
        </div>
      </div>
      <div className="flex items-center mt-3 gap-12 justify-between">
        <p className="text-xs text-muted-foreground w-64 line-clamp-2">{description}</p>
        <Link href={`/trade-details?entry=${entry}`} className="text-xs">
          View More →
        </Link>
      </div>
    </div>
  );
}
