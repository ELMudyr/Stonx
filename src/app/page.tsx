import { ThemeProvider } from "next-themes";
import Nav from "./_components/components/ui/Nav";
import { Toaster } from "sonner";
import ForexTradeContainer from "./_components/ForexTradeContainer";
import CardAnimation from "./_components/components/animations/cardAnimation";
import React from "react";


export default async function Home() {
  return (
    <>
      <ThemeProvider>
        <main className="flex h-screen w-full overflow-x-hidden flex-col items-center ">
          <Nav />
          <div className="container flex flex-col items-center  justify-center  w-fit text-center gap-2 px-4 py-16">
            <CardAnimation>
              <h1 className="text-6xl text-accent-foreground font-bold">Trade Responsibly</h1>
            </CardAnimation>
            <h2 className="text-sm md:lg text-primary">Or Gamble instead... :)</h2>
          </div>
          <div className="space-x-5 space-y-5">
            {/* <ForexSelector /> */}
            <ForexTradeContainer />
          </div>
          <Toaster />
        </main>
      </ThemeProvider>
    </>
  );
}



