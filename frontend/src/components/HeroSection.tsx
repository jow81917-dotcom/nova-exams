import { useState } from "react";
import { X, ArrowRight, CheckCircle } from "lucide-react";
import novacertificate from "../assets/novacertificate.jpg";
import { WireframeMesh } from "./WireframeMesh";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Navbar } from "./Navbar";
import { motion } from "framer-motion";

const features = [
  "Expert Exam Guidance",
  "Flexible Scheduling",
  "Efficient mentorship",
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full bg-hero overflow-hidden">
      <WireframeMesh />
      <div className="sparkle-lg top-32 left-20 animate-sparkle">
        <X className="w-4 h-4" strokeWidth={3} />
      </div>
      <div
        className="sparkle-lg top-1/3 left-1/4 animate-sparkle"
        style={{ animationDelay: "0.5s" }}
      >
        <span className="text-primary/40 text-2xl">✦</span>
      </div>
      <div
        className="sparkle-lg top-2/3 left-16 animate-sparkle"
        style={{ animationDelay: "1s" }}
      >
        <span className="text-teal/40 text-lg">+</span>
      </div>
      <div
        className="sparkle-lg bottom-1/3 right-1/3 animate-sparkle"
        style={{ animationDelay: "0.7s" }}
      >
        <span className="text-primary/50 text-xl">✦</span>
      </div>
      <Navbar />

      <div className="container mx-auto px-4 pt-12 lg:pt-20 pb-32 lg:pb-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6 animate-fade-in mt-10">
              <span className="text-primary font-medium text-sm">
                🎓 Your #1 Go-To For Proficiency Exams
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground leading-tight mb-6">
              Seamless English
              <br />
              Proficiency <span className="text-primary">Exam Services</span> -
              at{" "}
              <span className="underline-yellow cursor-pointer">
                Nova Exams
              </span>
            </h1>
            <p
              className="text-lg md:text-xl text-secondary-foreground/90 mb-8 leading-relaxed animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              Book international exams like Duolingo, TOEFL, IELTS, and TOLC
              with ease. We provide exam room services, expert mentorship, and
              seamless exam purchasing.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/booking">
                  Book Your Exam Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="heroOutline"
                size="lg"
                asChild
                className="bg-secondary-foreground/10 backdrop-blur-sm"
              >
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>

            <div
              className="flex flex-wrap gap-4 mb-10 animate-slide-up mt-10"
              style={{ animationDelay: "0.2s" }}
            >
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-secondary-foreground/90"
                >
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div
              className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-secondary-foreground/20 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              {[
                { number: "500+", label: "Students Served" },
                { number: "98%", label: "Success Rate" },
                { number: "6+", label: "Exams Offered" },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="text-2xl md:text-3xl font-display font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-secondary-foreground/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block h-[500px]">
  <motion.div
    className="absolute inset-0 w-full h-full shadow-2xl"
    animate={{ y: [0, -20, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    <img
      src={novacertificate}
      alt="Student"
      className="w-full h-full object-contain rounded-2xl bg-white"
    />
  </motion.div>

  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
    <Button
      variant="hero"
      size="sm"
      asChild
      className="bg-primary/80 hover:bg-primary"
    >
      <a
        href="https://credsverse.com/credentials/d10995c6-767f-4c6e-85ce-d7d153244b81"
        target="_blank"
        rel="noopener noreferrer"
      >
        Verify Document
      </a>
    </Button>
  </div>
</div>
        </div>
      </div>
    </section>
  );
}
