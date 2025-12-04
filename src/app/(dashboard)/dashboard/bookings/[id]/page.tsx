"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BookingDetails } from "@/components/bookings/BookingDetails";
import { bookingService } from "@/services/bookingService";
import { Booking } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BookingDetailsPage() {
  const params = useParams();
  const bookingId = params.id as string;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await bookingService.getBookingById(bookingId);
        if (response.success && response.data) {
          setBooking(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch booking:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Booking not found</h1>
        <Button asChild className="mt-4">
          <Link href="/dashboard/bookings">Back to Bookings</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" asChild>
        <Link href="/dashboard/bookings">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Bookings
        </Link>
      </Button>

      <BookingDetails booking={booking} />
    </div>
  );
}