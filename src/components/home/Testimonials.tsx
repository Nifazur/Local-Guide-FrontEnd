import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "An absolutely unforgettable experience! Our guide, Kenji, was so knowledgeable and friendly. The food tour in Kyoto was the highlight of our trip.",
    author: "Emily Carter",
    role: "Traveled to Kyoto",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    rating: 5,
  },
  {
    id: 2,
    content: "Chloe showed us a side of Paris we would have never discovered on our own. It felt like exploring the city with a close friend. Highly recommended!",
    author: "Alex Johnson",
    role: "Traveled to Paris",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    rating: 5,
  },
  {
    id: 3,
    content: "Seeing the Colosseum with Elena was magical. Her passion for Roman history was infectious. Best tour guide ever!",
    author: "Sarah Williams",
    role: "Traveled to Rome",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Stories from Our Community</h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="flex h-full flex-col justify-between p-8">
                <div className="mb-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>

                <p className="mb-8 text-base leading-relaxed text-card-foreground/80">
                  {testimonial.content}
                </p>

                <div className="mt-auto flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-card shadow-sm">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    <AvatarFallback className="bg-secondary text-foreground">{testimonial.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-card-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}