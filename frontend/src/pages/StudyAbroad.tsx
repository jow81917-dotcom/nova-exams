import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import {
  Search,
  ArrowRight,
  Award,
  GraduationCap,
  Globe,
  Briefcase,
  Star,
  Clock,
  MapPin,
  ChevronRight,
  Phone,
  MessageCircle,
  X,
  BookOpen,
  Users,
  FileText,
  Compass,
  Calendar,
  CheckCircle,
  TrendingUp,
  Shield,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
interface Opportunity {
  id: number;
  flag: string;
  country: string;
  title: string;
  funding: string;
  fundingColor: string;
  degree: string;
  description: string;
  deadline: string;
  daysLeft: number;
  eligibility: string;
  category: string;
}

interface CountryCard {
  flag: string;
  name: string;
  count: number;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const opportunities: Opportunity[] = [
  {
    id: 1,
    flag: "🇮🇹",
    country: "Italy",
    title: "Italian Government Scholarship 2027",
    funding: "Fully Funded",
    fundingColor: "#22c55e",
    degree: "Master's · PhD",
    description:
      "Tuition, accommodation, and monthly stipend fully covered for international students. Includes language courses and cultural activities.",
    deadline: "May 15, 2027",
    daysLeft: 270,
    eligibility: "Ethiopian applicants eligible",
    category: "Scholarship",
  },
  {
    id: 2,
    flag: "🇨🇳",
    country: "China",
    title: "Chinese Government Scholarship (CSC) 2027",
    funding: "Fully Funded",
    fundingColor: "#22c55e",
    degree: "Bachelor's · Master's · PhD",
    description:
      "Full scholarship covering tuition, accommodation, living allowance, and comprehensive medical insurance for the duration of study.",
    deadline: "March 31, 2027",
    daysLeft: 225,
    eligibility: "Open to African applicants",
    category: "Scholarship",
  },
  {
    id: 3,
    flag: "🇹🇷",
    country: "Turkey",
    title: "Türkiye Bursları Scholarship 2027",
    funding: "Fully Funded",
    fundingColor: "#22c55e",
    degree: "Bachelor's · Master's · PhD",
    description:
      "Covers tuition, housing, monthly stipend, health insurance, and one-year Turkish language course before the academic program.",
    deadline: "February 20, 2027",
    daysLeft: 186,
    eligibility: "Ethiopian applicants eligible",
    category: "Scholarship",
  },
];

const deadlineItems = [
  { title: "Italian Government Scholarship", country: "🇮🇹 Italy", days: 270, urgency: "normal" },
  { title: "Türkiye Bursları Scholarship", country: "🇹🇷 Turkey", days: 186, urgency: "normal" },
  { title: "CSC China Scholarship", country: "🇨🇳 China", days: 225, urgency: "normal" },
  { title: "Russian Government Scholarship", country: "🇷🇺 Russia", days: 148, urgency: "soon" },
  { title: "Erasmus+ Exchange Program", country: "🇪🇺 Europe", days: 90, urgency: "soon" },
];

const countries: CountryCard[] = [
  { flag: "🇮🇹", name: "Italy", count: 12 },
  { flag: "🇨🇳", name: "China", count: 18 },
  { flag: "🇹🇷", name: "Turkey", count: 9 },
  { flag: "🇷🇺", name: "Russia", count: 7 },
  { flag: "🇩🇪", name: "Germany", count: 14 },
  { flag: "🇬🇧", name: "UK", count: 11 },
  { flag: "🇺🇸", name: "USA", count: 22 },
  { flag: "🇫🇷", name: "France", count: 8 },
  { flag: "🇯🇵", name: "Japan", count: 6 },
  { flag: "🇰🇷", name: "South Korea", count: 10 },
];

const novaServices = [
  {
    icon: Compass,
    title: "Opportunity Guidance",
    desc: "Understand eligibility, requirements, and deadlines for the opportunities that match your academic profile.",
  },
  {
    icon: FileText,
    title: "Application Support",
    desc: "Get assistance navigating the application process step by step, from documents to submission.",
  },
  {
    icon: BookOpen,
    title: "English Test Preparation",
    desc: "Prepare for IELTS, TOEFL, Duolingo, and other accepted proficiency tests with expert mentorship.",
  },
  {
    icon: Users,
    title: "Student Mentorship",
    desc: "Get personalized guidance based on your academic background, goals, and target institutions.",
  },
];

const categories = [
  {
    icon: Award,
    label: "Scholarships",
    desc: "Find funded study opportunities.",
    id: "scholarships",
  },
  {
    icon: GraduationCap,
    label: "University Admissions",
    desc: "Explore universities and degree programs.",
    id: "universities",
  },
  {
    icon: Globe,
    label: "International Programs",
    desc: "Discover fellowships, exchanges, and other programs.",
    id: "programs",
  },
  {
    icon: Briefcase,
    label: "Work Abroad",
    desc: "Explore international employment opportunities.",
    id: "work",
  },
];

const features = [
  { icon: TrendingUp, label: "Top Global Opportunities" },
  { icon: Shield, label: "Expert Guidance" },
  { icon: FileText, label: "Application Support" },
  { icon: MessageCircle, label: "Connect With Nova Exams" },
];

// ─── Section fade-in wrapper ─────────────────────────────────────────────────
function FadeInSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Floating Contact Button ─────────────────────────────────────────────────
function FloatingContact() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-[#12103A] border border-[#D4A43A]/30 rounded-2xl shadow-2xl p-5 w-72"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-display font-bold text-[#F7F7FA] text-sm">
              Contact Nova Exam Services
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-[#B9B7C9] hover:text-[#F7F7FA] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            <a
              href="tel:0949700013"
              className="flex items-center gap-3 p-3 rounded-xl bg-[#0D0A32] border border-[#28234D] hover:border-[#D4A43A]/50 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#D4A43A]/20 flex items-center justify-center">
                <Phone className="w-4 h-4 text-[#D4A43A]" />
              </div>
              <div>
                <div className="text-xs text-[#B9B7C9]">Call Us</div>
                <div className="text-sm font-semibold text-[#F7F7FA] group-hover:text-[#D4A43A] transition-colors">
                  0949700013
                </div>
              </div>
            </a>
            <a
              href="https://t.me/NovaExams"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-[#0D0A32] border border-[#28234D] hover:border-[#D4A43A]/50 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#D4A43A]/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-[#D4A43A]" />
              </div>
              <div>
                <div className="text-xs text-[#B9B7C9]">Telegram</div>
                <div className="text-sm font-semibold text-[#F7F7FA] group-hover:text-[#D4A43A] transition-colors">
                  t.me/NovaExams
                </div>
              </div>
            </a>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0D0A32] border border-[#28234D]">
              <div className="w-8 h-8 rounded-lg bg-[#D4A43A]/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-[#D4A43A]" />
              </div>
              <div>
                <div className="text-xs text-[#B9B7C9]">Visit Us</div>
                <div className="text-sm font-medium text-[#F7F7FA]">
                  Bethel, Nur Plaza, 7th Floor
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_0_24px_rgba(212,164,58,0.4)] transition-all"
        style={{
          background: "linear-gradient(135deg, #D4A43A, #B8922A)",
        }}
      >
        {open ? (
          <X className="w-6 h-6 text-[#090625]" />
        ) : (
          <MessageCircle className="w-6 h-6 text-[#090625]" />
        )}
      </motion.button>
    </div>
  );
}

// ─── Opportunity Card ─────────────────────────────────────────────────────────
function OpportunityCard({ opp, delay }: { opp: Opportunity; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(212,164,58,0.15)" }}
      className="relative bg-[#12103A] border border-[#28234D] rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:border-[#D4A43A]/40 group cursor-pointer"
    >
      {/* Gold corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-br-none rounded-tl-none rounded-tr-2xl pointer-events-none">
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-[#D4A43A]/20 border-r-transparent" />
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl leading-none">{opp.flag}</span>
          <div>
            <div className="text-xs text-[#B9B7C9] font-medium">{opp.country}</div>
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mt-1"
              style={{
                background: `${opp.fundingColor}18`,
                color: opp.fundingColor,
                border: `1px solid ${opp.fundingColor}40`,
              }}
            >
              <CheckCircle className="w-3 h-3" />
              {opp.funding}
            </span>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#D4A43A]/10 text-[#D4A43A] border border-[#D4A43A]/20 whitespace-nowrap flex-shrink-0">
          {opp.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-[#F7F7FA] text-lg leading-snug group-hover:text-[#D4A43A] transition-colors duration-300">
        {opp.title}
      </h3>

      {/* Degree */}
      <div className="flex items-center gap-2">
        <GraduationCap className="w-4 h-4 text-[#D4A43A]/70" />
        <span className="text-sm text-[#B9B7C9]">{opp.degree}</span>
      </div>

      {/* Description */}
      <p className="text-sm text-[#B9B7C9] leading-relaxed">{opp.description}</p>

      {/* Deadline & Eligibility */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-1.5 text-xs text-[#B9B7C9]">
          <Calendar className="w-3.5 h-3.5 text-[#D4A43A]/70" />
          <span>Deadline: <span className="text-[#F7F7FA] font-medium">{opp.deadline}</span></span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#B9B7C9]">
          <CheckCircle className="w-3.5 h-3.5 text-green-400/80" />
          <span className="text-green-400/90">{opp.eligibility}</span>
        </div>
      </div>

      {/* CTA */}
      <button className="mt-auto flex items-center gap-2 text-sm font-semibold text-[#D4A43A] hover:text-[#E5B84A] transition-colors group/btn">
        View Details
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const StudyAbroad = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Decorative sparkles
  const sparkles = [
    { top: "15%", left: "5%", delay: 0, size: "text-lg" },
    { top: "28%", left: "92%", delay: 0.6, size: "text-xl" },
    { top: "62%", left: "3%", delay: 1.1, size: "text-sm" },
    { top: "75%", left: "96%", delay: 0.3, size: "text-base" },
  ];

  return (
    <div className="min-h-screen bg-[#090625]">
      {/* ── Navbar ── */}
      <Navbar bgColor="bg-[#090625]/80" />

      {/* ── Ambient glow blobs ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          className="absolute top-[-15%] left-[-15%] w-[550px] h-[550px] rounded-full bg-[#D4A43A]/8 blur-[100px]"
          animate={{ x: [0, 80, -40, 0], y: [0, -40, 70, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#4B3D9E]/12 blur-[90px]"
          animate={{ x: [0, -60, 50, 0], y: [0, 60, -35, 0], scale: [1, 1.1, 0.88, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
      </div>

      {/* ── Sparkle decorations ── */}
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className={`fixed pointer-events-none z-0 select-none text-[#D4A43A]/40 ${s.size}`}
          style={{ top: s.top, left: s.left }}
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        >
          ✦
        </motion.div>
      ))}

      <main className="relative z-10">

        {/* ════════════════════════════════════════════════════
            HERO SECTION
        ════════════════════════════════════════════════════ */}
        <section className="pt-36 pb-20 px-4 relative overflow-hidden">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(#D4A43A 1px, transparent 1px), linear-gradient(90deg, #D4A43A 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 text-sm font-semibold"
              style={{
                background: "rgba(212,164,58,0.12)",
                border: "1px solid rgba(212,164,58,0.30)",
                color: "#D4A43A",
              }}
            >
              <GraduationCap className="w-4 h-4" />
              Study Abroad Hub — Nova Exam Services
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-[#F7F7FA] mb-6 leading-tight"
            >
              Study.{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #D4A43A, #E5B84A)" }}
              >
                Work.
              </span>{" "}
              Go&nbsp;Global.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-[#B9B7C9] mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Discover scholarships, university programs, international fellowships, and
              work-abroad opportunities — then let Nova guide your application.
            </motion.p>

            {/* ── Search Bar ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div
                className="flex items-center gap-3 p-2 pl-5 rounded-2xl transition-all duration-300"
                style={{
                  background: "rgba(18,16,58,0.90)",
                  border: "1px solid rgba(212,164,58,0.25)",
                  boxShadow: "0 0 0 0 rgba(212,164,58,0)",
                }}
                onFocus={() => {}}
              >
                <Search className="w-5 h-5 text-[#D4A43A]/70 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search scholarships, universities, countries..."
                  className="flex-1 bg-transparent text-[#F7F7FA] placeholder-[#B9B7C9]/60 text-base outline-none py-2 min-w-0"
                />
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-[#090625] transition-all duration-200 hover:shadow-[0_0_20px_rgba(212,164,58,0.4)] hover:-translate-y-0.5 active:translate-y-0 flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #D4A43A, #B8922A)" }}
                >
                  Search <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* ── Category Buttons ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
            >
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center transition-all duration-300"
                  style={{
                    background:
                      activeCategory === cat.id
                        ? "rgba(212,164,58,0.18)"
                        : "rgba(18,16,58,0.80)",
                    border:
                      activeCategory === cat.id
                        ? "1px solid rgba(212,164,58,0.60)"
                        : "1px solid rgba(212,164,58,0.18)",
                    boxShadow:
                      activeCategory === cat.id
                        ? "0 0 24px rgba(212,164,58,0.18)"
                        : "none",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background:
                        activeCategory === cat.id
                          ? "rgba(212,164,58,0.30)"
                          : "rgba(212,164,58,0.12)",
                    }}
                  >
                    <cat.icon className="w-5 h-5 text-[#D4A43A]" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-sm text-[#F7F7FA]">
                      {cat.label}
                    </div>
                    <div className="text-xs text-[#B9B7C9] mt-0.5 leading-tight">{cat.desc}</div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Feature Row ── */}
        <section className="py-6 px-4 border-y border-[#28234D]/60">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {features.map((f, i) => (
                <FadeInSection key={f.label} delay={i * 0.08}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#D4A43A]/15 flex items-center justify-center">
                      <f.icon className="w-4 h-4 text-[#D4A43A]" />
                    </div>
                    <span className="text-sm font-semibold text-[#F7F7FA]">{f.label}</span>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            FEATURED OPPORTUNITIES
        ════════════════════════════════════════════════════ */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <FadeInSection>
              <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
                <div>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-3"
                    style={{
                      background: "rgba(212,164,58,0.12)",
                      border: "1px solid rgba(212,164,58,0.25)",
                      color: "#D4A43A",
                    }}
                  >
                    <Star className="w-3.5 h-3.5" />
                    Curated for You
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F7F7FA]">
                    Featured Opportunities
                  </h2>
                </div>
                <button className="flex items-center gap-1.5 text-sm font-semibold text-[#D4A43A] hover:text-[#E5B84A] transition-colors group">
                  View All
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </FadeInSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.map((opp, i) => (
                <OpportunityCard key={opp.id} opp={opp} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            DEADLINE RADAR
        ════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 bg-[#0D0A32]">
          <div className="max-w-5xl mx-auto">
            <FadeInSection>
              <div className="text-center mb-10">
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
                  style={{
                    background: "rgba(212,164,58,0.12)",
                    border: "1px solid rgba(212,164,58,0.25)",
                    color: "#D4A43A",
                  }}
                >
                  <Clock className="w-3.5 h-3.5" />
                  Deadline Radar
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F7F7FA] mb-3">
                  Don't Miss Application Deadlines
                </h2>
                <p className="text-[#B9B7C9] text-base max-w-xl mx-auto">
                  Track upcoming deadlines so you never miss an opportunity.
                </p>
              </div>
            </FadeInSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {deadlineItems.map((item, i) => {
                const isUrgent = item.urgency === "urgent";
                const isSoon = item.urgency === "soon";
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[#12103A] border transition-all duration-300 cursor-pointer hover:border-[#D4A43A]/40"
                    style={{
                      borderColor: isUrgent
                        ? "rgba(239,68,68,0.40)"
                        : isSoon
                        ? "rgba(251,191,36,0.30)"
                        : "rgba(40,35,77,0.80)",
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0 font-display font-bold"
                      style={{
                        background: isUrgent
                          ? "rgba(239,68,68,0.15)"
                          : isSoon
                          ? "rgba(251,191,36,0.15)"
                          : "rgba(212,164,58,0.12)",
                      }}
                    >
                      <span
                        className="text-lg leading-none font-bold"
                        style={{
                          color: isUrgent ? "#ef4444" : isSoon ? "#fbbf24" : "#D4A43A",
                        }}
                      >
                        {item.days}
                      </span>
                      <span
                        className="text-[10px] font-semibold"
                        style={{
                          color: isUrgent ? "#ef4444" : isSoon ? "#fbbf24" : "#D4A43A",
                          opacity: 0.8,
                        }}
                      >
                        days
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-display font-semibold text-sm text-[#F7F7FA] leading-snug truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-[#B9B7C9] mt-1">{item.country}</div>
                      <div
                        className="text-xs font-medium mt-1"
                        style={{
                          color: isUrgent ? "#ef4444" : isSoon ? "#fbbf24" : "#6ee7b7",
                        }}
                      >
                        {isUrgent ? "⚠ Urgent" : isSoon ? "⏳ Closing Soon" : "✓ Open"}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            EXPLORE BY COUNTRY
        ════════════════════════════════════════════════════ */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <FadeInSection>
              <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
                <div>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-3"
                    style={{
                      background: "rgba(212,164,58,0.12)",
                      border: "1px solid rgba(212,164,58,0.25)",
                      color: "#D4A43A",
                    }}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Global Reach
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F7F7FA]">
                    Explore by Country
                  </h2>
                </div>
                <button className="flex items-center gap-1.5 text-sm font-semibold text-[#D4A43A] hover:text-[#E5B84A] transition-colors group">
                  View All Countries
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {countries.map((c, i) => (
                <motion.button
                  key={c.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 0 28px rgba(212,164,58,0.2)",
                    borderColor: "rgba(212,164,58,0.50)",
                  }}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#12103A] border border-[#28234D] transition-all duration-300 group"
                >
                  <span className="text-3xl">{c.flag}</span>
                  <div className="text-center">
                    <div className="font-display font-semibold text-sm text-[#F7F7FA] group-hover:text-[#D4A43A] transition-colors">
                      {c.name}
                    </div>
                    <div className="text-xs text-[#B9B7C9] mt-0.5">
                      {c.count} opportunities
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            NOVA SERVICES — MORE THAN OPPORTUNITIES
        ════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 bg-[#0D0A32] relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4A43A]/3 via-transparent to-[#4B3D9E]/5 pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10">
            <FadeInSection className="text-center mb-14">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{
                  background: "rgba(212,164,58,0.12)",
                  border: "1px solid rgba(212,164,58,0.25)",
                  color: "#D4A43A",
                }}
              >
                <Shield className="w-3.5 h-3.5" />
                Study Abroad Services
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F7F7FA] mb-4">
                More Than Opportunities
              </h2>
              <p className="text-[#B9B7C9] text-base max-w-xl mx-auto leading-relaxed">
                Nova helps students move from discovering an opportunity to preparing a stronger
                application — every step of the way.
              </p>
            </FadeInSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {novaServices.map((svc, i) => (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 16px 48px rgba(212,164,58,0.14)",
                    borderColor: "rgba(212,164,58,0.50)",
                  }}
                  className="bg-[#12103A] border border-[#28234D] rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#D4A43A]/15 flex items-center justify-center group-hover:bg-[#D4A43A]/25 transition-colors duration-300">
                    <svc.icon className="w-6 h-6 text-[#D4A43A]" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[#F7F7FA] mb-2 group-hover:text-[#D4A43A] transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-[#B9B7C9] leading-relaxed">{svc.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <FadeInSection delay={0.2} className="mt-12 text-center">
              <div className="inline-flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="tel:0949700013"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[#090625] transition-all duration-200 hover:shadow-[0_0_24px_rgba(212,164,58,0.40)] hover:-translate-y-0.5 active:translate-y-0"
                  style={{ background: "linear-gradient(135deg, #D4A43A, #B8922A)" }}
                >
                  <Phone className="w-4 h-4" />
                  Talk to an Advisor
                </a>
                <a
                  href="https://t.me/NovaExams"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[#D4A43A] border border-[#D4A43A]/30 bg-[#D4A43A]/8 hover:bg-[#D4A43A]/15 hover:border-[#D4A43A]/50 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message on Telegram
                </a>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            STATS STRIP
        ════════════════════════════════════════════════════ */}
        <section className="py-14 px-4 border-t border-[#28234D]/60">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "150+", label: "Scholarships Listed" },
                { number: "40+", label: "Countries Covered" },
                { number: "500+", label: "Students Guided" },
                { number: "4+", label: "Years of Experience" },
              ].map((stat, i) => (
                <FadeInSection key={stat.label} delay={i * 0.1}>
                  <div>
                    <div
                      className="font-display text-3xl md:text-4xl font-bold bg-clip-text text-transparent mb-1"
                      style={{
                        backgroundImage: "linear-gradient(135deg, #D4A43A, #E5B84A)",
                      }}
                    >
                      {stat.number}
                    </div>
                    <div className="text-sm text-[#B9B7C9]">{stat.label}</div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Floating Contact ── */}
      <FloatingContact />
    </div>
  );
};

export default StudyAbroad;
