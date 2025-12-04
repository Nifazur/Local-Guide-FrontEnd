"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar } from "lucide-react";

export function HeroSection() {
  const [destination, setDestination] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (destination) {
      router.push(`/explore?search=${encodeURIComponent(destination)}`);
    } else {
      router.push("/explore");
    }
  };

  return (
    <section className="w-full pb-10 pt-6">
      <div className="container mx-auto px-4">
        <div className="relative h-[600px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')",
            }}
          >
            <div className="absolute inset-0 bg-black/30" />
          </div>
          
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <h1 className="mb-6 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-lg">
              Discover cities through <br className="hidden md:block" />
              the eyes of passionate <br className="hidden md:block" />
              locals.
            </h1>

            <div className="mt-8 w-full max-w-2xl">
              <div className="flex w-full items-center rounded-full bg-card p-2 shadow-xl transition-all hover:shadow-2xl">
                <div className="flex flex-1 items-center px-4">
                  <Search className="mr-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Where are you going?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="border-0 bg-transparent p-0 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>

                <div className="hidden h-8 w-px bg-border md:block"></div>

                <div className="hidden flex-1 items-center px-4 md:flex">
                  <Calendar className="mr-3 h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground cursor-pointer">Add dates</span>
                </div>

                <Button 
                  size="icon" 
                  className="h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shrink-0" 
                  onClick={handleSearch}
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button 
                onClick={handleSearch}
                className="rounded-full bg-card text-card-foreground px-8 py-6 text-base font-semibold hover:bg-card/90 shadow-md"
              >
                Explore Tours
              </Button>
              <Button 
                className="rounded-full border-2 border-card/50 bg-transparent px-8 py-6 text-base font-semibold text-card hover:bg-card/10 backdrop-blur-sm transition-all"
              >
                Become a Guide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}