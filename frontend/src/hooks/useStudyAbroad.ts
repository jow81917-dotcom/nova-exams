import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface StudyAbroadOpportunity {
  id: string;
  title: string;
  country: string;
  flag: string;
  category: string;
  funding: string;
  fundingColor?: string;
  degree?: string;
  description: string;
  deadline?: string;
  daysLeft?: number | null;
  eligibility?: string;
  featured?: boolean;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export function useStudyAbroadOpportunities() {
  return useQuery<StudyAbroadOpportunity[], Error>({
    queryKey: ["study-abroad-opportunities"],
    queryFn: async () => {
      const res = await api.get("/study-abroad");
      return res.data?.data ?? [];
    },
  });
}

export function useAddStudyAbroadOpportunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<StudyAbroadOpportunity>) => {
      const res = await api.post("/study-abroad", payload);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-abroad-opportunities"] });
    },
  });
}

export function useUpdateStudyAbroadOpportunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<StudyAbroadOpportunity> }) => {
      const res = await api.patch(`/study-abroad/${id}`, data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-abroad-opportunities"] });
    },
  });
}

export function useDeleteStudyAbroadOpportunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/study-abroad/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-abroad-opportunities"] });
    },
  });
}
