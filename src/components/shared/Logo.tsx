import Link from "next/link";
import { MapPin } from "lucide-react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
        <MapPin className="h-5 w-5 text-primary-foreground" />
      </div>
      {showText && (
        <span className="text-xl font-bold">
          Local<span className="text-primary">Guide</span>
        </span>
      )}
    </Link>
  );
}