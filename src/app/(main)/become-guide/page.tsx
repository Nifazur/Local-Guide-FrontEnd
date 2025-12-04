import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  DollarSign,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Earn Money",
    description: "Set your own rates and earn money sharing your knowledge and passion.",
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description: "Work when you want. Accept bookings that fit your availability.",
  },
  {
    icon: Users,
    title: "Meet People",
    description: "Connect with travelers from around the world and make lasting friendships.",
  },
  {
    icon: Star,
    title: "Build Reputation",
    description: "Grow your profile with reviews and become a top-rated guide.",
  },
];

const steps = [
  {
    step: "1",
    title: "Create Your Profile",
    description: "Sign up and tell us about yourself, your expertise, and languages.",
  },
  {
    step: "2",
    title: "List Your Tours",
    description: "Create unique tour experiences with detailed descriptions and photos.",
  },
  {
    step: "3",
    title: "Accept Bookings",
    description: "Receive booking requests and confirm the ones that work for you.",
  },
  {
    step: "4",
    title: "Guide & Get Paid",
    description: "Lead amazing experiences and receive payment after each tour.",
  },
];

const requirements = [
  "Be at least 18 years old",
  "Have deep knowledge of your local area",
  "Be fluent in at least one language",
  "Have excellent communication skills",
  "Be reliable and punctual",
  "Pass background verification",
];

export const metadata = {
  title: "Become a Guide | Local Guide",
  description: "Share your city with the world and earn money as a local guide",
};

export default function BecomeGuidePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            Share Your City,{" "}
            <span className="text-primary">Earn Money</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Become a local guide and turn your passion for your city into a rewarding experience. 
            Set your own schedule, meet travelers, and earn money doing what you love.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/register?role=GUIDE">
                Start Guiding <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Become a Guide?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex rounded-full bg-primary/10 p-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-muted/30 py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => (
              <div key={item.step} className="relative text-center">
                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border lg:block" />
                )}
                <div className="relative mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-8 text-3xl font-bold">Requirements</h2>
            <div className="grid gap-4 text-left sm:grid-cols-2">
              {requirements.map((req) => (
                <div key={req} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            Join thousands of local guides already sharing their passion with travelers.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register?role=GUIDE">
              Become a Guide Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}