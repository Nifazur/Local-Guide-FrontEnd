"use client";

import { Search as SearchIcon, Calendar as CalendarIcon, Map, Star } from "lucide-react";

const steps = [
  {
    iconName: "SearchIcon",
    title: "1. Find a Local Guide",
    description: "Search our community of passionate local experts in your destination.",
  },
  {
    iconName: "Map",
    title: "2. Pick a Personalized Tour",
    description: "Choose from unique experiences or customize your own itinerary.",
  },
  {
    iconName: "CalendarIcon",
    title: "3. Request a Booking",
    description: "Securely book your tour with a few clicks and a confirmation.",
  },
  {
    iconName: "Star",
    title: "4. Explore Like a Local",
    description: "Enjoy an authentic, unforgettable journey with your local guide.",
  },
];

const iconMap = {
  SearchIcon,
  Map,
  CalendarIcon,
  Star,
};

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Your adventure is just a few clicks away
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-4">
          {steps.map((step) => {
            const Icon = iconMap[step.iconName as keyof typeof iconMap];
            return (
              <div key={step.title} className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}