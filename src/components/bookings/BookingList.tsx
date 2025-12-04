import { Booking } from "@/types";
import { BookingCard } from "./BookingCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Calendar } from "lucide-react";

interface BookingListProps {
  bookings: Booking[];
  showGuide?: boolean;
  showTourist?: boolean;
  emptyMessage?: string;
}

export function BookingList({
  bookings,
  showGuide = true,
  showTourist = false,
  emptyMessage = "No bookings found",
}: BookingListProps) {
  if (bookings.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title={emptyMessage}
        description="When you have bookings, they'll appear here."
        actionLabel="Explore Tours"
        actionHref="/explore"
      />
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          showGuide={showGuide}
          showTourist={showTourist}
        />
      ))}
    </div>
  );
}