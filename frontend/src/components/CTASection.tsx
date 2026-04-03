import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-secondary p-8 md:p-16 min-h-[400px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-magenta/20 rounded-full blur-3xl" />
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-6">
              Ready to Start Your{" "}
              <span className="text-primary">
                Exam Journey
                <span className="inline-block animate-question ml-4">?</span>
              </span>
            </h2>
            <p className="text-secondary-foreground/90 text-lg mb-8">
              Book your exam today and take the first step towards achieving
              your educational goals. Our team is here to support you every step
              of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/booking">
                  Book Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="heroOutline"
                size="xl"
                asChild
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
