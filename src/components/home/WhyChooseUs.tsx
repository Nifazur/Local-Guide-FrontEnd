"use client";

import { Shield, Lock, ThumbsUp, Headphones } from "lucide-react";

const features = [
  {
    iconName: "Shield",
    title: "Verified Guides",
    description: "Every guide is vetted by our team to ensure quality, safety, and authenticity.",
  },
  {
    iconName: "Lock",
    title: "Secure Payments",
    description: "Your transactions are encrypted and processed with the highest level of security.",
  },
  {
    iconName: "ThumbsUp",
    title: "Authentic Experiences",
    description: "Explore the real culture and hidden gems with passionate local experts.",
  },
  {
    iconName: "Headphones",
    title: "24/7 Support",
    description: "We're here to help you around the clock should you need anything.",
  },
];

const iconMap = {
  Shield,
  Lock,
  ThumbsUp,
  Headphones,
};

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Why Choose Us</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We ensure every trip is safe, authentic, and unforgettable
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-4">
          {features.map((feature) => {
            const Icon = iconMap[feature.iconName as keyof typeof iconMap];
            return (
              <div key={feature.title} className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary hover:bg-secondary/80 transition-colors">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}