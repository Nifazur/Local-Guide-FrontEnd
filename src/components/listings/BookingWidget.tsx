"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/shared/DatePicker";
import { Listing } from "@/types";
import { bookingService } from "@/services/bookingService";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { Calendar, Clock, Users, Minus, Plus } from "lucide-react";
import { addDays, format } from "date-fns";

interface BookingWidgetProps {
  listing: Listing;
}

export function BookingWidget({ listing }: BookingWidgetProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("10:00");
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = listing.tourFee * guests;

  const handleGuestChange = (delta: number) => {
    const newGuests = guests + delta;
    if (newGuests >= 1 && newGuests <= listing.maxGroupSize) {
      setGuests(newGuests);
    }
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/tours/${listing.id}`);
      return;
    }

    if (user?.role === "GUIDE") {
      toast.error("Guides cannot book tours");
      return;
    }

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    setIsLoading(true);
    try {
      const response = await bookingService.createBooking({
        listingId: listing.id,
        bookingDate: format(date, "yyyy-MM-dd"),
        startTime: time,
        numberOfPeople: guests,
        specialRequests: specialRequests || undefined,
      });

      if (response.success && response.data) {
        toast.success("Booking request sent!");
        router.push(`/dashboard/bookings/${response.data.id}`);
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      toast.error(err.message || "Failed to create booking");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="flex items-baseline justify-between">
          <span>
            <span className="text-2xl font-bold">{formatCurrency(listing.tourFee)}</span>
            <span className="text-base font-normal text-muted-foreground"> /person</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Date Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Select Date
          </Label>
          <DatePicker
            date={date}
            onDateChangeAction={setDate}
            placeholder="Choose a date"
            minDate={addDays(new Date(), 1)}
          />
        </div>

        {/* Time Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Start Time
          </Label>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Number of Guests
          </Label>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleGuestChange(-1)}
              disabled={guests <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center text-lg font-medium">{guests}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleGuestChange(1)}
              disabled={guests >= listing.maxGroupSize}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Max {listing.maxGroupSize} guests
          </p>
        </div>

        {/* Special Requests */}
        <div className="space-y-2">
          <Label>Special Requests (Optional)</Label>
          <Textarea
            placeholder="Any dietary restrictions, accessibility needs, etc."
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            rows={3}
          />
        </div>

        {/* Price Summary */}
        <div className="rounded-lg bg-muted p-4">
          <div className="flex justify-between text-sm">
            <span>{formatCurrency(listing.tourFee)} × {guests} guests</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t pt-2 font-semibold">
            <span>Total</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
        </div>

        {/* Book Button */}
        <Button
          className="w-full"
          size="lg"
          onClick={handleBooking}
          disabled={isLoading}
        >
          {isLoading ? "Sending Request..." : "Request to Book"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          You won&apos;t be charged yet. The guide will confirm your booking.
        </p>
      </CardContent>
    </Card>
  );
}