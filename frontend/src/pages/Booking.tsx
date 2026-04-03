import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  MessageCircle,
  Phone,
  CreditCard,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useExams } from "../hooks/useExam";
import { Checkbox } from "@/components/ui/checkbox";
import { ConsultationBooking } from "@/components/ConsultationBooking";
import { ChatBot } from "@/components/ChatBot";
import { TelegramButton } from "@/components/TelegramButton";

export interface Exam {
  id: string;
  examType: string;
  name: string;
  description: string;
  mentorship?: string;
  mentorshipValue?: number;
  examRoomService?: number;
  basePrice?: number;
  sum?: number;
}

const Booking = () => {
  const { toast } = useToast();
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [wantsMentorship, setWantsMentorship] = useState(false);
  const [step, setStep] = useState(1);

  const { data: exams, isLoading, isError } = useExams();

  const selectedExamData = exams?.find((e: Exam) => e.id === selectedExam);

  const isOthersExam =
    selectedExamData?.examType?.toLowerCase() === "others" ||
    selectedExamData?.examType?.toLowerCase() === "other";

  const totalPrice = selectedExamData
    ? (selectedExamData.basePrice ?? selectedExamData.sum ?? 0) +
      (wantsMentorship ? (selectedExamData.mentorshipValue ?? 0) : 0)
    : 0;

  const handleProceed = () => {
    if (step === 1 && !selectedExam) {
      toast({
        title: "Please select an exam",
        description: "Choose the exam you want to book.",
        variant: "destructive",
      });
      return;
    }

    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2 && !isOthersExam) {
      setStep(3);
      return;
    }

    if (step === 3) {
      toast({
        title: "Coming Soon",
        description:
          "Chapa payments will be available shortly. Until then, please reach us via Telegram, Email, or other services to complete your booking.",
      });
    }
  };

  if (isError)
    return <p className="text-center text-red-500">Failed to load exams</p>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar bgColor="bg-gradient-secondary" />
      <main className="pt-20">
        <section className="py-16 bg-gradient-secondary">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground mb-6">
              Book Your <span className="text-primary">Exam</span>
            </h1>
            <p className="text-secondary-foreground/90 text-lg max-w-2xl mx-auto">
              Follow the simple steps below to book your exam with optional
              mentorship.
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4 mb-12">
              {[
                { num: 1, label: "Select Exam" },
                { num: 2, label: "Options" },
                ...(!isOthersExam ? [{ num: 3, label: "Payment" }] : []),
              ].map((s, i, arr) => (
                <div key={s.num} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= s.num
                        ? "bg-gradient-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                  </div>
                  <span
                    className={`ml-2 hidden sm:inline ${
                      step >= s.num
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                  {i < arr.length - 1 && (
                    <div
                      className={`w-12 h-1 mx-4 ${
                        step > s.num ? "bg-secondary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="max-w-4xl mx-auto">
              {step === 1 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
                    Choose Your Exam
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isLoading ? (
                      <div className="flex items-center justify-center min-h-[400px] col-span-full">
                        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
                      </div>
                    ) : (
                      exams.map((exam: Exam) => (
                        <Card
                          key={exam.id}
                          className={`cursor-pointer transition-all ${
                            selectedExam === exam.id
                              ? "border-secondary ring-2 ring-secondary"
                              : "border-border hover:border-secondary/50"
                          }`}
                          onClick={() => setSelectedExam(exam.id)}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <Badge className="bg-primary text-primary-foreground">
                                {exam.examType}
                              </Badge>
                              {selectedExam === exam.id && (
                                <CheckCircle className="w-5 h-5 text-secondary" />
                              )}
                            </div>
                            <CardTitle className="text-lg font-display">
                              {exam.examType} Exam
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                              {exam.mentorship}
                            </p>
                            <p className="font-bold text-foreground">
                              {exam.examType.toLowerCase().includes("other")
                                ? "Contact for details"
                                : exam.sum != null
                                  ? `${exam.sum.toLocaleString()} ETB`
                                  : exam.basePrice != null
                                    ? `${exam.basePrice.toLocaleString()} ETB`
                                    : ""}
                            </p>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="max-w-lg mx-auto">
                  {isOthersExam ? (
                    <Card className="bg-tertiary/10 border-tertiary/30 shadow-lg max-w-3xl mx-auto mt-8">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-tertiary/20 flex items-center justify-center mx-auto mb-4">
                          <MessageCircle className="w-8 h-8 text-tertiary animate-bounce" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                          Need a Different Exam?
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                          For exams not listed above or custom requirements,
                          please contact our center directly. We're here to help
                          you find the right solution.
                        </p>
                        <Button
                          variant="hero"
                          size="lg"
                          className="ml-auto"
                          onClick={() =>
                            (window.location.href = "tel:+251949700013")
                          }
                        >
                          <Phone className="w-5 h-5 mr-2" />
                          Contact the Center
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <>
                      <Card className="mb-6">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Checkbox
                              id="mentorship"
                              checked={wantsMentorship}
                              onCheckedChange={(checked) =>
                                setWantsMentorship(checked as boolean)
                              }
                            />
                            <div className="flex-1">
                              <label
                                htmlFor="mentorship"
                                className="font-display font-semibold text-foreground cursor-pointer"
                              >
                                Add Mentorship Program
                              </label>
                              <p className="text-sm text-muted-foreground mt-1">
                                Get expert guidance and preparation tips from
                                high scorers. Includes study materials and
                                practice sessions.
                              </p>
                              <p className="text-secondary font-bold mt-2">
                                +{" "}
                                {(
                                  selectedExamData?.mentorshipValue ?? 0
                                ).toLocaleString()}{" "}
                                ETB
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-muted">
                        <CardContent className="p-6">
                          <h3 className="font-display font-semibold text-foreground mb-4">
                            Included Services:
                          </h3>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-foreground">
                              <CheckCircle className="w-4 h-4 text-secondary" />
                              Exam-based preparation
                            </li>
                            <li className="flex items-center gap-2 text-foreground">
                              <CheckCircle className="w-4 h-4 text-secondary" />
                              Professional Exam Environment
                            </li>
                            <li className="flex items-center gap-2 text-foreground">
                              <CheckCircle className="w-4 h-4 text-secondary" />
                              Technical Support
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              )}
              {step === 3 && !isOthersExam && (
                <div className="max-w-lg mx-auto">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
                    Confirm & Pay
                  </h2>
                  <Card className="mb-6">
                    <CardContent className="p-6">
                      <h3 className="font-display font-semibold text-foreground mb-4">
                        Order Summary
                      </h3>
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {selectedExamData?.name} Exam
                          </span>
                          <span className="text-foreground">
                            {selectedExamData?.basePrice != null
                              ? selectedExamData.basePrice.toLocaleString()
                              : selectedExamData?.sum != null
                                ? selectedExamData.sum.toLocaleString()
                                : "0"}{" "}
                            ETB{" "}
                          </span>
                        </div>
                        {wantsMentorship && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Mentorship Program
                            </span>
                            <span className="text-foreground">
                              {(
                                selectedExamData?.mentorshipValue ?? 0
                              ).toLocaleString()}{" "}
                              ETB
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Exam Room Service
                          </span>
                          <span className="text-foreground">Included</span>
                        </div>
                        <div className="border-t border-border pt-3 flex justify-between font-bold">
                          <span className="text-foreground">Total</span>
                          <span className="text-secondary text-xl">
                            {totalPrice != null
                              ? totalPrice.toLocaleString()
                              : "0"}{" "}
                            ETB{" "}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                        <CreditCard className="w-6 h-6 text-secondary" />
                        <div>
                          <p className="font-medium text-foreground">
                            Pay with Chapa
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Secure payment processing
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    Back
                  </Button>
                )}
                {!(step === 2 && isOthersExam) && (
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleProceed}
                    className={step === 1 ? "w-full" : "ml-auto"}
                  >
                    {step === 3 ? "Proceed to Payment" : "Continue"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
        <ConsultationBooking />
      </main>
      <Footer />
      <ChatBot />
      <TelegramButton />
    </div>
  );
};

export default Booking;
