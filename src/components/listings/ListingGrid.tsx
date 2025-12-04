import { Listing } from "@/types";
import { ListingCard } from "./ListingCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Map } from "lucide-react";

interface ListingGridProps {
  listings: Listing[];
  isLoading?: boolean;
}

export function ListingGrid({ listings, isLoading }: ListingGridProps) {
  if (!isLoading && listings.length === 0) {
    return (
      <EmptyState
        icon={Map}
        title="No tours found"
        description="Try adjusting your filters or search terms to find more tours."
        actionLabel="Clear Filters"
        actionHref="/explore"
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}