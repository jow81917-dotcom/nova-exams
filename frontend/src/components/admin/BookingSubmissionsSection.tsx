import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Download, Trash2, Check, X } from "lucide-react";
import { useBookingSubmissions, useDeleteBookingSubmission, useUpdateBookingSubmission } from "@/hooks/useBookingSubmissions";
import { BookingSubmission } from "@/types/bookingSubmission";
import { toast } from "sonner";

export function BookingSubmissionsSection() {
  const { data: submissions = [], isLoading } = useBookingSubmissions();
  const updateSubmission = useUpdateBookingSubmission();
  const deleteSubmission = useDeleteBookingSubmission();

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      await updateSubmission.mutateAsync({ id, status });
      toast.success(`Submission ${status}`);
    } catch {
      toast.error("Failed to update submission");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSubmission.mutateAsync(id);
      toast.success("Submission deleted");
    } catch {
      toast.error("Failed to delete submission");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
      </div>
    );
  }

  if (!submissions.length) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No booking submissions yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission: BookingSubmission) => (
        <Card key={submission.id}>
          <CardContent className="p-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-foreground">{submission.fullName}</p>
                <p className="text-sm text-muted-foreground">{submission.phone}</p>
                <p className="text-sm text-muted-foreground">{submission.examType}</p>
                {submission.mentorshipType && (
                  <p className="text-sm text-muted-foreground">Mentorship: {submission.mentorshipType}</p>
                )}
                {submission.totalAmount && (
                  <p className="text-sm text-muted-foreground">Total: {Number(submission.totalAmount).toLocaleString()} ETB</p>
                )}
                <p className="text-xs text-muted-foreground mt-2">Status: {submission.status}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                  <a href={submission.receiptUrl} target="_blank" rel="noreferrer">
                    <Download className="mr-2 h-4 w-4" /> Receipt
                  </a>
                </Button>
                <Button size="sm" onClick={() => updateStatus(submission.id, "approved")}>
                  <Check className="mr-2 h-4 w-4" /> Approve
                </Button>
                <Button variant="destructive" size="sm" onClick={() => updateStatus(submission.id, "rejected")}>
                  <X className="mr-2 h-4 w-4" /> Reject
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(submission.id)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
