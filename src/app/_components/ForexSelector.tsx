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
import { fetchAiResponse } from "../../server/api/fetchAiResponse";
import HomeCard from "./HomeCard"; // Import HomeCard component

// Define TradeData type here to avoid circular dependencies
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
};

const forexPairs = [
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

const ForexSelector = () => {
  const [selectedPair, setSelectedPair] = React.useState("EURUSD");
  const [forexData, setForexData] = React.useState(null);
  const [tradeData, setTradeData] = React.useState<TradeData | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleFetchData = async () => {
    setLoading(true);
    setTradeData(null); // Reset previous trade data

    try {
      // 1. Fetch forex data
      const chartResult = await fetchForexData(selectedPair);
      setForexData(chartResult);

      // 2. Process with AI API and get trade analysis
      if (chartResult && chartResult.quotes && chartResult.quotes.length > 0) {
        const aiResult = await fetchAiResponse(chartResult);
        setTradeData(aiResult);

        if (!aiResult) {
          toast.info("No trading recommendation available for current data");
        }
      } else {
        toast.error("No valid forex data received");
      }
    } catch (error) {
      toast.error("Uh oh! Something went wrong.", {
        description: `${error || "Something went wrong!"}`
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePairChange = (pair: string) => {
    setSelectedPair(pair);
    setTradeData(null); // Reset trade data when changing pair
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={true} className="w-[200px] justify-between">
              {forexPairs.find((pair) => pair.value === selectedPair)?.label || "Select Trading Pair..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Pair..." />
              <CommandList>
                <CommandEmpty>No forex pairs found.</CommandEmpty>
                <CommandGroup>
                  {forexPairs.map((pair) => (
                    <CommandItem
                      key={pair.value}
                      onSelect={() => handlePairChange(pair.value)}
                    >
                      <Check
                        className={cn("mr-2 h-4 w-4", selectedPair === pair.value ? "opacity-100" : "opacity-0")}
                      />
                      {pair.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button onClick={handleFetchData} className="ml-4" disabled={loading || !selectedPair}>
          {loading ? "Loading..." : "Fetch Data"}
        </Button>
      </div>

      {/* Trade Data Display */}
      {loading && <div className="text-center p-4">Analyzing market data...</div>}
      {!loading && <HomeCard tradeData={tradeData} />}
    </div>
  );
};

export default ForexSelector;
