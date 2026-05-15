import { useEffect, useRef, useState } from "react";

const exams = [
  {
    name: "Duolingo English Test",
    logo: "https://goarno.io/blog/content/images/2025/12/image-3.png",
  },
  {
    name: "TOEFL",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/TOEFL_Logo.svg/960px-TOEFL_Logo.svg.png",
  },
  {
    name: "IELTS",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfC896nfGYzN9Z5YiZiN1_Qj3jpL_1GSgKzg&s",
  },
  {
    name: "TOLC",
    logo: "https://pisaedu.com/wp-content/uploads/2019/11/TOLC1.jpg",
  },
  {
    name: "MBZ University",
    logo: "https://api.edu-live.com/api/v1/images/news/1757484789906_MBZUofAI_FullName_Biligual_RGB.png",
  },
];

// Duplicate for seamless loop
const tickerItems = [...exams, ...exams, ...exams];

export function ExamTicker() {
  const [opacity, setOpacity] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Fade out as it scrolls above the viewport center
      const fadeStart = windowHeight * 0.6;
      const fadeEnd = -rect.height;
      const top = rect.top;
      if (top > fadeStart) {
        setOpacity(1);
      } else if (top < fadeEnd) {
        setOpacity(0);
      } else {
        const ratio = (top - fadeEnd) / (fadeStart - fadeEnd);
        setOpacity(Math.min(1, Math.max(0, ratio)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full py-6 border-t border-primary/10 overflow-hidden"
      style={{
        opacity,
        transition: "opacity 0.3s ease",
        background: "linear-gradient(to bottom, hsl(var(--hero-bg)), hsl(248 65% 8%))",
      }}
    >
      <p className="text-center text-primary/60 text-xs font-semibold tracking-widest uppercase mb-5">
        Exams We Offer
      </p>

      {/* Ticker track */}
      <div className="relative flex overflow-hidden">
        {/* Left fade mask */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, hsl(var(--hero-bg)), transparent)" }}
        />
        {/* Right fade mask */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, hsl(248 65% 8%), transparent)" }}
        />

        <div className="flex gap-16 animate-ticker whitespace-nowrap">
          {tickerItems.map((exam, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-xl border border-primary/15 bg-white/5 backdrop-blur-sm"
            >
              <img
                src={exam.logo}
                alt={exam.name}
                className="h-8 w-auto object-contain max-w-[100px] filter brightness-90"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="text-secondary-foreground/70 font-semibold text-sm tracking-wide">
                {exam.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
