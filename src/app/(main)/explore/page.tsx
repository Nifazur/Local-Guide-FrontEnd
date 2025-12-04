"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { FilterSidebar } from "@/components/listings/FilterSidebar";
import { SearchBar } from "@/components/shared/SearchBar";
import { Pagination } from "@/components/shared/Pagination";
import { listingService } from "@/services/listingService";
import { Listing, ListingFilters, PaginationMeta } from "@/types";
import { SlidersHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExplorePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [listings, setListings] = useState<Listing[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<ListingFilters>({
    page: parseInt(searchParams.get("page") || "1"),
    limit: 12,
    search: searchParams.get("search") || undefined,
    city: searchParams.get("city") || undefined,
    category: searchParams.get("category") || undefined,
    minPrice: searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice")!) : undefined,
    maxPrice: searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : undefined,
    sortBy: (searchParams.get("sortBy") as ListingFilters["sortBy"]) || "newest",
  });

  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await listingService.getListings(filters);
      if (response.success && response.data) {
        setListings(response.data);
        if (response.meta?.pagination) {
          setPagination(response.meta.pagination);
        }
      }
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleFilterChange = (newFilters: ListingFilters) => {
    const updatedFilters = { ...newFilters, page: 1 };
    setFilters(updatedFilters);

    // Update URL params
    const params = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    router.push(`/explore?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (query: string) => {
    handleFilterChange({ ...filters, search: query || undefined });
  };

  const handleSortChange = (sortBy: string) => {
    handleFilterChange({ ...filters, sortBy: sortBy as ListingFilters["sortBy"] });
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Explore Tours</h1>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar
            placeholder="Search tours, cities..."
            defaultValue={filters.search}
            onSearch={handleSearch}
            className="md:max-w-md"
          />
          <div className="flex items-center gap-4">
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <FilterSidebar
                  filters={filters}
                  onFilterChangeAction={handleFilterChange}
                />
              </SheetContent>
            </Sheet>

            {/* Sort Select */}
            <Select value={filters.sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price">Price: Low to High</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 md:block">
          <div className="sticky top-20">
            <FilterSidebar filters={filters} onFilterChangeAction={handleFilterChange} />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Results Count */}
          {pagination && (
            <p className="mb-4 text-muted-foreground">
              Showing {listings.length} of {pagination.total} tours
            </p>
          )}

          {/* Listings Grid */}
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-4/3 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <ListingGrid listings={listings} />
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}