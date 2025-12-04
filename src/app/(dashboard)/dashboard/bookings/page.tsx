"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { BookingDetails } from "@/components/bookings/BookingDetails";
import { bookingService } from "@/services/bookingService";
import { Booking } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function BookingDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const bookingId = params.id as string;
  
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    // Check for payment status in URL
    const payment = searchParams.get("payment");
    if (payment) {
      setPaymentStatus(payment);
      
      if (payment === "success") {
        toast.success("Payment successful! Your booking is confirmed.");
      } else if (payment === "cancelled") {
        toast.error("Payment was cancelled. Please try again.");
      }
    }

    const fetchBooking = async () => {
      try {
        const response = await bookingService.getBookingById(bookingId);
        if (response.success && response.data) {
          setBooking(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch booking:", error);
        toast.error("Failed to load booking details");
      } finally {
        setIsLoading(false);
      }
    };

    // Add a small delay if payment was just completed to allow webhook to process
    if (payment === "success") {
      setTimeout(fetchBooking, 2000);
    } else {
      fetchBooking();
    }
  }, [bookingId, searchParams]);

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
      {/* Payment Status Banner */}
      {paymentStatus === "success" && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-900">Payment Successful!</h3>
              <p className="text-sm text-green-700">
                Your payment has been processed successfully. The booking is now confirmed.
              </p>
            </div>
          </div>
        </div>
      )}

      {paymentStatus === "cancelled" && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <div className="flex items-center gap-3">
            <XCircle className="h-6 w-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900">Payment Cancelled</h3>
              <p className="text-sm text-red-700">
                Your payment was cancelled. You can try again when you&apos;re ready.
              </p>
            </div>
          </div>
        </div>
      )}

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