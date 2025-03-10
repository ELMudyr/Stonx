import { HydrateClient } from "~/trpc/server";
import ForexSelector from "./_components/ForexSelector";
import HomeCard from "./_components/HomeCard";
import { ThemeProvider } from "next-themes";
import { ModeToggle } from "./_components/components/ui/modeToggle";
import Nav from "./_components/components/ui/Nav";
import { Button } from "./_components/components/ui/button";
import { ComboboxForm } from "./_components/components/ui/pairSelect";
import { Toaster } from "sonner";
// import { CardSkeleton } from "./_components/components/ui/cardSkeleton";
import ForexTradeContainer from "./_components/ForexTradeContainer";
import CardAnimation from "./_components/components/animations/cardAnimation";


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



