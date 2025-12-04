"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { TOUR_CATEGORIES } from "@/lib/constants";
import { Listing, CreateListingData } from "@/types";
import { listingService } from "@/services/listingService";
import { toast } from "sonner";

const listingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  itinerary: z.string().optional(),
  tourFee: z.coerce.number().min(1, "Tour fee must be at least $1"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 hour"),
  meetingPoint: z.string().min(1, "Meeting point is required"),
  maxGroupSize: z.coerce.number().min(1, "Group size must be at least 1"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

type ListingFormData = z.infer<typeof listingSchema>;

interface ListingFormProps {
  listing?: Listing;
  isEditing?: boolean;
}

export function ListingForm({ listing, isEditing = false }: ListingFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>(listing?.images || []);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    listing?.category || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: listing?.title || "",
      description: listing?.description || "",
      itinerary: listing?.itinerary || "",
      tourFee: listing?.tourFee || 0,
      duration: listing?.duration || 1,
      meetingPoint: listing?.meetingPoint || "",
      maxGroupSize: listing?.maxGroupSize || 10,
      city: listing?.city || "",
      country: listing?.country || "",
    },
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const onSubmit = async (data: ListingFormData) => {
    if (selectedCategories.length === 0) {
      toast.error("Please select at least one category");
      return;
    }

    setIsLoading(true);
    try {
      const payload: CreateListingData = {
        ...data,
        category: selectedCategories,
        images,
      };

      let response;
      if (isEditing && listing) {
        response = await listingService.updateListing(listing.id, payload);
      } else {
        response = await listingService.createListing(payload);
      }

      if (response.success) {
        toast.success(isEditing ? "Listing updated!" : "Listing created!");
        router.push("/dashboard/listings");
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tour Title</Label>
            <Input
              id="title"
              placeholder="e.g., Hidden Jazz Bars of New York"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your tour experience..."
              rows={5}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="itinerary">Itinerary (Optional)</Label>
            <Textarea
              id="itinerary"
              placeholder="10:00 AM - Meet at...\n11:00 AM - Visit..."
              rows={4}
              {...register("itinerary")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {TOUR_CATEGORIES.map((cat) => (
              <Button
                key={cat.value}
                type="button"
                variant={selectedCategories.includes(cat.value) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleCategory(cat.value)}
              >
                {cat.icon} {cat.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Details */}
      <Card>
        <CardHeader>
          <CardTitle>Tour Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="tourFee">Price per Person ($)</Label>
            <Input
              id="tourFee"
              type="number"
              min="1"
              {...register("tourFee")}
            />
            {errors.tourFee && (
              <p className="text-sm text-destructive">{errors.tourFee.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (hours)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              max="24"
              {...register("duration")}
            />
            {errors.duration && (
              <p className="text-sm text-destructive">{errors.duration.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxGroupSize">Max Group Size</Label>
            <Input
              id="maxGroupSize"
              type="number"
              min="1"
              max="50"
              {...register("maxGroupSize")}
            />
            {errors.maxGroupSize && (
              <p className="text-sm text-destructive">{errors.maxGroupSize.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="meetingPoint">Meeting Point</Label>
            <Input
              id="meetingPoint"
              placeholder="e.g., Central Park Main Entrance"
              {...register("meetingPoint")}
            />
            {errors.meetingPoint && (
              <p className="text-sm text-destructive">{errors.meetingPoint.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="e.g., New York" {...register("city")} />
            {errors.city && (
              <p className="text-sm text-destructive">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" placeholder="e.g., USA" {...register("country")} />
            {errors.country && (
              <p className="text-sm text-destructive">{errors.country.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>Photos</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUpload images={images} onChangeAction={setImages} maxImages={10} />
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
            ? "Update Listing"
            : "Create Listing"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}