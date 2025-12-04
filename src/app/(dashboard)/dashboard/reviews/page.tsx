"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ReviewList } from "@/components/reviews/ReviewList";
import { Pagination } from "@/components/shared/Pagination";
import { EmptyState } from "@/components/shared/EmptyState";
import { reviewService } from "@/services/reviewService";
import { Review, PaginationMeta } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

export default function ReviewsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const isGuide = user?.role === "GUIDE";

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        let response;
        if (isGuide && user?.id) {
          response = await reviewService.getGuideReviews(user.id, page, 10);
        } else {
          response = await reviewService.getMyReviews(page, 10);
        }

        if (response.success && response.data) {
          setReviews(response.data);
          if (response.meta?.pagination) {
            setPagination(response.meta.pagination);
          }
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [page, isGuide, user?.id]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
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
      <h1 className="text-3xl font-bold">
        {isGuide ? "Reviews Received" : "My Reviews"}
      </h1>

      {reviews.length === 0 ? (
        <EmptyState
          icon={Star}
          title="No reviews yet"
          description={
            isGuide
              ? "Complete tours to receive reviews from travelers."
              : "Book and complete tours to leave reviews."
          }
        />
      ) : (
        <ReviewList reviews={reviews} />
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