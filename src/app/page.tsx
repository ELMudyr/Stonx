import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import ForexTradeContainer from "./_components/ForexTradeContainer";
import CardAnimation from "./_components/components/animations/cardAnimation";
import React from "react";
import ParticleBackground from "./_components/components/animations/ParticleBackground";
import StaggerAnimation from "./_components/components/animations/staggerAnimation";
import AnimatedBackground from "./_components/components/animations/bg-animation";


export default async function Home() {
  return (
    <>
      <ThemeProvider>
        <main className="flex  relative   overflow-x-hidden flex-col items-center ">
          <div className="container  flex flex-col items-center  justify-center  w-fit text-center gap-2 px-4 py-16">
            {/* <ParticleBackground /> */}
            <h1 className="text-6xl text-accent-foreground font-bold">Trade Responsibly</h1>
            <h2 className="text-sm md:lg text-primary">Or Gamble instead... :)</h2>
            <AnimatedBackground />
          </div>
          <div className="space-x-5 space-y-5 overflow-x-hidden">
            <ForexTradeContainer />
          </div>
        </main>

        <Toaster />
      </ThemeProvider>
    </>
  );
}



