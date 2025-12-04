import { Review } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating } from "@/components/shared/Rating";
import { getInitials, formatRelativeTime } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="space-y-3 rounded-lg border p-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={review.tourist?.profilePic || undefined} />
            <AvatarFallback>
              {getInitials(review.tourist?.name || "User")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{review.tourist?.name || "Anonymous"}</p>
            <p className="text-sm text-muted-foreground">
              {formatRelativeTime(review.createdAt)}
            </p>
          </div>
        </div>
        <Rating value={review.rating} size="sm" />
      </div>

      {/* Content */}
      <p className="text-muted-foreground">{review.comment}</p>

      {/* Tour Reference */}
      {review.listing && (
        <p className="text-sm text-muted-foreground">
          Tour: <span className="font-medium">{review.listing.title}</span>
        </p>
      )}
    </div>
  );
}