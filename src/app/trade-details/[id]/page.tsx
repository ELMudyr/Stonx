"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
// import { TradeData } from "~/app/_components/ForexSelector";
import Link from "next/link";
import Nav from "~/app/_components/components/ui/Nav";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { useParams } from "next/navigation"

// interface CardData {
//   tradeData: TradeData;
// }

// type tradeData = {
//   position: string;
//   entry: number;
//   takeProfit: number;
//   stopLoss: number;
//   lotSize: number;
//   risk: number;
//   timeEst: number;
//   winRate: number;
//   description: string;
//   profit: number;
//   id?: string;
//   timestamp?: number;
//   pair?: string;
// };

export default function page() {
  // export default function TradeDetails({ tradeData }: CardData) {

  // if (!tradeData) {
  //   return <div className="p-4 text-center">No trade data available</div>;
  // }


  // const tradeData = { position, entry, takeProfit, stopLoss, lotSize, risk, timeEst, winRate, description, profit, id, pair, timestamp }
  // console.log(tradeData)

  const params = useParams().id

  const StorageKey = `Trade_${params} `
  // let tradeLocalData = JSON.parse(localStorage.getItem(StorageKey))
  // console.log("LocalStorageData: " + tradeLocalData.position)

  const tradeLocalData = localStorage.getItem(StorageKey);

  if (tradeLocalData) {
    const tradeData: tradeData = JSON.parse(tradeLocalData);
    console.log(tradeData);
  } else {
    return <div className="p-4 text-center">No trade data available</div>;
  }


  // const formattedDate = timestamp
  //   ? new Date(Number(timestamp)).toLocaleString()
  //   : "Unknown date";
  // const pairDisplay = pair || "Unknown pair";

  return (

    <ThemeProvider>
      <main className="flex h-screen w-full overflow-x-hidden flex-col items-center ">
        <Nav />
        <div className="container flex flex-col items-center  justify-center  w-fit text-center gap-2 px-4 py-16">
        </div>
        <div className="space-x-5 space-y-5">
          <h1>Hello</h1>
          <div className="flex gap-24 items-center justify-between">
            <div>
              {/* <p className="text-xs text-muted-foreground">{formattedDate}</p> */}
              <h1>
                {tradeLocalData.pair}
                <span className="text-xs ml-3 text-muted-foreground">{tradeLocalData.position}</span>
              </h1>
            </div>
            <div className="gap-8">
              <h1 className="text-chart-2 text-sm font-bold">TP: {tradeLocalData.takeProfit.toString()}</h1>
              <h1 className="text-ring text-sm font-bold">SL: {tradeLocalData.stopLoss}</h1>
            </div>
          </div>
          <div className="flex items-center mt-3 gap-12 justify-between">
            <p className="text-xs text-muted-foreground w-64 line-clamp-2">
              {tradeLocalData.description}
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

