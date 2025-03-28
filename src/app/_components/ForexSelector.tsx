"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "./components/lib/utils";
import { Button } from "./components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { toast } from "sonner";
import { fetchForexData } from "../../server/api/fetchForexData";

// Define the TradeData type
export type TradeData = {
  position: string;
  entry: number;
  takeProfit: number;
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

export const forexPairs = [
  { label: "EUR/USD", value: "EURUSD" },
  { label: "USD/JPY", value: "USDJPY" },
  { label: "GBP/USD", value: "GBPUSD" },
  { label: "XAU/USD (Gold)", value: "XAUUSD" },
  { label: "XAG/USD (Silver)", value: "XAGUSD" },
  { label: "USD/CHF", value: "USDCHF" },
  { label: "AUD/USD", value: "AUDUSD" },
  { label: "USD/CAD", value: "USDCAD" },
  { label: "NZD/USD", value: "NZDUSD" },
  { label: "USD/SGD", value: "USDSGD" },
  { label: "USD/HKD", value: "USDHKD" },
  { label: "USD/CNY", value: "USDCNY" },
  { label: "USD/INR", value: "USDINR" },
  { label: "EUR/GBP", value: "EURGBP" },
  { label: "EUR/JPY", value: "EURJPY" },
  { label: "GBP/JPY", value: "GBPJPY" },
  { label: "AUD/JPY", value: "AUDJPY" },
  { label: "NZD/JPY", value: "NZDJPY" },
];

interface ForexSelectorProps {
  onTradeData: (trade: TradeData) => void;
  onFetchClick: () => void;
}

const ForexSelector: React.FC<ForexSelectorProps> = ({ onTradeData, onFetchClick }) => {
  const [selectedPair, setSelectedPair] = React.useState("EURUSD");
  const [buttonLoading, setButtonLoading] = React.useState(false);

  // Handle fetching forex data and processing AI response
  const handleFetchData = async () => {
    // Call the onFetchClick callback FIRST to set loading state
    onFetchClick();

    setButtonLoading(true);
    try {
      const apiResult = await fetchForexData(selectedPair);
      if (apiResult) {
        // Map the API response keys to your expected TradeData keys
        // const mappedTradeData: TradeData = {
        //   position: apiResult.Position || "N/A",
        //   entry: apiResult["Entry Point"] || 0,
        //   takeProfit: apiResult["Take Profit"] || 0,
        //   stopLoss: apiResult["Stop Loss"] || 0,
        //   lotSize: apiResult["Lot size"] || 0,
        //   risk: apiResult["Risk %"] || 0,
        //   timeEst: apiResult.TimeEst || 0,
        //   winRate: apiResult["Winrate %"] || 0,
        //   description: apiResult.Description || "No description available",
        //   profit: apiResult["Profit$"] || 0,
        //   id: Date.now().toString(),
        //   timestamp: Date.now(),
        //   pair: selectedPair,
        // };

        const mappedTradeData: TradeData = {
          position: apiResult.position || "N/A",
          entry: apiResult.entry || 0,
          takeProfit: apiResult.takeProfit || 0,
          stopLoss: apiResult.stopLoss || 0,
          lotSize: apiResult.lotSize || 0,
          risk: apiResult.risk || 0,
          timeEst: apiResult.timeEst || 0,
          winRate: apiResult.winRate || 0,
          description: apiResult.description || "No description available",
          profit: apiResult.profitUSD || 0,
          id: Date.now().toString(),
          timestamp: Date.now(),
          pair: selectedPair,
        };
        console.log(apiResult)
        // This will trigger setting loading to false after data is received
        onTradeData(mappedTradeData);

        console.log("Mapped Trade Data:", mappedTradeData);
        toast.success("New trade signal added!");
      } else {
        toast.info("No trading recommendation available for current data");
        // If no data received, we need to reset loading state ourselves
        onTradeData({
          position: "N/A",
          entry: 0,
          takeProfit: 0,
          stopLoss: 0,
          lotSize: 0,
          risk: 0,
          timeEst: 0,
          winRate: 0,
          description: "No data available",
          profit: 0,
          id: Date.now().toString(),
          timestamp: Date.now(),
          pair: selectedPair
        });
      }
    } catch (error: any) {
      toast.error("Uh oh! Something went wrong.", {
        description: error?.message || "Something went wrong!",
      });
      // On error, we also need to reset loading state
      onTradeData({
        position: "Error",
        entry: 0,
        takeProfit: 0,
        stopLoss: 0,
        lotSize: 0,
        risk: 0,
        timeEst: 0,
        winRate: 0,
        description: `Error: ${error?.message || "Unknown error"}`,
        profit: 0,
        id: Date.now().toString(),
        timestamp: Date.now(),
        pair: selectedPair
      });
    } finally {
      setButtonLoading(false);
    }
  };
  const handlePairChange = (pair: string) => {
    setSelectedPair(pair);
  };

  return (
    <div className="flex items-center mb-14">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={true}
            className="w-[200px] justify-between"
          >
            {forexPairs.find((p) => p.value === selectedPair)?.label ||
              "Select Trading Pair..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search Pair..." />
            <CommandList>
              <CommandEmpty>No forex pairs found.</CommandEmpty>
              <CommandGroup>
                {forexPairs.map((p) => (
                  <CommandItem
                    key={p.value}
                    onSelect={() => handlePairChange(p.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedPair === p.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {p.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        onClick={handleFetchData}
        className="ml-4"
        disabled={buttonLoading || !selectedPair}
      >
        {buttonLoading ? "Loading..." : "Fetch Data"}
      </Button>
    </div>
  );
};

export default ForexSelector;

