import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Listing } from "@/types";
import { formatCurrency, formatDuration, getInitials, getPlaceholderImage } from "@/lib/utils";
import { Clock, MapPin, Users, Star } from "lucide-react";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/tours/${listing.id}`} className="block h-full">
      <Card className="group h-full overflow-hidden rounded-4xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        
        {/* Image Header */}
        <div className="relative aspect-4/3 w-full overflow-hidden">
          <Image
            src={listing.images[0] || getPlaceholderImage(400, 300)}
            alt={listing.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Category Badge */}
          {listing.category[0] && (
            <Badge className="absolute left-4 top-4 rounded-full bg-card/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-card-foreground shadow-sm hover:bg-card">
              {listing.category[0]}
            </Badge>
          )}
        </div>

        {/* Content Body */}
        <CardContent className="flex flex-col p-4">
          
          {/* Title */}
          <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-snug text-card-foreground group-hover:text-primary">
            {listing.title}
          </h3>

          {/* Location */}
          <div className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium truncate">{listing.city}, {listing.country}</span>
          </div>

          {/* Rating Row */}
          <div className="mb-3 flex items-center gap-1.5 text-sm">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-bold text-card-foreground">{listing.averageRating?.toFixed(1) || "New"}</span>
            {listing._count?.reviews ? (
               <span className="text-muted-foreground">({listing._count.reviews} reviews)</span>
            ) : null}
          </div>

          {/* Meta Info (Duration & Group) */}
          <div className="mb-4 flex items-center gap-5 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{formatDuration(listing.duration)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Max {listing.maxGroupSize}</span>
            </div>
          </div>

          {/* Divider & Footer */}
          <div className="mt-auto border-t border-border pt-3">
            <div className="flex items-center justify-between pt-2">
              
              {/* Guide Profile */}
              {listing.guide && (
                <div className="flex items-center gap-2.5">
                  <Avatar className="h-8 w-8 border border-card shadow-sm">
                    <AvatarImage src={listing.guide.profilePic || undefined} className="object-cover" />
                    <AvatarFallback className="bg-muted text-[10px] text-muted-foreground">
                      {getInitials(listing.guide.name || "")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-muted-foreground line-clamp-1 max-w-[100px]">
                    {listing.guide.name}
                  </span>
                </div>
              )}

              {/* Price Section */}
              <div className="text-right leading-none">
                <div className="text-lg font-bold text-card-foreground">
                  {formatCurrency(listing.tourFee)}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">/ person</div>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </Link>
  );
}