import { useState } from "react";
import { X, ArrowRight, CheckCircle } from "lucide-react";
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
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary/20 border border-primary/40 mb-4 animate-fade-in mt-10 shadow-sm">
              <CheckCircle className="w-5 h-5 text-primary shrink-0" />
              <span className="text-primary font-semibold text-base">
                Registered by Startup Ethiopia (MInT)
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground leading-tight mb-5">
              የProficiency ፈተናዎን ያለእንከን ይጨርሱ
              <br />
              <span className="block text-right text-primary marker-underline cursor-pointer">
                Nova Exam Services
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

          <motion.div
            className="relative hidden lg:flex h-[500px] items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Decorative glow behind image */}
            <div className="absolute inset-8 rounded-2xl bg-primary/20 blur-2xl" />

            {/* Corner accents */}
            <span className="absolute top-4 left-4 text-primary/50 text-3xl select-none">✦</span>
            <span className="absolute bottom-4 right-4 text-primary/50 text-3xl select-none">✦</span>

            {/* Image frame */}
            <div className="relative z-10 rounded-2xl border-2 border-primary/40 shadow-[0_0_40px_rgba(var(--primary-rgb),0.25)] overflow-hidden w-[90%]">
              {/* Top label bar */}
              <div className="bg-primary/20 backdrop-blur-sm px-4 py-2 flex items-center gap-2 border-b border-primary/30">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-primary text-xs font-semibold tracking-wide uppercase">Internationally Recognised Framework</span>
              </div>
              <img
                src="https://evalground.com/blog/wp-content/uploads/2018/03/CEFR-1-e1584558768759.jpg"
                alt="CEFR Language Framework"
                className="w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
