import { Listing } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Rating } from "@/components/shared/Rating";
import { ReviewList } from "@/components/reviews/ReviewList";
import { formatDuration, getInitials } from "@/lib/utils";
import { Clock, MapPin, Users, Languages, CheckCircle } from "lucide-react";
import Link from "next/link";

interface ListingDetailsProps {
  listing: Listing;
}

export function ListingDetails({ listing }: ListingDetailsProps) {
  return (
    <div className="space-y-8">
      {/* Title & Location */}
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          {listing.category.map((cat) => (
            <Badge key={cat} variant="secondary">
              {cat}
            </Badge>
          ))}
        </div>
        <h1 className="mb-2 text-3xl font-bold">{listing.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{listing.city}, {listing.country}</span>
          </div>
          <div className="flex items-center gap-1">
            <Rating value={listing.averageRating || 0} size="sm" showValue />
            <span>({listing._count?.reviews || 0} reviews)</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Guide Info */}
      {listing.guide && (
        <div className="flex items-center gap-4">
          <Link href={`/guides/${listing.guide.id}`}>
            <Avatar className="h-16 w-16">
              <AvatarImage src={listing.guide.profilePic || undefined} />
              <AvatarFallback>{getInitials(listing.guide.name || "")}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <p className="text-sm text-muted-foreground">Hosted by</p>
            <Link
              href={`/guides/${listing.guide.id}`}
              className="text-lg font-semibold hover:text-primary"
            >
              {listing.guide.name}
              {listing.guide.isVerified && (
                <CheckCircle className="ml-1 inline h-4 w-4 text-primary" />
              )}
            </Link>
            {listing.guide.languages && listing.guide.languages.length > 0 && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Languages className="h-4 w-4" />
                <span>Speaks {listing.guide.languages.join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <Separator />

      {/* Key Details */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-lg border p-4">
          <Clock className="h-8 w-8 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Duration</p>
            <p className="font-semibold">{formatDuration(listing.duration)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border p-4">
          <Users className="h-8 w-8 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Group Size</p>
            <p className="font-semibold">Max {listing.maxGroupSize} people</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border p-4">
          <MapPin className="h-8 w-8 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Meeting Point</p>
            <p className="font-semibold">{listing.meetingPoint}</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Description */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">About This Tour</h2>
        <p className="whitespace-pre-line text-muted-foreground">
          {listing.description}
        </p>
      </div>

      {/* Itinerary */}
      {listing.itinerary && (
        <>
          <Separator />
          <div>
            <h2 className="mb-4 text-xl font-semibold">Itinerary</h2>
            <p className="whitespace-pre-line text-muted-foreground">
              {listing.itinerary}
            </p>
          </div>
        </>
      )}

      <Separator />

      {/* Reviews */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">
          Reviews ({listing._count?.reviews || 0})
        </h2>
        {listing.reviews && listing.reviews.length > 0 ? (
          <ReviewList reviews={listing.reviews} />
        ) : (
          <p className="text-muted-foreground">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}