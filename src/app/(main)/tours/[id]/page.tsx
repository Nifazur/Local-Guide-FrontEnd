import { Suspense } from "react";
import { notFound } from "next/navigation";
import { listingService } from "@/services/listingService";
import { ListingGallery } from "@/components/listings/ListingGallery";
import { ListingDetails } from "@/components/listings/ListingDetails";
import { BookingWidget } from "@/components/listings/BookingWidget";
import { Skeleton } from "@/components/ui/skeleton";

interface TourPageProps {
  params: Promise<{ id: string }>;
}

async function getTour(id: string) {
  try {
    const response = await listingService.getListingById(id);
    if (response.success && response.data) {
      return response.data;
    }
    return null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: TourPageProps) {
  const { id } = await params;
  const tour = await getTour(id);
  
  if (!tour) {
    return { title: "Tour Not Found | Local Guide" };
  }

  return {
    title: `${tour.title} | Local Guide`,
    description: tour.description.slice(0, 160),
  };
}

function LoadingSkeleton() {
  return (
    <div className="container py-8">
      <Skeleton className="mb-8 aspect-21/9 w-full rounded-xl" />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    </div>
  );
}

export default async function TourPage({ params }: TourPageProps) {
  const { id } = await params;
  const tour = await getTour(id);

  if (!tour) {
    notFound();
  }

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div className="container py-8">
        {/* Gallery */}
        <div className="mb-8">
          <ListingGallery images={tour.images} title={tour.title} />
        </div>

        {/* Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Details */}
          <div className="lg:col-span-2">
            <ListingDetails listing={tour} />
          </div>

          {/* Booking Widget */}
          <div>
            <BookingWidget listing={tour} />
          </div>
        </div>
      </div>
    </Suspense>
  );
}