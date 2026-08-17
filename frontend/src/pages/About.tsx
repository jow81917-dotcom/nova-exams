import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { TelegramButton } from "@/components/TelegramButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  FileText,
  Monitor,
  Globe,
  CheckCircle,
  ArrowRight,
  Users,
  Star,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Brand constants
const BRAND_NAME = "Nova Exam Services";

const destinations = [
  { name: "Italy", desc: "Scholarships, universities, and Application support" },
  { name: "China", desc: "University and scholarship opportunities" },
  { name: "Russia", desc: "International education opportunities" },
  { name: "Turkey", desc: "University and scholarship applications" },
];

const journeyStages = [
  { title: "Discover", desc: "Find the right destination for your study" },
  { title: "Choose", desc: "Call Nova Exam Services to discuss over the proficiency and admission tests" },
  { title: "Prepare", desc: "Start your mentorship with Nova Exam Services" },
  { title: "Register", desc: "Book your test and take the test at Nova Exam Service fully facilitated exam room service" },
  { title: "Take Exam", desc: "Access professional test-day support" },
  { title: "Apply", desc: "Navigate international university applications" },
  { title: "Move Forward", desc: "Pursue your academic goals internationally" },
];

const impactStats = [
  { number: "500+", label: "Students Served" },
  { number: "6+", label: "International Exams" },
  { number: "4+", label: "Study Abroad Destinations" },
];

const novaConcepts = [
  {
    icon: BookOpen,
    title: "Exam Expertise",
    desc: "International examination guidance and fully facilitated exam room service"
  },
  {
    icon: FileText,
    title: "Integrated Services",
    desc: "Registration, preparation and study abroad support"
  },
  {
    icon: Users,
    title: "Student-First",
    desc: "Designed around real student needs"
  },
  {
    icon: Globe,
    title: "Global Access",
    desc: "Connecting Ethiopian students with international opportunities"
  }
];

const services = [
  {
    icon: BookOpen,
    title: "International Exam Services",
    desc: "Registration and support for IELTS, TOEFL, Duolingo, TOLC, GRE and other exams",
    cta: "Explore Exams",
  },
  {
    icon: FileText,
    title: "Exam Preparation",
    desc: "Structured preparation, practice resources, mentorship, and guidance",
    cta: "Start Preparing",
  },
  {
    icon: Monitor,
    title: "Test-Day Services",
    desc: "Professional exam-room services and practical assistance",
    cta: "Learn More",
  },
  {
    icon: Globe,
    title: "Study Abroad Services",
    desc: "Application support for Italy, China, Russia, Turkey and more",
    cta: "Explore Study Abroad",
  },
];

// Background Golden Bubble Animation Component
const GoldenBubbleBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <motion.div
      className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] rounded-full bg-[#D4A43A]/10 blur-[80px]"
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -50, 80, 0],
        scale: [1, 1.2, 0.9, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#E5B84A]/10 blur-[70px]"
      animate={{
        x: [0, -80, 60, 0],
        y: [0, 70, -40, 0],
        scale: [1, 1.1, 0.85, 1],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 5,
      }}
    />
    <motion.div
      className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#D4A43A]/8 blur-[60px]"
      animate={{
        x: [0, 50, -30, 0],
        y: [0, -40, 60, 0],
        scale: [1, 1.15, 0.9, 1],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
      }}
    />
  </div>
);

// Journey Timeline Component
const JourneyTimeline = () => (
  <div className="py-20 bg-gradient-to-b from-[#0D0A32] to-[#090625]">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <Badge className="bg-[#D4A43A]/20 text-[#D4A43A] border border-[#D4A43A]/30 px-6 py-2 mb-6">
          The Nova Journey
        </Badge>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl font-bold text-[#F7F7FA] mb-4"
        >
          From Ethiopia to the World
        </motion.h2>
        <p className="text-[#B9B7C9] text-lg max-w-2xl mx-auto">
          Your complete pathway to international education
        </p>
      </div>

      <div className="hidden md:flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#28234D]" />
        {journeyStages.map((stage, index) => (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 relative z-10"
          >
            <div className="w-16 h-16 rounded-full bg-[#12103A] border-4 border-[#D4A43A] flex items-center justify-center shadow-[0_0_20px_rgba(212,164,58,0.3)]">
              <span className="font-display text-2xl font-bold text-[#D4A43A]">{index + 1}</span>
            </div>
            <div className="text-center max-w-[160px]">
              <h3 className="font-display font-bold text-[#F7F7FA] mb-2">{stage.title}</h3>
              <p className="text-[#B9B7C9] text-sm">{stage.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="md:hidden relative pl-8 border-l-2 border-[#28234D]">
        {journeyStages.map((stage, index) => (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="mb-10 relative"
          >
            <div className="absolute -left-[31px] top-2 w-4 h-4 rounded-full bg-[#D4A43A] border-2 border-[#090625] z-10" />
            <div>
              <span className="font-display text-2xl font-bold text-[#D4A43A] mb-2 block">0{index + 1}</span>
              <h3 className="font-display font-bold text-[#F7F7FA] mb-2">{stage.title}</h3>
              <p className="text-[#B9B7C9] text-sm">{stage.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);
// Hero Section with Trust Badges
const HeroSection = ({ onExploreServices }: { onExploreServices: () => void }) => (
  <section className="pt-32 pb-16 bg-[#090625] relative overflow-hidden">
    <div className="absolute inset-0 bg-grid-pattern opacity-5" />
    <div className="absolute inset-0 bg-gradient-to-b from-[#090625] via-[#0D0A32]/30 to-[#090625]" />
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="bg-[#D4A43A]/20 text-[#D4A43A] border border-[#D4A43A]/30 px-6 py-2 mb-8">
            About {BRAND_NAME}
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-[#F7F7FA] mb-8 leading-tight"
        >
          Your Gateway to Global Education
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-[#B9B7C9] mb-10 leading-relaxed"
        >
          {BRAND_NAME} helps students register for and prepare for internationally
          recognized examinations, including the Duolingo English Test, TOEFL,
          IELTS, TOLC, GRE, and other global exams. We also provide seamless
          study-abroad application services.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <Button 
            variant="default" 
            size="lg" 
            className="bg-[#D4A43A] hover:bg-[#E5B84A] text-[#090625]"
            onClick={onExploreServices}
          >
            Explore Our Services
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" className="border-[#D4A43A] text-[#D4A43A]">
            Contact Us
          </Button>
        </motion.div>

        {/* Trust Badges Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mt-8"
        >
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D0A32] border border-[#28234D]">
            <CheckCircle className="w-5 h-5 text-[#D4A43A]" />
            <span className="text-[#F7F7FA] font-medium">Registered by Startup Ethiopia (MInT)</span>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D0A32] border border-[#28234D]">
            <CheckCircle className="w-5 h-5 text-[#D4A43A]" />
            <span className="text-[#F7F7FA] font-medium">Official IELTS Registration Centre for British Council</span>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12"
        >
          <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-[#28234D]">
            <img 
              src="https://i.pinimg.com/736x/35/d1/23/35d12384c69e8439f7870835130e2841.jpg" 
              alt="Nova Exam Services Services" 
              className="w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// Nova Concepts Section
const NovaConceptsSection = () => (
  <section className="py-16 bg-[#0D0A32]">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-[#D4A43A]/20 text-[#D4A43A] border border-[#D4A43A]/30 px-6 py-2 mb-6">
            Our Expertise
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F7F7FA] mb-6">
            Nova-Specific Services
          </h2>
          <div className="pl-8 border-l-4 border-[#D4A43A]">
            <p className="text-xl text-[#B9B7C9] leading-relaxed">
              We combine exam expertise with integrated student support services
              designed for Ethiopian students pursuing global education.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {novaConcepts.map((concept, i) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-[#12103A] border-[#28234D] rounded-2xl p-6 hover:border-[#D4A43A]/50 transition-all duration-300 h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D4A43A]/20 flex items-center justify-center flex-shrink-0">
                    <concept.icon className="w-6 h-6 text-[#D4A43A]" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[#F7F7FA] mb-2">{concept.title}</h3>
                    <p className="text-sm text-[#B9B7C9] leading-relaxed">{concept.desc}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
// What We Provide Section with Booking Modal
const WhatWeProvideSection = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void 
}) => {
  const [bookingStep, setBookingStep] = useState<'select'|'confirm'|'form'|'success'>('select');
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', date: '' });

  const exams = [
    { 
      name: "Duolingo English Test", 
      category: "English Proficiency Test",
      logo: "https://afassociatesuk.com/media/public/blogs/34t13vP6yUre6KDLDBV2gKbVqKy213JyxFvA4ZzK.png" 
    },
    { name: "IELTS", category: "English Proficiency" },
    { name: "TOEFL", category: "English Proficiency" },
    { name: "TOLC", category: "University Admissions" },
    { name: "GRE", category: "Graduate Admissions" },
    { name: "Other Exams", category: "Global Examinations" },
  ];

  const handleSelectExam = (examName: string) => {
    setSelectedExam(examName);
    setBookingStep('confirm');
  };

  const handleSubmitBooking = () => {
    setBookingStep('success');
  };

  const handleCopyMessage = () => {
    const message = `Hello Nova Exam Services, my name is ${formData.name} and I would like to book a ${selectedExam} for ${formData.date}. Please contact me via this number, ${formData.phone}.`;
    navigator.clipboard.writeText(message);
  };

  const handleOpenTelegram = () => {
    const message = `Hello Nova Exam Services, my name is ${formData.name} and I would like to book a ${selectedExam} for ${formData.date}. Please contact me via this number, ${formData.phone}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/novaexams?text=${encodedMessage}`, '_blank');
  };

  if (!isOpen) return null;

  if (bookingStep === 'select') {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-[#12103A] border border-[#28234D] rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-[#12103A] border-b border-[#28234D] p-6">
            <h2 className="font-display text-3xl font-bold text-[#F7F7FA]">What We Provide</h2>
            <p className="text-[#B9B7C9] mt-2">Select a service to explore further</p>
          </div>
          <div className="p-8 grid md:grid-cols-2 gap-6">
            <button
              onClick={() => setBookingStep('confirm')}
              className="group text-left p-8 rounded-2xl bg-[#0D0A32] border border-[#28234D] hover:border-[#D4A43A]/50 hover:bg-[#1a154a] transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-[#D4A43A]/20 flex items-center justify-center mb-4 group-hover:bg-[#D4A43A] group-hover:text-[#090625] transition-colors">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#F7F7FA] mb-2">Exam Purchasing</h3>
              <p className="text-[#B9B7C9]">Book your international exam at Nova Exam Services</p>
            </button>
            <button
              onClick={onClose}
              className="group text-left p-8 rounded-2xl bg-[#0D0A32] border border-[#28234D] hover:border-[#4DA3FF]/50 hover:bg-[#0d1a3a] transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-[#4DA3FF]/20 flex items-center justify-center mb-4 group-hover:bg-[#4DA3FF] group-hover:text-[#090625] transition-colors">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#F7F7FA] mb-2">Exam Preparation</h3>
              <p className="text-[#B9B7C9]">Virtual and in-person mentorship sessions</p>
            </button>
            <button
              onClick={onClose}
              className="group text-left p-8 rounded-2xl bg-[#0D0A32] border border-[#28234D] hover:border-[#9D4EDD]/50 hover:bg-[#1a0d3a] transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-[#9D4EDD]/20 flex items-center justify-center mb-4 group-hover:bg-[#9D4EDD] group-hover:text-[#090625] transition-colors">
                <Monitor className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#F7F7FA] mb-2">Test-Day Services</h3>
              <p className="text-[#B9B7C9]">Professional exam room with full facilities</p>
            </button>
            <button
              onClick={onClose}
              className="group text-left p-8 rounded-2xl bg-[#0D0A32] border border-[#28234D] hover:border-[#F79F1A]/50 hover:bg-[#3a1a0d] transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-[#F79F1A]/20 flex items-center justify-center mb-4 group-hover:bg-[#F79F1A] group-hover:text-[#090625] transition-colors">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#F7F7FA] mb-2">Study Abroad Services</h3>
              <p className="text-[#B9B7C9]">From exam day to university admission</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (bookingStep === 'confirm' && selectedExam) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-[#12103A] border border-[#28234D] rounded-3xl shadow-2xl w-full max-w-md p-8">
          <h3 className="font-display text-2xl font-bold text-[#F7F7FA] mb-4">Book Your International Exam</h3>
          <p className="text-[#B9B7C9] mb-6">Select your examination to begin your booking request.</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {exams.map((exam, i) => (
              <button
                key={exam.name}
                onClick={() => handleSelectExam(exam.name)}
                className="flex items-center gap-3 p-4 rounded-xl bg-[#0D0A32] border border-[#28234D] hover:border-[#D4A43A] transition-all text-left"
              >
                {exam.logo && (
                  <img src={exam.logo} alt={exam.name} className="w-10 h-10 object-contain" />
                )}
                <div className="flex-1">
                  <div className="font-semibold text-[#F7F7FA]">{exam.name}</div>
                  <div className="text-xs text-[#B9B7C9]">{exam.category}</div>
                </div>
              </button>
            ))}
          </div>
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="text-[#B9B7C9] hover:text-[#F7F7FA]"
          >
            Back to Services
          </Button>
        </div>
      </div>
    );
  }

  if (bookingStep === 'form' && selectedExam) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-[#12103A] border border-[#28234D] rounded-3xl shadow-2xl w-full max-w-lg p-8">
          <h3 className="font-display text-2xl font-bold text-[#F7F7FA] mb-6">{selectedExam} Booking</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#B9B7C9] mb-2">What is your name?</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Yohannes Geremew"
                className="w-full px-4 py-3 rounded-xl bg-[#0D0A32] border border-[#28234D] text-[#F7F7FA] focus:border-[#D4A43A] focus:ring-1 focus:ring-[#D4A43A] outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#B9B7C9] mb-2">When do you want to take the test?</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-[#0D0A32] border border-[#28234D] text-[#F7F7FA] focus:border-[#D4A43A] focus:ring-1 focus:ring-[#D4A43A] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#B9B7C9] mb-2">Phone number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="0949700013"
                  className="w-full px-4 py-3 rounded-xl bg-[#0D0A32] border border-[#28234D] text-[#F7F7FA] focus:border-[#D4A43A] focus:ring-1 focus:ring-[#D4A43A] outline-none transition-all"
                />
              </div>
            </div>
            <Button 
              onClick={handleSubmitBooking}
              disabled={!formData.name || !formData.date || !formData.phone}
              className="w-full bg-[#D4A43A] hover:bg-[#E5B84A] text-[#090625]"
            >
              Submit Booking Request
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (bookingStep === 'success') {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-[#12103A] border border-[#28234D] rounded-3xl shadow-2xl w-full max-w-lg p-8">
          <div className="w-16 h-16 rounded-full bg-[#D4A43A]/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-[#D4A43A]" />
          </div>
          <h3 className="font-display text-2xl font-bold text-[#F7F7FA] mb-4 text-center">Your Booking Request Is Ready</h3>
          <p className="text-[#B9B7C9] text-center mb-6">We've prepared your message for Nova Exam Services. Continue to Telegram to send your request.</p>
          <div className="bg-[#0D0A32] p-4 rounded-xl border border-[#28234D] mb-6">
            <p className="text-sm text-[#B9B7C9] mb-2">Preview:</p>
            <p className="text-[#F7F7FA] text-sm font-mono">{`Hello Nova Exam Services, my name is ${formData.name} and I would like to book a ${selectedExam} for ${formData.date}. Please contact me via this number, ${formData.phone}.`}</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={handleCopyMessage}
              variant="outline"
              className="flex-1 border-[#D4A43A] text-[#D4A43A] hover:bg-[#D4A43A]/10"
            >
              Copy
            </Button>
            <Button 
              onClick={handleOpenTelegram}
              className="flex-1 bg-[#0088cc] hover:bg-[#0077b5] text-white"
            >
              Open Telegram
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
// Main Component
const About = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#090625] overflow-x-hidden relative">
      <GoldenBubbleBackground />
      <Navbar bgColor="bg-gradient-secondary" />
      <main className="pt-20 relative z-10">
        <HeroSection onExploreServices={() => setShowBookingModal(true)} />
        <NovaConceptsSection />
        <WhatWeProvideSection isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
        <section className="py-20 bg-[#090625]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F7F7FA] mb-6">Who We Are</h2>
              <p className="text-xl text-[#B9B7C9]">
                {BRAND_NAME} is an education-services company helping students navigate the
                examinations and application processes required to pursue international
                education.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "AI-integrated practice and mentorship platform",
                "Reliable and professional exam facilities",
                "Wide variety of internationally recognized exams",
                "Expert mentorship from high scorers",
                "Flexible scheduling options",
                "Transparent and competitive pricing",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-[#12103A] border border-[#28234D]">
                  <CheckCircle className="w-5 h-5 text-[#D4A43A] flex-shrink-0 mt-0.5" />
                  <p className="text-[#F7F7FA]">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <JourneyTimeline />
        <section className="py-20 bg-[#0D0A32]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F7F7FA] mb-6">
                One Platform. Multiple Paths to Global Education.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, i) => (
                <div key={service.title} className="bg-[#12103A] border-[#28234D] rounded-2xl p-6">
                  <div className="w-14 h-14 rounded-xl bg-[#D4A43A]/20 flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-[#D4A43A]" />
                  </div>
                  <h3 className="font-display font-bold text-[#F7F7FA] text-xl mb-4">{service.title}</h3>
                  <p className="text-[#B9B7C9] mb-6">{service.desc}</p>
                  <Button variant="ghost" className="text-[#D4A43A] hover:text-[#E5B84A]">
                    {service.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-[#090625]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F7F7FA] mb-6">
                The Right Test for Your Next Step
              </h2>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="font-display text-2xl font-bold text-[#F7F7FA] mb-6 flex items-center gap-3">
                  <span className="w-12 h-1 rounded-full bg-[#D4A43A]" />
                  English Proficiency
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { name: "IELTS", desc: "International English Language Testing System" },
                    { name: "TOEFL", desc: "Test of English as a Foreign Language" },
                    { name: "Duolingo", desc: "Duolingo English Test" },
                  ].map((exam, i) => (
                    <div key={exam.name} className="bg-[#12103A] border-[#28234D] rounded-2xl p-6">
                      <h4 className="font-display font-bold text-[#F7F7FA] text-2xl mb-2">{exam.name}</h4>
                      <p className="text-sm text-[#B9B7C9] mb-4">English Proficiency</p>
                      <p className="text-[#B9B7C9] mb-6">{exam.desc}</p>
                      <Button variant="ghost" className="text-[#D4A43A] hover:text-[#E5B84A] text-sm">
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-[#F7F7FA] mb-6 flex items-center gap-3">
                  <span className="w-12 h-1 rounded-full bg-[#D4A43A]" />
                  University & Graduate Admissions
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { name: "TOLC", desc: "Test of Logic, Critical Thinking" },
                    { name: "GRE", desc: "Graduate Record Examination" },
                  ].map((exam, i) => (
                    <div key={exam.name} className="bg-[#12103A] border-[#28234D] rounded-2xl p-6">
                      <h4 className="font-display font-bold text-[#F7F7FA] text-2xl mb-2">{exam.name}</h4>
                      <p className="text-sm text-[#B9B7C9] mb-4">University Admissions</p>
                      <p className="text-[#B9B7C9] mb-6">{exam.desc}</p>
                      <Button variant="ghost" className="text-[#D4A43A] hover:text-[#E5B84A] text-sm">
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-[#0D0A32]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F7F7FA] mb-6">
                Your Education Doesn't Have to End at the Border
              </h2>
              <p className="text-xl text-[#B9B7C9]">
                {BRAND_NAME} provides study-abroad application support for students seeking
                educational opportunities internationally.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map((dest, i) => (
                <div key={dest.name} className="bg-[#12103A] border-[#28234D] rounded-2xl p-6 group">
                  <div className="w-14 h-14 rounded-xl bg-[#D4A43A]/20 flex items-center justify-center mb-6 group-hover:bg-[#D4A43A] transition-colors">
                    <Globe className="w-7 h-7 text-[#D4A43A] group-hover:text-[#090625]" />
                  </div>
                  <h3 className="font-display font-bold text-[#F7F7FA] text-xl mb-3">{dest.name}</h3>
                  <p className="text-[#B9B7C9] mb-6">{dest.desc}</p>
                  <Button variant="ghost" className="text-[#D4A43A] hover:text-[#E5B84A] text-sm">
                    Explore Study Abroad
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <TrustSection />
        <section className="py-20 bg-[#0D0A32]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F7F7FA] mb-6">
                Built Around the Student
              </h2>
              <p className="text-xl text-[#B9B7C9]">
                We design every aspect of our services with the student experience in mind
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: "Expertise", desc: "Practical guidance across international examinations and application processes" },
                { title: "Convenience", desc: "Multiple education services brought together in one place" },
                { title: "Guidance", desc: "Support throughout preparation, registration, testing, and application" },
                { title: "Global Perspective", desc: "Connecting Ethiopian students with international education opportunities" },
              ].map((item, i) => (
                <div key={item.title} className="bg-[#12103A] border-[#28234D] rounded-2xl p-8 text-center">
                  <div className="w-12 h-12 rounded-lg bg-[#D4A43A]/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-6 h-6 text-[#D4A43A]" />
                  </div>
                  <h3 className="font-display font-bold text-[#F7F7FA] text-xl mb-4">{item.title}</h3>
                  <p className="text-[#B9B7C9]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-[#090625]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="bg-[#D4A43A]/20 text-[#D4A43A] border border-[#D4A43A]/30 px-6 py-2 mb-6">
                Trust & Recognition
              </Badge>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F7F7FA] mb-6">
                A Service Built on Trust
              </h2>
              <p className="text-xl text-[#B9B7C9]">
                Verified credentials and authorized partnerships
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-[#12103A] rounded-3xl p-8 border border-[#28234D]">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#D4A43A]/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-8 h-8 text-[#D4A43A]" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[#F7F7FA] text-xl mb-2">
                      Registered by Startup Ethiopia (MInT)
                    </h3>
                    <p className="text-[#B9B7C9]">
                      Official registration and authorization from the Ethiopian government
                      through the Ministry of Innovation and Technology.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#12103A] rounded-3xl p-8 border border-[#28234D]">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#D4A43A]/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-8 h-8 text-[#D4A43A]" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[#F7F7FA] text-xl mb-2">
                      Official IELTS Registration Centre
                    </h3>
                    <p className="text-[#B9B7C9]">
                      Authorized examination centre for the British Council's IELTS program.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-[#0D0A32]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F7F7FA] mb-6">
                Making a Difference
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {impactStats.map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-5xl md:text-6xl font-bold text-[#D4A43A] mb-4">
                    {stat.number}
                  </div>
                  <div className="font-display text-xl text-[#F7F7FA]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-gradient-to-b from-[#0D0A32] to-[#05041A]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#F7F7FA] mb-6">
                Your Global Journey Starts Here
              </h2>
              <p className="text-xl text-[#B9B7C9] mb-12">
                Whether you're preparing for an international examination, registering for
                your next test, or planning to study abroad, {BRAND_NAME} is here to help
                you navigate the process.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#12103A] border-[#28234D] rounded-3xl p-8">
                  <div className="w-14 h-14 rounded-xl bg-[#4DA3FF]/20 flex items-center justify-center mb-6">
                    <BookOpen className="w-7 h-7 text-[#4DA3FF]" />
                  </div>
                  <h3 className="font-display font-bold text-[#F7F7FA] text-xl mb-3">Take an Exam</h3>
                  <p className="text-[#B9B7C9] mb-6">Book your next international examination</p>
                  <Button variant="default" className="w-full bg-[#4DA3FF] hover:bg-[#3d8ce5] text-white">
                    Book an Exam
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>

                <div className="bg-[#12103A] border-[#28234D] rounded-3xl p-8">
                  <div className="w-14 h-14 rounded-xl bg-[#D4A43A]/20 flex items-center justify-center mb-6">
                    <FileText className="w-7 h-7 text-[#D4A43A]" />
                  </div>
                  <h3 className="font-display font-bold text-[#F7F7FA] text-xl mb-3">Prepare</h3>
                  <p className="text-[#B9B7C9] mb-6">Access preparation and practice resources</p>
                  <Button variant="default" className="w-full bg-[#D4A43A] hover:bg-[#E5B84A] text-[#090625]">
                    Visit Practice Hub
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>

                <div className="bg-[#12103A] border-[#28234D] rounded-3xl p-8">
                  <div className="w-14 h-14 rounded-xl bg-[#9D4EDD]/20 flex items-center justify-center mb-6">
                    <Globe className="w-7 h-7 text-[#9D4EDD]" />
                  </div>
                  <h3 className="font-display font-bold text-[#F7F7FA] text-xl mb-3">Study Abroad</h3>
                  <p className="text-[#B9B7C9] mb-6">Explore international education opportunities</p>
                  <Button variant="default" className="w-full bg-[#9D4EDD] hover:bg-[#8b3dcc] text-white">
                    Explore Study Abroad
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
      <TelegramButton />
    </div>
  );
};

// Trust Section (separate component for clarity)
const TrustSection = () => {
  // This is a placeholder - the trust section is embedded in the main component
  return null;
};

export default About;
