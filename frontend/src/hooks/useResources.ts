import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Resource } from "@/types/admin";

export function useResources() {
  return useQuery<Resource[], Error>({
    queryKey: ["resources"],
    queryFn: async () => {
      const res = await api.get("/resources");
      return res.data.data;
    },
  });
}

function buildResourcePayload(resourceData: Partial<Resource>) {
  const formData = new FormData();

  formData.append("type", resourceData.type!);
  formData.append("title", resourceData.title!);
  formData.append("description", resourceData.description!);

  if (resourceData.type === "pdf") {
    formData.append("pdfUploadMode", resourceData.pdfUploadMode!);
    if (resourceData.pdfUploadMode === "upload" && resourceData.pdfFile) {
      formData.append("pdfFile", resourceData.pdfFile);
    } else if (resourceData.sourceUrl) {
      formData.append("sourceUrl", resourceData.sourceUrl);
    }
  }

  if (resourceData.type === "video") {
    formData.append("videoType", resourceData.videoType!);
    if (resourceData.videoType === "upload" && resourceData.videoFile) {
      formData.append("videoFile", resourceData.videoFile);
    } else if (resourceData.sourceUrl) {
      formData.append("sourceUrl", resourceData.sourceUrl);
    }
  }

  return formData;
}

export function useAddResource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (resourceData: Partial<Resource>) => {
      const payload =
        resourceData.pdfFile || resourceData.videoFile
          ? buildResourcePayload(resourceData)
          : resourceData;

      const res = await api.post("/resources", payload, {
        headers:
          payload instanceof FormData
            ? { "Content-Type": "multipart/form-data" }
            : {},
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });
}

export function useUpdateResource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      resourceData,
    }: {
      id: string;
      resourceData: Partial<Resource>;
    }) => {
      const payload =
        resourceData.pdfFile || resourceData.videoFile
          ? buildResourcePayload(resourceData)
          : resourceData;

      const res = await api.patch(`/resources/${id}`, payload, {
        headers:
          payload instanceof FormData
            ? { "Content-Type": "multipart/form-data" }
            : {},
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });
}

export function useDeleteResource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/resources/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });
}
