"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ListingForm } from "@/components/listings/ListingForm";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { listingService } from "@/services/listingService";
import { Listing } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditListingPage() {
  const params = useParams();
  const listingId = params.id as string;
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await listingService.getListingById(listingId);
        if (response.success && response.data) {
          setListing(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch listing:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <ProtectedRoute allowedRoles={["GUIDE", "ADMIN"]}>
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">Edit Listing</h1>
        <ListingForm listing={listing} isEditing />
      </div>
    </ProtectedRoute>
  );
}