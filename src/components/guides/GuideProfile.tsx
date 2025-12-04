/* eslint-disable @typescript-eslint/no-explicit-any */
import { GuideProfile as GuideProfileType } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Rating } from "@/components/shared/Rating";
import { ListingCard } from "@/components/listings/ListingCard";
import { ReviewList } from "@/components/reviews/ReviewList";
import { getInitials, formatCurrency } from "@/lib/utils";
import { MapPin, Languages, CheckCircle, Calendar, Map, Star, MessageCircle } from "lucide-react";

interface GuideProfileProps {
  guide: GuideProfileType;
}

export function GuideProfileComponent({ guide }: GuideProfileProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
        <div className="relative">
          <Avatar className="h-32 w-32 md:h-40 md:w-40">
            <AvatarImage src={guide.profilePic || undefined} />
            <AvatarFallback className="text-4xl">
              {getInitials(guide.name)}
            </AvatarFallback>
          </Avatar>
          {guide.isVerified && (
            <div className="absolute -right-2 -top-2 rounded-full bg-primary p-2">
              <CheckCircle className="h-6 w-6 text-primary-foreground" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="mb-2 text-3xl font-bold">{guide.name}</h1>

          <div className="mb-4 flex flex-wrap items-center justify-center gap-4 text-muted-foreground md:justify-start">
            {guide.city && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{guide.city}, {guide.country}</span>
              </div>
            )}
            {guide.languages && guide.languages.length > 0 && (
              <div className="flex items-center gap-1">
                <Languages className="h-4 w-4" />
                <span>{guide.languages.join(", ")}</span>
              </div>
            )}
          </div>

          <div className="mb-4 flex justify-center gap-2 md:justify-start">
            <Rating
              value={guide.averageRating || 0}
              showValue
              reviewCount={guide._count?.reviewsReceived}
            />
          </div>

          {/* Expertise */}
          {guide.expertise && guide.expertise.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              {guide.expertise.map((exp) => (
                <Badge key={exp} variant="secondary">
                  {exp}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Contact Button */}
        <div className="flex flex-col items-center gap-2">
          {guide.dailyRate && (
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(guide.dailyRate)}
              </p>
              <p className="text-sm text-muted-foreground">per day</p>
            </div>
          )}
          <Button>
            <MessageCircle className="mr-2 h-4 w-4" />
            Contact Guide
          </Button>
        </div>
      </div>

      <Separator />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-lg border p-4">
          <Map className="h-8 w-8 text-primary" />
          <div>
            <p className="text-2xl font-bold">{guide._count?.listings || 0}</p>
            <p className="text-sm text-muted-foreground">Tours</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border p-4">
          <Calendar className="h-8 w-8 text-primary" />
          <div>
            <p className="text-2xl font-bold">{guide._count?.bookingsAsGuide || 0}</p>
            <p className="text-sm text-muted-foreground">Tours Given</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border p-4">
          <Star className="h-8 w-8 text-primary" />
          <div>
            <p className="text-2xl font-bold">{guide._count?.reviewsReceived || 0}</p>
            <p className="text-sm text-muted-foreground">Reviews</p>
          </div>
        </div>
      </div>

      {/* Bio */}
      {guide.bio && (
        <>
          <Separator />
          <div>
            <h2 className="mb-4 text-xl font-semibold">About {guide.name}</h2>
            <p className="whitespace-pre-line text-muted-foreground">{guide.bio}</p>
          </div>
        </>
      )}

      {/* Listings */}
      {guide.listings && guide.listings.length > 0 && (
        <>
          <Separator />
          <div>
            <h2 className="mb-4 text-xl font-semibold">Tours by {guide.name}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {guide.listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing as any} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Reviews */}
      {guide.reviewsReceived && guide.reviewsReceived.length > 0 && (
        <>
          <Separator />
          <div>
            <h2 className="mb-4 text-xl font-semibold">Reviews</h2>
            <ReviewList reviews={guide.reviewsReceived as any} />
          </div>
        </>
      )}
    </div>
  );
}