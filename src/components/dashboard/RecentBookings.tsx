import { Booking } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingCard } from "@/components/bookings/BookingCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RecentBookingsProps {
  bookings: Booking[];
  title?: string;
  showGuide?: boolean;
  showTourist?: boolean;
}

export function RecentBookings({
  bookings,
  title = "Recent Bookings",
  showGuide = true,
  showTourist = false,
}: RecentBookingsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/bookings">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {bookings.length === 0 ? (
          <p className="text-center text-muted-foreground">No bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.slice(0, 5).map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                showGuide={showGuide}
                showTourist={showTourist}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}