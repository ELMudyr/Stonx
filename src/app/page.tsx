import { HydrateClient } from "~/trpc/server";
import ForexSelector from "./_components/ForexSelector";
import HomeCard from "./_components/HomeCard";
import { ThemeProvider } from "next-themes";
import { ModeToggle } from "./_components/components/ui/modeToggle";
import Nav from "./_components/components/ui/Nav";
import { Button } from "./_components/components/ui/button";
import { ComboboxForm } from "./_components/components/ui/pairSelect";
import { Toaster } from "sonner";


export default async function Home() {
  return (
    <>
      <ThemeProvider>
        <HydrateClient>
          <Nav />
          <main className="flex min-h-screen flex-col items-center ">
            <div className="container flex flex-col items-center  justify-center  w-fit text-center gap-2 px-4 py-16">
              <h1 className="text-6xl text-accent-foreground font-bold">Trade Responsibly</h1>
              <h2 className="text-sm md:lg text-primary">Or Gamble instead... :)</h2>
            </div>
            <div className="space-x-5">
              <ForexSelector />
            </div>
            <div>
              <HomeCard></HomeCard>
            </div>
            <Toaster />
          </main>
        </HydrateClient>
      </ThemeProvider>
    </>
  );
}
