"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GuideCard } from "@/components/guides/GuideCard";
import { userService } from "@/services/userService";
import { GuideProfile } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function TopGuides() {
  const [guides, setGuides] = useState<GuideProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await userService.getGuides({ limit: 4 });
        if (response.success && response.data) {
          setGuides(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch guides:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuides();
  }, []);

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container">
        {/* Header with Navigation Buttons */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Top-Rated Guides</h2>
            <p className="text-muted-foreground">
              Meet our passionate local experts ready to show you around
            </p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="hidden gap-2 md:flex">
            <Button variant="outline" size="icon" className="rounded-full border-border text-muted-foreground hover:text-foreground">
               <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-border text-foreground hover:bg-secondary">
               <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-3/4 w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Button asChild className="rounded-full bg-primary text-primary-foreground px-8 py-6 hover:bg-primary/90">
            <Link href="/guides">
              View All Guides
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}