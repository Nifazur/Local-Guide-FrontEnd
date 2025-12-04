"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pagination } from "@/components/shared/Pagination";
import { EmptyState } from "@/components/shared/EmptyState";
import { Rating } from "@/components/shared/Rating";
import { listingService } from "@/services/listingService";
import { Listing, PaginationMeta } from "@/types";
import { formatCurrency, getPlaceholderImage } from "@/lib/utils";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, MoreVertical, Edit, Trash2, Eye, EyeOff, Map } from "lucide-react";

export default function ListingsPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const isGuide = user?.role === "GUIDE";

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        let response;
        if (isGuide) {
          response = await listingService.getMyListings(page, 10);
        } else {
          response = await listingService.getListings({ page, limit: 10 });
        }

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
    };

    fetchListings();
  }, [page, isGuide]);

  const handleToggleActive = async (listing: Listing) => {
    try {
      const response = await listingService.updateListing(listing.id, {
        isActive: !listing.isActive,
      });
      if (response.success) {
        setListings((prev) =>
          prev.map((l) =>
            l.id === listing.id ? { ...l, isActive: !l.isActive } : l
          )
        );
        toast.success(`Listing ${listing.isActive ? "deactivated" : "activated"}`);
      }
    } catch {
      toast.error("Failed to update listing");
    }
  };

  const handleDelete = async (listingId: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const response = await listingService.deleteListing(listingId);
      if (response.success) {
        setListings((prev) => prev.filter((l) => l.id !== listingId));
        toast.success("Listing deleted");
      }
    } catch {
      toast.error("Failed to delete listing");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {isGuide ? "My Listings" : "All Listings"}
        </h1>
        {isGuide && (
          <Button asChild>
            <Link href="/dashboard/listings/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Listing
            </Link>
          </Button>
        )}
      </div>

      {listings.length === 0 ? (
        <EmptyState
          icon={Map}
          title="No listings yet"
          description={isGuide ? "Create your first tour listing to start receiving bookings." : "No listings found."}
          actionLabel={isGuide ? "Create Listing" : undefined}
          actionHref={isGuide ? "/dashboard/listings/new" : undefined}
        />
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => (
            <Card key={listing.id}>
              <CardContent className="flex gap-4 p-4">
                {/* Image */}
                <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={listing.images[0] || getPlaceholderImage(128, 96)}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/tours/${listing.id}`}
                          className="font-semibold hover:text-primary"
                        >
                          {listing.title}
                        </Link>
                        <Badge variant={listing.isActive ? "default" : "secondary"}>
                          {listing.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {listing.city}, {listing.country}
                      </p>
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/tours/${listing.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        {isGuide && (
                          <>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/listings/${listing.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleActive(listing)}>
                              {listing.isActive ? (
                                <>
                                  <EyeOff className="mr-2 h-4 w-4" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(listing.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Stats */}
                  <div className="mt-2 flex items-center gap-4 text-sm">
                    <Rating
                      value={listing.averageRating || 0}
                      size="sm"
                      showValue
                      reviewCount={listing._count?.reviews}
                    />
                    <span className="text-muted-foreground">
                      {listing._count?.bookings || 0} bookings
                    </span>
                    <span className="font-semibold text-primary">
                      {formatCurrency(listing.tourFee)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}