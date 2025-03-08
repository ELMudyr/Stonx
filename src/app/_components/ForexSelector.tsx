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
import { fetchForexData } from "../../server/api/fetchForexData"; // Import fetch function
import { fetchAiResponse } from "../../server/api/fetchAiResponse"; // Import fetch function

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
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleFetchData = async () => {
    setLoading(true);
    try {
      const chartResult = await fetchForexData(selectedPair);
      setData(chartResult);

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
  };

  return (
    <div>
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
      {/* {data && ( */}
      {/*   <div className="mt-4"> */}
      {/*     <pre className="bg-gray-800 text-white p-4">{JSON.stringify(data, null, 2)}</pre> */}
      {/*   </div> */}
      {/* )} */}
    </div>
  );
};

export default ForexSelector;

