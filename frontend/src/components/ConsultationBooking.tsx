import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Video, Clock, Users, ExternalLink } from "lucide-react";
interface ConsultationType {
  id: string;
  title: string;
  duration: string;
  description: string;
  icon: React.ReactNode;
  url: string;
}
const consultationTypes: ConsultationType[] = [
  {
    id: "exam-prep",
    title: "Exam Preparation Session",
    duration: "30 min",
    description:
      "One-on-one session to discuss exam strategies and preparation tips",
    icon: <Calendar className="w-5 h-5" />,
    url: "https://calendly.com/astronomer291/30min",
  },
  {
    id: "mentorship",
    title: "Mentorship Consultation",
    duration: "45 min",
    description: "Connect with high scorers for personalized guidance",
    icon: <Users className="w-5 h-5" />,
    url: "https://calendly.com/astronomer291/30min",
  },
  {
    id: "general",
    title: "General Inquiry",
    duration: "15 min",
    description: "Quick call to answer your questions about our services",
    icon: <Clock className="w-5 h-5" />,
    url: "https://calendly.com/astronomer291/30min",
  },
];
export const ConsultationBooking = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleBookNow = (type: ConsultationType) => {
    setSelectedType(type.id);
    window.open(type.url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-16 bg-muted/30 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-secondary/10 text-secondary mb-4">
            <Video className="w-4 h-4 mr-2" />
            Google Meet Integration
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Book a free <span className="text-primary">Consultation</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Schedule a video consultation with our experts via Google Meet. Get
            personalized guidance for your exam preparation journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {consultationTypes.map((type) => (
            <Card
              key={type.id}
              className={`cursor-pointer transition-all hover:shadow-lg hover:border-secondary/50 ${
                selectedType === type.id
                  ? "border-secondary ring-2 ring-secondary"
                  : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    {type.icon}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {type.duration}
                  </Badge>
                </div>
                <CardTitle className="font-display text-lg">
                  {type.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {type.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Video className="w-4 h-4 text-secondary" />
                  <span>Via Google Meet</span>
                </div>
                <Button
                  variant="hero"
                  size="sm"
                  className="w-full"
                  onClick={() => handleBookNow(type)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Calendar className="w-5 h-5 text-secondary" />
              Schedule Your Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Ready to Connect?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Click the button below to open our scheduling page and book your
                consultation. You'll receive a Google Meet link automatically.
              </p>
              <Button
                variant="hero"
                size="sm"
                onClick={() =>
                  window.open(
                    "https://calendly.com/astronomer291/30min",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className="w-full"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Open Calendly Scheduler
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Powered by Calendly • Google Meet links included
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">
                  Easy Scheduling
                </h4>
                <p className="text-sm text-muted-foreground">
                  Pick a time that works for you
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                  <Video className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">
                  Google Meet
                </h4>
                <p className="text-sm text-muted-foreground">
                  Auto-generated meeting links
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-accent-foreground" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">
                  Reminders
                </h4>
                <p className="text-sm text-muted-foreground">
                  Email & calendar reminders
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
