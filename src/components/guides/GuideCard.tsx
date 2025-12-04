import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/shared/Rating";
import { GuideProfile } from "@/types";
import { getInitials, formatCurrency } from "@/lib/utils";
import { MapPin, CheckCircle } from "lucide-react";

interface GuideCardProps {
  guide: GuideProfile;
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link href={`/guides/${guide.id}`} className="block h-full">
      <Card className="group h-full overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="flex h-full flex-col p-6">
          
          {/* Avatar Section - Centered and larger */}
          <div className="relative mx-auto mb-6">
            <div className="relative">
              <Avatar className="h-28 w-28 border-4 border-card shadow-lg">
                <AvatarImage src={guide.profilePic || undefined} className="object-cover" />
                <AvatarFallback className="bg-secondary text-3xl font-bold text-muted-foreground">
                  {getInitials(guide.name)}
                </AvatarFallback>
              </Avatar>
              
              {/* Verified Badge */}
              {guide.isVerified && (
                <div className="absolute bottom-0 right-0 rounded-full bg-card p-1 shadow-sm">
                  <CheckCircle className="h-6 w-6 fill-primary text-card" />
                </div>
              )}
            </div>
          </div>

          {/* Name and Rating Row */}
          <div className="mb-1 flex items-center justify-between">
            <h3 className="truncate text-lg font-bold text-card-foreground group-hover:text-primary">
              {guide.name}
            </h3>
            <div className="flex items-center gap-1">
              <Rating
                value={guide.averageRating || 0}
                size="sm"
                showValue
                className="font-bold text-accent"
              />
            </div>
          </div>

          {/* Location */}
          {guide.city && (
            <div className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate">{guide.city}, {guide.country}</span>
            </div>
          )}

          {/* Expertise Tags */}
          {guide.expertise && guide.expertise.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {guide.expertise.slice(0, 3).map((exp) => (
                <Badge 
                  key={exp} 
                  variant="secondary" 
                  className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-foreground/70 hover:bg-secondary/80"
                >
                  {exp}
                </Badge>
              ))}
            </div>
          )}

          {/* Price Section */}
          <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-baseline gap-1">
              {guide.dailyRate ? (
                <>
                  <span className="text-lg font-bold text-card-foreground">
                    {formatCurrency(guide.dailyRate)}
                  </span>
                  <span className="text-sm text-muted-foreground">/day</span>
                </>
              ) : (
                <span className="text-sm font-medium text-muted-foreground">Contact for rates</span>
              )}
            </div>
            
            {/* Tour count */}
            <span className="text-xs text-muted-foreground">
              {guide._count?.listings || 0} active tours
            </span>
          </div>

        </CardContent>
      </Card>
    </Link>
  );
}