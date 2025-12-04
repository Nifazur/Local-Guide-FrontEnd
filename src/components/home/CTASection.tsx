import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Dark Card Container */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-secondary-foreground px-6 py-16 text-center shadow-2xl md:px-12 md:py-20 md:text-left">
          <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
            
            {/* Text Content */}
            <div className="max-w-2xl">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
                Share your city. Earn doing what you love.
              </h2>
              <p className="text-lg text-primary-foreground/80">
                Join our community of local experts, share your knowledge with travelers, and earn money doing 
                what you love. It&apos;s flexible, rewarding, and easy to get started.
              </p>
            </div>

            {/* Action Button */}
            <div className="shrink-0">
              <Button 
                size="lg" 
                className="h-14 rounded-full bg-accent px-8 text-base font-bold text-accent-foreground hover:bg-accent/90" 
                asChild
              >
                <Link href="/become-guide">
                  Become a Guide
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Abstract Background Effect */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>
      </div>
    </section>
  );
}