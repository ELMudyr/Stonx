"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "../lib/utils"
import { toast } from "sonner"
import { Button } from "./button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"
import React from "react"

const forexPairs = [
  { label: "EUR/USD", value: "EURUSD" },
  { label: "USD/JPY", value: "USDJPY" },
  { label: "GBP/USD", value: "GBPUSD" },
  { label: "USD/CHF", value: "USDCHF" },
  { label: "AUD/USD", value: "AUDUSD" },
  { label: "USD/CAD", value: "USDCAD" },
  { label: "NZD/USD", value: "NZDUSD" },
  { label: "XAU/USD (Gold)", value: "XAUUSD" },
  { label: "XAG/USD (Silver)", value: "XAGUSD" },
  { label: "USD/SGD", value: "USDSGD" },
  { label: "USD/HKD", value: "USDHKD" },
  { label: "USD/CNY", value: "USDCNY" },
  { label: "USD/INR", value: "USDINR" },
  { label: "EUR/GBP", value: "EURGBP" },
  { label: "EUR/JPY", value: "EURJPY" },
  { label: "GBP/JPY", value: "GBPJPY" },
  { label: "AUD/JPY", value: "AUDJPY" },
  { label: "NZD/JPY", value: "NZDJPY" },
] as const

const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a language.",
  }),
})

export function ComboboxForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })


  function onSubmit(data: z.infer<typeof FormSchema>): void {
    toast(
      <div>
        <strong>You submitted the following values:</strong>
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? forexPairs.find(
                          (language) => language.value === field.value
                        )?.label
                        : "Select language"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search forexPairs..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No forexPairs found.</CommandEmpty>
                      <CommandGroup>
                        {forexPairs.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue("language", language.value)
                            }}
                          >
                            {language.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                language.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

