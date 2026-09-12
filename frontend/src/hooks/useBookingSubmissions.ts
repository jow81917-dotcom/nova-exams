import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { BookingSubmission } from "@/types/bookingSubmission";

export function useBookingSubmissions() {
  return useQuery({
    queryKey: ["booking-submissions"],
    queryFn: async () => {
      const res = await api.get("/booking-submissions");
      return res.data?.data ?? [];
    },
  });
}

export function useCreateBookingSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.post("/booking-submissions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking-submissions"] });
    },
  });
}

export function useUpdateBookingSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status, notes }: { id: string; status?: string; notes?: string }) => {
      const res = await api.patch(`/booking-submissions/${id}`, { status, notes });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking-submissions"] });
    },
  });
}

export function useDeleteBookingSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/booking-submissions/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking-submissions"] });
    },
  });
}
