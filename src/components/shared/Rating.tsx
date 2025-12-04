import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export function Rating({
  value,
  max = 5,
  size = "md",
  showValue = false,
  reviewCount,
  className,
}: RatingProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;

  for (let i = 0; i < max; i++) {
    if (i < fullStars) {
      stars.push(
        <Star
          key={i}
          className={cn(sizeClasses[size], "fill-yellow-400 text-yellow-400")}
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <StarHalf
          key={i}
          className={cn(sizeClasses[size], "fill-yellow-400 text-yellow-400")}
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          className={cn(sizeClasses[size], "text-gray-300")}
        />
      );
    }
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">{stars}</div>
      {showValue && (
        <span className="text-sm font-medium text-muted-foreground">
          {value.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-sm text-muted-foreground">
          ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
}