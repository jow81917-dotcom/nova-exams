import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload } from "lucide-react";
import { useCreateBookingSubmission } from "@/hooks/useBookingSubmissions";
import { toast } from "sonner";

interface BookingSubmissionFormProps {
  examName: string;
  mentorshipType?: string;
  totalAmount: number;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export function BookingSubmissionForm({
  examName,
  mentorshipType,
  totalAmount,
  onCancel,
  onSuccess,
}: BookingSubmissionFormProps) {
  const createSubmission = useCreateBookingSubmission();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
  });
  const [receipt, setReceipt] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName.trim() || !form.phone.trim()) {
      toast.error("Please fill in your full name and phone number.");
      return;
    }

    if (!receipt) {
      toast.error("Please upload the payment receipt.");
      return;
    }

    const payload = new FormData();
    payload.append("fullName", form.fullName.trim());
    payload.append("phone", form.phone.trim());
    payload.append("examType", examName);
    payload.append("mentorshipType", mentorshipType || "");
    payload.append("totalAmount", String(totalAmount));
    payload.append("receipt", receipt);

    try {
      await createSubmission.mutateAsync(payload);
      toast.success("Submission sent for approval.");
      onSuccess?.();
    } catch {
      toast.error("Failed to send booking for approval.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Submit Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="e.g. +251912345678"
            />
          </div>

          <div className="space-y-2">
            <Label>Selected Exam</Label>
            <Input value={examName} readOnly />
          </div>

          {mentorshipType && (
            <div className="space-y-2">
              <Label>Mentorship Type</Label>
              <Input value={mentorshipType} readOnly />
            </div>
          )}

          <div className="space-y-2">
            <Label>Total Amount</Label>
            <Input value={`${totalAmount.toLocaleString()} ETB`} readOnly />
          </div>

          <div className="space-y-2">
            <Label htmlFor="receipt">Payment Receipt</Label>
            <Input
              id="receipt"
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setReceipt(e.target.files?.[0] ?? null)}
            />
            <p className="text-xs text-muted-foreground">Upload an image or PDF of the payment receipt.</p>
          </div>

          <div className="flex gap-3 pt-2">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Back
              </Button>
            )}
            <Button type="submit" className="flex-1" disabled={createSubmission.isPending}>
              {createSubmission.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Send to Approval
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
