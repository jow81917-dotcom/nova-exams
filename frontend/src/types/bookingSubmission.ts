export type BookingSubmissionStatus = "pending" | "approved" | "rejected";

export interface BookingSubmission {
  id: string;
  fullName: string;
  phone: string;
  examType: string;
  mentorshipType?: string | null;
  totalAmount?: number | null;
  receiptUrl: string;
  receiptPublicId?: string | null;
  status: BookingSubmissionStatus;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}
