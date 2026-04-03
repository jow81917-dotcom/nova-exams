import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { TelegramButton } from "@/components/TelegramButton";
import { ExamsSection } from "@/components/ExamsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <main className="w-full overflow-x-hidden">
        <HeroSection />
        <ServicesSection />
        <ExamsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <ChatBot />
      <TelegramButton />
    </div>
  );
};

export default Index;
