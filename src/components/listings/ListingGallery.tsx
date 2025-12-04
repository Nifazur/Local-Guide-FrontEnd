"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Grid } from "lucide-react";
import { getPlaceholderImage } from "@/lib/utils";

interface ListingGalleryProps {
  images: string[];
  title: string;
}

export function ListingGallery({ images, title }: ListingGalleryProps) {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayImages = images.length > 0 ? images : [getPlaceholderImage(800, 600)];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="relative grid gap-2 overflow-hidden rounded-xl md:grid-cols-4 md:grid-rows-2">
        {/* Main Image */}
        <div
          className="relative aspect-4/3 cursor-pointer md:col-span-2 md:row-span-2"
          onClick={() => {
            setCurrentIndex(0);
            setShowModal(true);
          }}
        >
          <Image
            src={displayImages[0]}
            alt={`${title} - Main`}
            fill
            className="object-cover transition-transform hover:scale-105"
            priority
          />
        </div>

        {/* Secondary Images */}
        {displayImages.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className="relative hidden aspect-4/3 cursor-pointer md:block"
            onClick={() => {
              setCurrentIndex(index + 1);
              setShowModal(true);
            }}
          >
            <Image
              src={image}
              alt={`${title} - ${index + 2}`}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
            {index === 3 && displayImages.length > 5 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                <span className="text-lg font-semibold">+{displayImages.length - 5} more</span>
              </div>
            )}
          </div>
        ))}

        {/* View All Button */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute bottom-4 right-4"
          onClick={() => setShowModal(true)}
        >
          <Grid className="mr-2 h-4 w-4" />
          Show all photos
        </Button>
      </div>

      {/* Fullscreen Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-5xl border-none bg-black/95 p-0">
          <div className="relative flex h-[80vh] items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-10 text-white hover:bg-white/20"
              onClick={() => setShowModal(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation */}
            {displayImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 z-10 text-white hover:bg-white/20"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 z-10 text-white hover:bg-white/20"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Image */}
            <div className="relative h-full w-full">
              <Image
                src={displayImages[currentIndex]}
                alt={`${title} - ${currentIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
              {currentIndex + 1} / {displayImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}