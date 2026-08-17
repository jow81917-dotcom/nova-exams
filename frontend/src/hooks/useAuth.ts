import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await api.get("/admin/session");
      return res.data?.user ?? null;
    },
    retry: false, // don't spam retries if not logged in
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await api.post("/admin/login", {
        email: data.email.trim().toLowerCase(),
        password: data.password,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.user) {
        queryClient.setQueryData(["session"], {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          isAdmin: true,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return async () => {
    try {
      await api.post("/admin/logout");
    } catch (e) {}
    queryClient.setQueryData(["session"], null);
    queryClient.invalidateQueries({ queryKey: ["session"] });
  };
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name?: string;
      email?: string;
      oldPassword?: string;
      newPassword?: string;
    }) => {
      const res = await api.patch("/admin/update-profile", data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["session"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          name: data?.data?.name ?? old.name,
          email: data?.data?.email ?? old.email,
        };
      });
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
}
