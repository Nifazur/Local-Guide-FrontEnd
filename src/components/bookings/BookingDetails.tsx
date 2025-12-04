"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Booking } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { bookingService } from "@/services/bookingService";
import { paymentService } from "@/services/paymentService";
import { formatCurrency, formatDate, getInitials, getPlaceholderImage } from "@/lib/utils";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CreditCard,
  CheckCircle,
  XCircle,
  Star,
} from "lucide-react";

interface BookingDetailsProps {
  booking: Booking;
}

export function BookingDetails({ booking }: BookingDetailsProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isGuide = user?.role === "GUIDE" && user?.id === booking.guideId;
  const isTourist = user?.role === "TOURIST" && user?.id === booking.touristId;
  const isAdmin = user?.role === "ADMIN";

  const canConfirm = (isGuide || isAdmin) && booking.status === "PENDING";
  const canCancel = (isGuide || isTourist || isAdmin) && 
    ["PENDING", "CONFIRMED"].includes(booking.status);
  const canComplete = (isGuide || isAdmin) && booking.status === "CONFIRMED";
  const canPay = isTourist && booking.status === "CONFIRMED" && 
    (!booking.payment || booking.payment.status === "PENDING");
  const canReview = isTourist && booking.status === "COMPLETED" && !booking.review;

  const handleStatusUpdate = async (action: "confirm" | "cancel" | "complete") => {
    setIsLoading(true);
    try {
      let response;
      if (action === "complete") {
        response = await bookingService.completeBooking(booking.id);
      } else {
        response = await bookingService.updateBookingStatus(
          booking.id,
          action === "confirm" ? "CONFIRMED" : "CANCELLED"
        );
      }

      if (response.success) {
        toast.success(`Booking ${action}ed successfully!`);
        router.refresh();
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      toast.error(err.message || "Action failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await paymentService.createCheckoutSession(booking.id);
      if (response.success && response.data?.url) {
        window.location.href = response.data.url;
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      toast.error(err.message || "Payment failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main Content */}
      <div className="space-y-6 lg:col-span-2">
        {/* Booking Info Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Booking Details</CardTitle>
              <StatusBadge status={booking.status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tour Info */}
            <div className="flex gap-4">
              <div className="relative h-24 w-32 overflow-hidden rounded-lg">
                <Image
                  src={booking.listing?.images?.[0] || getPlaceholderImage(128, 96)}
                  alt={booking.listing?.title || "Tour"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <Link
                  href={`/tours/${booking.listingId}`}
                  className="font-semibold hover:text-primary"
                >
                  {booking.listing?.title}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {booking.listing?.city}, {booking.listing?.country}
                </p>
              </div>
            </div>

            <Separator />

            {/* Details Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{formatDate(booking.bookingDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{booking.startTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Guests</p>
                  <p className="font-medium">{booking.numberOfPeople} people</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Meeting Point</p>
                  <p className="font-medium">{booking.listing?.meetingPoint}</p>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            {booking.specialRequests && (
              <>
                <Separator />
                <div>
                  <p className="mb-2 text-sm font-medium">Special Requests</p>
                  <p className="text-muted-foreground">{booking.specialRequests}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Review Section */}
        {canReview && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Leave a Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showReviewForm ? (
                <ReviewForm
                  bookingId={booking.id}
                  onSuccess={() => {
                    setShowReviewForm(false);
                    router.refresh();
                  }}
                />
              ) : (
                <Button onClick={() => setShowReviewForm(true)}>
                  Write a Review
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Existing Review */}
        {booking.review && (
          <Card>
            <CardHeader>
              <CardTitle>Your Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < booking.review!.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">{booking.review.comment}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Price Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Price Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Tour fee × {booking.numberOfPeople}
              </span>
              <span>{formatCurrency(booking.totalAmount)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-primary">{formatCurrency(booking.totalAmount)}</span>
            </div>

            {/* Payment Status */}
            {booking.payment && (
              <div className="rounded-lg bg-muted p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payment Status</span>
                  <StatusBadge status={booking.payment.status} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Guide/Tourist Info */}
        <Card>
          <CardHeader>
            <CardTitle>{isTourist ? "Your Guide" : "Tourist"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={
                    isTourist
                      ? booking.guide?.profilePic || undefined
                      : booking.tourist?.profilePic || undefined
                  }
                />
                <AvatarFallback>
                  {getInitials(
                    (isTourist ? booking.guide?.name : booking.tourist?.name) || ""
                  )}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {isTourist ? booking.guide?.name : booking.tourist?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isTourist ? booking.guide?.email : booking.tourist?.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {canPay && (
              <Button className="w-full" onClick={handlePayment} disabled={isLoading}>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay Now
              </Button>
            )}
            {canConfirm && (
              <Button
                className="w-full"
                onClick={() => handleStatusUpdate("confirm")}
                disabled={isLoading}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirm Booking
              </Button>
            )}
            {canComplete && (
              <Button
                className="w-full"
                onClick={() => handleStatusUpdate("complete")}
                disabled={isLoading}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Completed
              </Button>
            )}
            {canCancel && (
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => handleStatusUpdate("cancel")}
                disabled={isLoading}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancel Booking
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}