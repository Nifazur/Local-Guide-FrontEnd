"use client";

import Link from "next/link";
import { TOUR_CATEGORIES } from "@/lib/constants";
import { getIconComponent } from "@/lib/icon-map";

export function Categories() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Explore by Category
          </h2>
          <p className="mx-auto max-w-2xl text-gray-500">
            Find experiences that match your interests
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {TOUR_CATEGORIES.map((category) => {
            const Icon = getIconComponent(category.icon);
            return (
              <Link
                key={category.value}
                href={`/explore?category=${category.value}`}
                className="group flex flex-col items-center justify-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-gray-200 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-2xl group-hover:bg-secondary/80 transition-colors">
                  <Icon className="h-6 w-6 text-foreground group-hover:text-primary" />
                </div>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {category.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}