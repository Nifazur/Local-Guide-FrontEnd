"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { uploadService } from "@/services/uploadService";
import { toast } from "sonner";
import Image from "next/image";

interface ImageUploadProps {
  images: string[];
  onChangeAction: (images: string[]) => void;
  maxImages?: number;
  className?: string;
}

export function ImageUpload({
  images,
  onChangeAction,
  maxImages = 5,
  className = "",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (images.length + acceptedFiles.length > maxImages) {
        toast.error(`Maximum ${maxImages} images allowed`);
        return;
      }

      setIsUploading(true);
      try {
        const uploadPromises = acceptedFiles.map((file) =>
          uploadService.uploadSingle(file)
        );
        const results = await Promise.all(uploadPromises);
        const newUrls = results
          .filter((r) => r.success && r.data)
          .map((r) => r.data!.url);
        onChangeAction([...images, ...newUrls]);
        toast.success("Images uploaded successfully");
      } catch {
        toast.error("Failed to upload images");
      } finally {
        setIsUploading(false);
      }
    },
    [images, maxImages, onChangeAction]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: isUploading,
  });

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChangeAction(newImages);
  };

  return (
    <div className={className}>
      {/* Image Grid */}
      {images.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {images.map((image, index) => (
            <div key={index} className="group relative aspect-video">
              <Image
                src={image}
                alt={`Upload ${index + 1}`}
                fill
                className="rounded-lg object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Dropzone */}
      {images.length < maxImages && (
        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            {isUploading ? (
              <>
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </>
            ) : (
              <>
                <div className="rounded-full bg-muted p-3">
                  {isDragActive ? (
                    <ImageIcon className="h-6 w-6 text-primary" />
                  ) : (
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <p className="text-sm font-medium">
                  {isDragActive ? "Drop images here" : "Drag & drop images"}
                </p>
                <p className="text-xs text-muted-foreground">
                  or click to select (max {maxImages} images, 5MB each)
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}