import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { TelegramButton } from "@/components/TelegramButton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  Target,
  Users,
  Heart,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { useTeamMembers } from "@/hooks/useTeam";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for the highest standards in everything we do.",
  },
  {
    icon: Target,
    title: "Student Success",
    description: "Your success is our primary goal and motivation.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a supportive community of learners.",
  },
  {
    icon: Heart,
    title: "Care",
    description: "We genuinely care about each student's journey.",
  },
];

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { data: team = [], isLoading, error } = useTeamMembers();

  const next = useCallback(() => {
    if (team.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % team.length);
    }
  }, [team]);
  const prev = useCallback(() => {
    if (team.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + team.length) % team.length);
    }
  }, [team]);
  useEffect(() => {
    if (isPaused || team.length === 0) return;
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [isPaused, next, team]);

  const getVisibleIndices = () => {
    if (!team || team.length === 0) return [];
    const prevIndex = (currentIndex - 1 + team.length) % team.length;
    const nextIndex = (currentIndex + 1) % team.length;
    return [prevIndex, currentIndex, nextIndex];
  };

  const visibleIndices = getVisibleIndices();
  if (error) {
    return (
      <div className="text-center py-24 text-red-500">Failed to load team</div>
    );
  }
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar bgColor="bg-gradient-secondary" />
      <main className="pt-20">
        <section className="py-24 bg-gradient-secondary">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground mb-6"
              viewport={{ once: true }}
            >
              About <span className="text-primary">Nova Exams</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-secondary-foreground/90 text-lg max-w-2xl mx-auto"
              viewport={{ once: true }}
            >
              Your trusted partner in international exam preparation and booking
              services, dedicated to helping Ethiopian students achieve their
              educational dreams.
            </motion.p>
          </div>
        </section>
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary font-medium text-[19px] mb-4">
                  Our Mission
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Streamlining Exam Processes for{" "}
                  <span className="text-gradient-secondary">Success</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Nova Exams was founded with a simple mission: to make
                  international exam booking accessible, reliable, and
                  stress-free for Ethiopian students.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We provide exam room services, expert mentorship, and seamless
                  exam purchasing, ensuring every student has the support they
                  need to succeed.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                {values.map((value, i) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-muted border-border shadow-sm hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="w-10 h-10 rounded-lg bg-gradient-secondary flex items-center justify-center mb-4">
                          <value.icon className="w-5 h-5 text-secondary-foreground" />
                        </div>
                        <h3 className="font-display font-semibold text-foreground mb-2">
                          {value.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto mb-16"
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose <span className="text-gradient">Nova Exams?</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Personalized service tailored to your needs",
                "Reliable and professional exam facilities",
                "Wide variety of internationally recognized exams",
                "Expert mentorship from high scorers",
                "Flexible scheduling options",
                "Transparent and competitive pricing",
              ].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3"
                  viewport={{ once: true }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-sm font-bold">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-foreground">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-24 bg-background min-h-screen flex items-center justify-center">
          {" "}
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-8 md:p-12 w-full">
            {" "}
            <div className="container mx-auto px-4">
              {" "}
              <div className="text-center max-w-2xl mx-auto mb-20 relative">
                {" "}
                <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary font-medium text-[17px] mb-4">
                  {" "}
                  Our Team{" "}
                </span>{" "}
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
                  {" "}
                  Meet Our{" "}
                  <span className="text-gradient-secondary">Team</span>{" "}
                </h2>{" "}
              </div>{" "}
              <div
                className="relative max-w-6xl mx-auto items-center justify-center flex flex-col"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {" "}
                <button
                  onClick={prev}
                  className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-card text-foreground flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-border"
                  aria-label="Previous team member"
                >
                  {" "}
                  <ChevronLeft className="w-5 h-5" />{" "}
                </button>{" "}
                <button
                  onClick={next}
                  className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-card text-foreground flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-border"
                  aria-label="Next team member"
                >
                  {" "}
                  <ChevronRight className="w-5 h-5" />{" "}
                </button>{" "}
                <div className="flex items-center justify-center gap-4 md:gap-6 px-12 md:px-16">
                  {" "}
                  {visibleIndices.map((index, position) => {
                    const member = team[index];
                    const isCenter = position === 1;
                    return (
                      <Card
                        key={`card-${position}`}
                        className={cn(
                          "flex-shrink-0 bg-card border-border transition-all duration-500 w-full md:w-[340px]",
                          isCenter
                            ? "scale-100 opacity-100 shadow-2xl z-10 border-secondary"
                            : "hidden md:block scale-95 opacity-50 shadow-md hover:opacity-70",
                        )}
                      >
                        {" "}
                        <CardContent className="p-6 md:p-8 min-h-[200px] flex flex-col items-center text-center">
                          {" "}
                          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-secondary flex items-center justify-center">
                            {" "}
                            {member.image ? (
                              <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="w-full h-full flex items-center justify-center bg-purple-600 text-white font-bold text-2xl">
                                {" "}
                                {member.name.charAt(0)}{" "}
                              </span>
                            )}{" "}
                          </div>{" "}
                          <h3 className="font-display font-semibold text-lg text-foreground">
                            {" "}
                            {member.name}{" "}
                          </h3>{" "}
                          <p className="text-secondary text-sm mb-2">
                            {member.role}
                          </p>{" "}
                          <p className="text-muted-foreground text-sm line-clamp-3">
                            {" "}
                            {member.bio}{" "}
                          </p>{" "}
                        </CardContent>{" "}
                      </Card>
                    );
                  })}{" "}
                </div>{" "}
                <div className="flex items-center justify-center gap-3 mt-12">
                  {isLoading ? (
                    <div className="text-center py-24">Loading team...</div>
                  ) : (
                    team.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={cn(
                          "rounded-full transition-all duration-500 ease-out",
                          index === currentIndex
                            ? "w-8 h-3 bg-secondary"
                            : "w-3 h-3 bg-muted-foreground/30 hover:bg-secondary/50 hover:scale-125",
                        )}
                        aria-label={`Go to team member ${index + 1}`}
                      />
                    ))
                  )}
                </div>
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </section>
      </main>
      <Footer />
      <ChatBot />
      <TelegramButton />
    </div>
  );
};

export default About;
