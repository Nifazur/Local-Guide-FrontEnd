"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { TOUR_CATEGORIES } from "@/lib/constants";
import { ListingFilters } from "@/types";
import { X } from "lucide-react";
import { getIconComponent } from "@/lib/icon-map";

interface FilterSidebarProps {
  filters: ListingFilters;
  onFilterChangeAction: (filters: ListingFilters) => void;
  onClose?: () => void;
}

export function FilterSidebar({ filters, onFilterChangeAction, onClose }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState([filters.minPrice || 0, filters.maxPrice || 500]);

  const handleCategoryClick = (category: string) => {
    onFilterChangeAction({
      ...filters,
      category: filters.category === category ? undefined : category,
    });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handlePriceCommit = () => {
    onFilterChangeAction({
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const handleClearFilters = () => {
    onFilterChangeAction({});
    setPriceRange([0, 500]);
  };

  const hasActiveFilters = filters.category || filters.minPrice || filters.maxPrice || filters.city;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <Separator />

      {/* City */}
      <div className="space-y-3">
        <Label className="text-foreground">City</Label>
        <Input
          placeholder="Enter city..."
          value={filters.city || ""}
          onChange={(e) => onFilterChangeAction({ ...filters, city: e.target.value || undefined })}
          className="border-border bg-card text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-foreground">Price Range</Label>
        <Slider
          value={priceRange}
          onValueChange={handlePriceChange}
          onValueCommit={handlePriceCommit}
          min={0}
          max={500}
          step={10}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}+</span>
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-3">
        <Label className="text-foreground">Categories</Label>
        <div className="flex flex-wrap gap-2">
          {TOUR_CATEGORIES.map((cat) => {
            const Icon = getIconComponent(cat.icon);
            const isActive = filters.category === cat.value;
            
            return (
              <Button
                key={cat.value}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryClick(cat.value)}
                className={isActive ? "bg-primary text-primary-foreground" : "border-border text-foreground hover:bg-secondary"}
              >
                <Icon className="h-4 w-4 mr-1" />
                {cat.label}
              </Button>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button 
          variant="outline" 
          className="w-full border-border text-foreground hover:bg-secondary"
          onClick={handleClearFilters}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );
}