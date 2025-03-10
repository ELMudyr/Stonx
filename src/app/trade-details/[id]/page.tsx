"use client";
import Link from "next/link";
import Nav from "~/app/_components/components/ui/Nav";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { useParams } from "next/navigation"
import { TradeData } from "~/app/_components/ForexSelector";
import { useEffect, useState } from "react";


export default function Page() {

  const params = useParams().id
  const [tradeData, setTradeData] = useState<TradeData | null>(null);

  useEffect(() => {
    const StorageKey = `Trade_${params} `
    const tradeLocalData = localStorage.getItem(StorageKey);

    if (tradeLocalData) {
      const parsedData: TradeData = JSON.parse(tradeLocalData);
      setTradeData(parsedData);
    } else {
      console.log("No trade data found in local storage.");
    }
  }, []);
  if (!tradeData) {
    return <div>Loading...</div>;
  }

  const { position, entry, takeProfit, stopLoss, lotSize, risk, timeEst, winRate, description, profit, id, pair, timestamp } = tradeData;

  const formattedDate = timestamp
    ? new Date(Number(timestamp)).toLocaleString()
    : "Unknown date";


  return (

    <ThemeProvider>
      <main className="flex h-screen w-full overflow-x-hidden flex-col items-center ">
        <Nav />
        <div className="container flex flex-col items-center  justify-center  w-fit text-center gap-2 px-4 py-16">
        </div>
        <div className="space-x-5 space-y-5">
          <div className="flex gap-24 items-center justify-between">
            <div>
              {/* <p className="text-xs text-muted-foreground">{formattedDate}</p> */}
              <h1>
                {tradeData.pair}
                <span className="text-xs ml-3 text-muted-foreground">{tradeData.position}</span>
              </h1>
            </div>
            <div className="gap-8">
              <h1 className="text-chart-2 text-sm font-bold">TP: {tradeData.takeProfit.toString()}</h1>
              <h1 className="text-ring text-sm font-bold">SL: {tradeData.stopLoss}</h1>
            </div>
          </div>
          <div className="flex items-center mt-3 gap-12 justify-between">
            <p className="text-xs text-muted-foreground w-64 line-clamp-2">
              {tradeData.description}
            </p>
            <Link href="/" className="text-xs">
              Go Back
            </Link>
          </div>
        </div>
        <Toaster />
      </main>
    </ThemeProvider>
  );
}

