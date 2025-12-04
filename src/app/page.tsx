import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedTours } from "@/components/home/FeaturedTours";
import { TopGuides } from "@/components/home/TopGuides";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Categories } from "@/components/home/Categories";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col place-self-center max-w-screen-2xl px-4 md:px-0">
      <Navbar />
      <main className="flex-1">
        {/* Section 1: Hero with Search */}
        <HeroSection />

        <HowItWorks />

        {/* Section 2: Featured Tours */}
        <FeaturedTours />

        {/* Section 3: How It Works */}
        <WhyChooseUs/>

        {/* Section 4: Categories */}
        <Categories />

        {/* Section 5: Top Guides */}
        <TopGuides />

        {/* Section 6: Testimonials */}
        <Testimonials />

        {/* Section 7: CTA - Become a Guide */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}