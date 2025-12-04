/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Booking } from "@/types";
import { formatCurrency, formatDate, getInitials, getPlaceholderImage } from "@/lib/utils";
import { Calendar, Clock, Users } from "lucide-react";

interface BookingCardProps {
  booking: Booking;
  showGuide?: boolean;
  showTourist?: boolean;
}

export function BookingCard({ booking, showGuide = true, showTourist = false }: BookingCardProps) {
  const person = showTourist ? booking.tourist : booking.guide;

  return (
    <Link href={`/dashboard/bookings/${booking.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardContent className="flex gap-4 p-4">
          {/* Image */}
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={booking.listing?.images?.[0] || getPlaceholderImage(100, 100)}
              alt={booking.listing?.title || "Tour"}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold line-clamp-1">
                {booking.listing?.title || "Tour"}
              </h3>
              <StatusBadge status={booking.status} />
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(booking.bookingDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{booking.startTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{booking.numberOfPeople} guests</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {person && (
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={person.profilePic || undefined} />
                    <AvatarFallback className="text-xs">
                      {getInitials(person.name || "")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{person.name}</span>
                </div>
              )}
              <p className="font-semibold text-primary">
                {formatCurrency(booking.totalAmount)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}