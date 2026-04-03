import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const exams = [
  {
    name: "Duolingo",
    description: "Quick and convenient English proficiency test",
    features: [
      "2-hour test",
      "Results in 48 hours",
      "Accepted by 4000+ institutions",
    ],
  },
  {
    name: "TOEFL",
    description: "Globally recognized English language test",
    features: ["3-hour test", "Academic focus", "Results in 6 days"],
  },
  {
    name: "IELTS",
    description: "World's most popular English test",
    features: ["2h 45min test", "Academic & General", "Results in 13 days"],
  },
  {
    name: "TOLC",
    description: "Italian university admission test",
    features: ["2-hour test", "Subject specific", "Immediate results"],
  },
];

export function ExamsSection() {
  return (
    <section className="py-24 bg-indigo relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary font-medium text-sm mb-4">
            Exams Offered
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-indigo-foreground mb-4">
            Choose Your <span className="text-primary">Exam</span>
          </h2>
          <p className="text-indigo-foreground/80 text-lg">
            We offer a variety of internationally recognized exams to help you
            achieve your educational goals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exams.map((exam, index) => (
            <motion.div
              key={exam.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="bg-indigo-foreground/5 border-indigo-foreground/10 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group">
                <CardHeader>
                  <Badge className="w-fit bg-primary text-primary-foreground mb-2">
                    {exam.name}
                  </Badge>
                  <CardTitle className="text-indigo-foreground font-display">
                    {exam.name} Exam
                  </CardTitle>
                  <p className="text-sm text-indigo-foreground/70">
                    {exam.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {exam.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-indigo-foreground/80"
                      >
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
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
          <Button variant="hero" size="lg" asChild>
            <Link to="/booking">Book Your Exam</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
