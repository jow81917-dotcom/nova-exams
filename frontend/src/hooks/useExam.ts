import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useExams() {
  return useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const res = await api.get("/exams");
      return res.data.data;
    },
  });
}

export function useAddExam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (exam: {
      examType: string;
      mentorship: string;
      mentorshipValue: number;
      examRoomService: number;
      sum: number;
    }) => {
      const res = await api.post("/exams", exam);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}

export function useUpdateExam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (exam: {
      id: string;
      examType: string;
      mentorship: string;
      mentorshipValue: number;
      examRoomService: number;
      sum: number;
    }) => {
      const res = await api.patch(`/exams/${exam.id}`, exam);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}

export function useDeleteExam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/exams/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}
