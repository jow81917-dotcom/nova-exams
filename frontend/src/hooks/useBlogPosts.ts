import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { BlogPost } from "@/types/admin";

export function useBlogPosts() {
  return useQuery<BlogPost[], Error>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await api.get("/blogs");
      return res.data.data;
    },
  });
}

export function useAddBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (blogData: Partial<BlogPost>) => {
      const res = await api.post("/blogs", blogData);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useUpdateBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      blogData,
    }: {
      id: string;
      blogData: Partial<BlogPost>;
    }) => {
      const res = await api.patch(`/blogs/${id}`, blogData);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/blogs/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}
