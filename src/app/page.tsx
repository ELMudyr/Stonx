import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import ForexTradeContainer from "./_components/ForexTradeContainer";
import React from "react";
import AnimatedBackground from "./_components/components/animations/bg-animation";
import fetchIndicators from "../server/api/fetchIndicators"

export default async function Home() {
  return (
    <>
      <ThemeProvider>
        <main className="flex relative h-dvh md:h-screen overflow-x-hidden flex-col items-center ">
          <div className="container  flex flex-col items-center  justify-center  w-fit text-center gap-2 px-4 py-16">
            {/* <ParticleBackground /> */}
            <h1 className="text-6xl text-accent-foreground font-bold">Trade Responsibly</h1>
            <h2 className="text-sm md:lg text-primary">Or Gamble instead... :)</h2>
            <AnimatedBackground />
            {/* <button onClick={fetchIndicators}>Indicators</button> */}
          </div>
          <div className="space-x-5   space-y-5 overflow-x-hidden">
            <ForexTradeContainer />
          </div>
        </main>

        <Toaster />
        <Toaster richColors />
      </ThemeProvider>
    </>
  );
}



