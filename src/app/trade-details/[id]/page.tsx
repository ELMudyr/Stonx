"use client";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { useParams } from "next/navigation"
import { TradeData } from "../../_components/ForexSelector";
import { useEffect, useState } from "react";
import { Card } from "../../_components/components/ui/card";
import React from "react";


export default function Page() {

  const params = useParams().id
  const [tradeData, setTradeData] = useState<TradeData | null>(null);

  useEffect(() => {
    const StorageKey = `Trade_${params} `
    const tradeLocalData = localStorage.getItem(StorageKey);

    if (tradeLocalData) {
      try {
        const parsedData: TradeData = JSON.parse(tradeLocalData);
        setTradeData(parsedData);
      } catch (error) {
        toast("Error", {
          description: `${error}`,
        });
      }
    } else {
      console.log("No trade data found in local storage.");
    }
  }, []);
  if (!tradeData) {
    return (

      <div className="flex flex-col items-center justify-center gap-3 mt-56">
        <h1 className="text-foreground text-center font-bold text-xl">oops, Seems that there is nothing here....</h1>
        <Link href="/" className="bg-card rounded-xl shadow px-3 py-1 text-muted-foreground hover:text-primary">Return Home?</Link>
      </div>
    )
  }

  const {
    // position,
    // entry,
    // takeProfit,
    // stopLoss,
    // lotSize,
    // risk,
    // timeEst,
    // winRate,
    // description,
    // profit,
    // id,
    // pair,
    timestamp } = tradeData;

  const formattedDate = timestamp
    ? new Date(Number(timestamp)).toLocaleString()
    : "Unknown date";


  return (

    <ThemeProvider>
      <main className="flex h-screen w-full overflow-x-hidden flex-col items-center ">
        <div className="container flex  items-center   text-center gap-2 px-4 py-16">
          <Link href="/" className="text-xs">
            {'<-'} Go Back
          </Link>
          <Card />
        </div>
        <div className=" w-fit bg-card border rounded-xl shadow px-6 py-4 space-y-5">
          <div className="flex  items-center justify-between">
            <div className="flex flex-col ">
              <p className="text-xs text-muted-foreground">{formattedDate}</p>
              <h1 className="text-lg">
                {tradeData.pair}
                <span className="text-xs ml-2 text-muted-foreground">{tradeData.position}</span>
              </h1>
              <div className=" flex flex-col mt-2 justify-end">
                <h1 className=" text-xs text-muted-foreground font-bold">Time to TP: {tradeData.timeEst}h</h1>
                <h1 className=" text-xs text-muted-foreground font-bold">Profit Rate: {tradeData.winRate}%</h1>
                <h1 className=" text-xs text-muted-foreground font-bold">Estimated Profit: {tradeData.profit}$</h1>
              </div>
            </div>
            <div className=" flex flex-col items-end">
              <h1 className="text-chart-2 text-sm font-bold">TP: {tradeData.takeProfit.toString()}</h1>
              <h1 className="text-ring text-sm font-bold">SL: {tradeData.stopLoss}</h1>
              <h1 className=" text-sm text-muted-foreground font-bold">EN: {tradeData.entry}</h1>
              <h1 className=" text-sm text-muted-foreground font-bold">LS: {tradeData.lotSize}</h1>
              <h1 className=" text-xs text-muted-foreground font-bold">Risk: {tradeData.risk}%</h1>
            </div>
          </div>
          <div className="flex gap-24 items-center justify-between w-fit">
            <p className="text-sm  text-muted-foreground  max-w-[30rem]">
              {tradeData.description}
            </p>
          </div>
        </div>
        <Toaster />
      </main>
    </ThemeProvider >
  );
}

