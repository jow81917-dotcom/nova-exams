import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PracticeHub() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar bgColor="bg-[hsl(var(--hero-bg))]/70" />
      <main className="flex-1 pt-[72px]">
        <iframe
          src="https://nova-det-mentorship.vercel.app/"
          title="Nova Practice Hub"
          className="w-full h-[calc(100vh-72px)]"
          style={{ border: "none" }}
          allow="fullscreen"
        />
      </main>
      <Footer />
    </div>
  );
}
