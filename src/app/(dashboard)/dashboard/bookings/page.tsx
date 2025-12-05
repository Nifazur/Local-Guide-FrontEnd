"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingList } from "@/components/bookings/BookingList";
import { Pagination } from "@/components/shared/Pagination";
import { bookingService } from "@/services/bookingService";
import { Booking, PaginationMeta, BookingStatus } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<BookingStatus | "all">("all");
  const [page, setPage] = useState(1);

  const isGuide = user?.role === "GUIDE";

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const filters: { page: number; limit: number; status?: BookingStatus } = {
          page,
          limit: 10,
        };
        if (activeTab !== "all") {
          filters.status = activeTab;
        }

        const response = await bookingService.getBookings(filters);
        if (response.success && response.data) {
          setBookings(response.data);
          if (response.meta?.pagination) {
            setPagination(response.meta.pagination);
          }
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [activeTab, page]);

  const handleTabChange = (value: string) => {
    setActiveTab(value as BookingStatus | "all");
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {isGuide ? "Booking Requests" : "My Bookings"}
        </h1>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="PENDING">Pending</TabsTrigger>
          <TabsTrigger value="CONFIRMED">Confirmed</TabsTrigger>
          <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
          <TabsTrigger value="CANCELLED">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          ) : (
            <BookingList
              bookings={bookings}
              showGuide={!isGuide}
              showTourist={isGuide}
              emptyMessage={`No ${activeTab === "all" ? "" : activeTab.toLowerCase()} bookings`}
            />
          )}

          {pagination && pagination.totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}