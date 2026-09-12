import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const partners = [
  {
    name: "British Council",
    type: "Official Test Registration Center",
    description: "Official IELTS registration center for the British Council",
    logo: "/british-council-logo.svg",
    logoClassName: "bg-transparent object-contain scale-[1.6]",
  },
  {
    name: "ExamOnline",
    type: "Exclusive Partner in Ethiopia",
    description:
      "Exclusive Ethiopian operational and distribution partner for ExamOnline, delivering AI-powered remote proctoring and secure digital testing infrastructure across the region.",
    logo:
      "https://media.trustradius.com/product-logos/py/VP/TNGQP39CQHRV.PNG",
    logoClassName: "bg-transparent object-contain scale-[1.8]",
  },
  {
    name: "Duolingo English Test",
    type: "GPN Member",
    description:
      "Part of the Duolingo English Test Global Partner Network, supporting students pursuing international education.",
    logo:
      "https://files.kseacademy.com/file/KSEACADEMY/EXAMS/DET/duolingo-english-test-kse-academy.webp",
    logoClassName: "bg-transparent object-contain scale-[1.25]",
  },
  {
    name: "One Planet International School",
    type: "Testing & Assessment Partner",
    description:
      "Working with One Planet International School to facilitate English proficiency testing for its students.",
    logo:
      "https://oneplanetschool.com/wp-content/uploads/2023/02/onelogo.webp",
    logoClassName: "bg-transparent object-contain",
  },
];

export function ExamsSection() {
  return (
    <section className="py-24 bg-indigo relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary font-medium text-sm mb-4">
            Our Trusted Partners
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-indigo-foreground mb-4">
            Working with recognized organizations to make international testing more accessible in Ethiopia.
          </h2>
        </div>

        <div className="overflow-hidden">
          <motion.div
            className="flex w-max items-stretch gap-5"
            animate={{ x: [0, -1420] }}
            transition={{
              duration: 28,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <motion.div
                key={`${partner.name}-${index}`}
                whileHover={{ y: -8, scale: 1.01 }}
                className="h-full w-[300px] shrink-0"
              >
                <Card className="h-full bg-indigo-foreground/5 border-indigo-foreground/10 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 p-0 shadow-[0_10px_25px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_rgba(13,111,184,0.12)]">
                  <CardContent className="p-5 flex h-full flex-col">
                    <div className="mb-5 flex h-32 items-center justify-center overflow-hidden rounded-xl bg-transparent p-0">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className={`h-full w-full ${partner.logoClassName ?? "bg-transparent object-contain"}`}
                        style={{
                          aspectRatio: "4 / 1",
                          background: "transparent",
                          objectFit: "contain",
                          padding: 0,
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <h3 className="font-display text-xl font-bold text-indigo-foreground">
                        {partner.name}
                      </h3>
                      <p className="mt-2 text-sm font-semibold text-primary/90">
                        {partner.type}
                      </p>
                    </div>

                    {partner.name === "ExamOnline" && (
                      <div className="mb-3 h-1.5 w-16 rounded-full bg-primary/80" />
                    )}

                    <p className="text-sm leading-relaxed text-indigo-foreground/80">
                      {partner.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
