import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Monitor, Award, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: BookOpen,
    title: "Exam Booking",
    description:
      "Book international exams including Duolingo, TOEFL, IELTS, TOLC, GRE, and GMAT with ease.",
  },
  {
    icon: Monitor,
    title: "Exam Room Service",
    description:
      "Fully equipped exam room service with reliable internet connection and power system.",
  },
  {
    icon: Users,
    title: "Mentorship Program",
    description:
      "Efficient Mentorship to guide you through your exam preparation journey.",
  },
  {
    icon: Award,
    title: "Success Guarantee",
    description:
      "Our 98% success rate speaks for itself. Join thousands of successful students.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description:
      "Choose exam dates that work best for you with our flexible booking system.",
  },
  {
    icon: Shield,
    title: "Secure Process",
    description:
      "Safe and secure exam registration and payment processing with Chapa integration.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary font-medium text-[19px] mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need for{" "}
            <span className="text-gradient-secondary">Exam Success</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We provide comprehensive services to ensure your exam journey is
            smooth and successful.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="group bg-card border-border shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center mb-4 shadow-sm">
                    <service.icon className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12"
          viewport={{ once: true }}
        >
          <Button variant="cta" size="lg" asChild>
            <Link to="/booking">Explore All Services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
