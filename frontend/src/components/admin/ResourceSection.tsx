import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Upload,
  Pencil,
  Trash2,
  FileText,
  Video,
  Loader2,
} from "lucide-react";
import {
  useResources,
  useAddResource,
  useUpdateResource,
  useDeleteResource,
} from "@/hooks/useResources";
import { Resource } from "@/types/admin";
import { toast } from "sonner";

const ResourcesPage = () => {
  const { data: resources = [], isLoading } = useResources();
  const addResource = useAddResource();
  const updateResource = useUpdateResource();
  const deleteResource = useDeleteResource();

  const [resourceDialogOpen, setResourceDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  const [resourceForm, setResourceForm] = useState<{
    type: "pdf" | "video";
    title: string;
    description: string;
    sourceUrl: string;
    videoType: "youtube" | "social" | "upload";
    videoFile: File | null;
    pdfFile: File | null;
    pdfUploadMode: "url" | "upload";
  }>({
    type: "pdf",
    title: "",
    description: "",
    sourceUrl: "",
    videoType: "youtube",
    videoFile: null,
    pdfFile: null,
    pdfUploadMode: "url",
  });

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResourceForm({ ...resourceForm, pdfFile: file });
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResourceForm({ ...resourceForm, videoFile: file });
  };

  const handleSaveResource = () => {
    if (!resourceForm.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    // Determine sourceType based on upload mode
    let sourceType: "upload" | "url" = "url";
    if (
      resourceForm.type === "pdf" &&
      resourceForm.pdfUploadMode === "upload"
    ) {
      sourceType = "upload";
    } else if (
      resourceForm.type === "video" &&
      resourceForm.videoType === "upload"
    ) {
      sourceType = "upload";
    }

    const payload: Partial<Resource> = {
      type: resourceForm.type,
      title: resourceForm.title,
      description: resourceForm.description,
      sourceUrl: resourceForm.sourceUrl,
      sourceType: sourceType,
      videoType: resourceForm.type === "video" ? resourceForm.videoType : null,
      pdfUploadMode:
        resourceForm.type === "pdf" ? resourceForm.pdfUploadMode : null,
      pdfFile: resourceForm.pdfFile ?? undefined,
      videoFile: resourceForm.videoFile ?? undefined,
    };

    if (editingResource) {
      updateResource.mutate(
        { id: editingResource.id, resourceData: payload },
        {
          onSuccess: () => {
            setResourceDialogOpen(false);
            toast.success("Resource updated successfully");
            resetForm();
          },
          onError: () => toast.error("Failed to update resource"),
        }
      );
    } else {
      addResource.mutate(payload, {
        onSuccess: () => {
          setResourceDialogOpen(false);
          toast.success("Resource added successfully");
          resetForm();
        },
        onError: () => toast.error("Failed to add resource"),
      });
    }
  };

  const handleDeleteResource = (id: string) => {
    deleteResource.mutate(id, {
      onSuccess: () => toast.success("Resource deleted"),
      onError: () => toast.error("Failed to delete resource"),
    });
  };

  const resetForm = () => {
    setEditingResource(null);
    setResourceForm({
      type: "pdf",
      title: "",
      description: "",
      sourceUrl: "",
      videoType: "youtube",
      videoFile: null,
      pdfFile: null,
      pdfUploadMode: "url",
    });
  };

  const pdfResources = resources.filter((r) => r.type === "pdf");
  const videoResources = resources.filter((r) => r.type === "video");

  const isSaving = addResource.isPending || updateResource.isPending;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <div className=" bg-background">
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-neutral-dark">
              {" "}
              Manage Resources
            </h2>
            <Dialog
              open={resourceDialogOpen}
              onOpenChange={(open) => {
                setResourceDialogOpen(open);
                if (!open) resetForm();
              }}
            >
              <DialogTrigger asChild>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={resetForm}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">
                    {editingResource ? "Edit Resource" : "Add New Resource"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  {/* Resource Type */}
                  <div>
                    <Label className="text-foreground">Resource Type</Label>
                    <Select
                      value={resourceForm.type}
                      onValueChange={(value: "pdf" | "video") =>
                        setResourceForm({ ...resourceForm, type: value })
                      }
                    >
                      <SelectTrigger className="bg-background border-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Title */}
                  <div>
                    <Label className="text-foreground">Title</Label>
                    <Input
                      value={resourceForm.title}
                      onChange={(e) =>
                        setResourceForm({
                          ...resourceForm,
                          title: e.target.value,
                        })
                      }
                      placeholder="Resource title"
                      className="bg-background border-input"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <Label className="text-foreground">Description</Label>
                    <Input
                      value={resourceForm.description}
                      onChange={(e) =>
                        setResourceForm({
                          ...resourceForm,
                          description: e.target.value,
                        })
                      }
                      placeholder="Brief description"
                      className="bg-background border-input"
                    />
                  </div>

                  {/* PDF Source Selector */}
                  {resourceForm.type === "pdf" && (
                    <div>
                      <Label className="text-foreground">PDF Source</Label>
                      <Select
                        value={resourceForm.pdfUploadMode}
                        onValueChange={(value: "url" | "upload") =>
                          setResourceForm({
                            ...resourceForm,
                            pdfUploadMode: value,
                          })
                        }
                      >
                        <SelectTrigger className="bg-background border-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="url">URL Link</SelectItem>
                          <SelectItem value="upload">Upload File</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* PDF Conditional Upload or URL */}
                  {resourceForm.type === "pdf" &&
                  resourceForm.pdfUploadMode === "upload" ? (
                    <div>
                      <Label className="text-foreground">Upload PDF File</Label>
                      <div className="mt-2">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                            {resourceForm.pdfFile ? (
                              <p className="text-sm text-primary font-medium">
                                {resourceForm.pdfFile.name}
                              </p>
                            ) : (
                              <>
                                <p className="mb-1 text-sm text-muted-foreground">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  PDF files only (MAX. 50MB)
                                </p>
                              </>
                            )}
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,application/pdf"
                            onChange={handlePdfFileChange}
                          />
                        </label>
                      </div>
                    </div>
                  ) : resourceForm.type === "pdf" &&
                    resourceForm.pdfUploadMode === "url" ? (
                    <div>
                      <Label className="text-foreground">PDF URL</Label>
                      <Input
                        value={resourceForm.sourceUrl}
                        onChange={(e) =>
                          setResourceForm({
                            ...resourceForm,
                            sourceUrl: e.target.value,
                          })
                        }
                        placeholder="https://example.com/file.pdf"
                        className="bg-background border-input"
                      />
                    </div>
                  ) : null}

                  {/* Video Source Selector */}
                  {resourceForm.type === "video" && (
                    <div>
                      <Label className="text-foreground">Video Source</Label>
                      <Select
                        value={resourceForm.videoType}
                        onValueChange={(
                          value: "youtube" | "social" | "upload"
                        ) =>
                          setResourceForm({ ...resourceForm, videoType: value })
                        }
                      >
                        <SelectTrigger className="bg-background border-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="youtube">YouTube Link</SelectItem>
                          <SelectItem value="social">
                            Social Media Link
                          </SelectItem>
                          <SelectItem value="upload">Upload File</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Video Conditional Upload or URL */}
                  {resourceForm.type === "video" &&
                  resourceForm.videoType === "upload" ? (
                    <div>
                      <Label className="text-foreground">
                        Upload Video File
                      </Label>
                      <div className="mt-2">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                            {resourceForm.videoFile ? (
                              <p className="text-sm text-primary font-medium">
                                {resourceForm.videoFile.name}
                              </p>
                            ) : (
                              <>
                                <p className="mb-1 text-sm text-muted-foreground">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  MP4, WebM, MOV (MAX. 100MB)
                                </p>
                              </>
                            )}
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="video/*"
                            onChange={handleVideoFileChange}
                          />
                        </label>
                      </div>
                    </div>
                  ) : resourceForm.type === "video" ? (
                    <div>
                      <Label className="text-foreground">Video URL</Label>
                      <Input
                        value={resourceForm.sourceUrl}
                        onChange={(e) =>
                          setResourceForm({
                            ...resourceForm,
                            sourceUrl: e.target.value,
                          })
                        }
                        placeholder="https://youtube.com/watch?v=..."
                        className="bg-background border-input"
                      />
                    </div>
                  ) : null}

                  {/* Save Button */}
                  <Button
                    onClick={handleSaveResource}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isSaving}
                  >
                    {isSaving && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    {editingResource ? "Update Resource" : "Add Resource"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Tables */}
          <div className="space-y-8">
            {/* PDF Table */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-foreground">
                <FileText className="w-5 h-5 text-primary" /> PDF Documents (
                {pdfResources.length})
              </h3>
              {pdfResources.length === 0 ? (
                <p className="text-muted-foreground text-sm py-4">
                  No PDF documents yet. Add your first one!
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Title
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Description
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Source
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pdfResources.map((r) => (
                        <tr
                          key={r.id}
                          className="border-b border-border hover:bg-muted/50 transition-colors"
                        >
                          <td className="py-3 px-4 text-foreground font-medium">
                            {r.title}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {r.description || "-"}
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                              {r.sourceType === "upload" ? "Uploaded" : "URL"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => {
                                  setEditingResource(r);
                                  setResourceForm({
                                    type: r.type,
                                    title: r.title,
                                    description: r.description,
                                    sourceUrl: r.sourceUrl,
                                    videoType: r.videoType || "youtube",
                                    videoFile: null,
                                    pdfFile: null,
                                    pdfUploadMode: r.pdfUploadMode || "url",
                                  });
                                  setResourceDialogOpen(true);
                                }}
                                className="h-10 w-10"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDeleteResource(r.id)}
                                disabled={deleteResource.isPending}
                                className="h-10 w-10"
                              >
                                {deleteResource.isPending ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Video Table */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-foreground">
                <Video className="w-5 h-5 text-primary" /> Videos (
                {videoResources.length})
              </h3>
              {videoResources.length === 0 ? (
                <p className="text-muted-foreground text-sm py-4">
                  No videos yet. Add your first one!
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Title
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Description
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Source
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {videoResources.map((r) => (
                        <tr
                          key={r.id}
                          className="border-b border-border hover:bg-muted/50 transition-colors"
                        >
                          <td className="py-3 px-4 text-foreground font-medium">
                            {r.title}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {r.description || "-"}
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground capitalize">
                              {r.videoType}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => {
                                  setEditingResource(r);
                                  setResourceForm({
                                    type: r.type,
                                    title: r.title,
                                    description: r.description,
                                    sourceUrl: r.sourceUrl,
                                    videoType: r.videoType || "youtube",
                                    videoFile: null,
                                    pdfFile: null,
                                    pdfUploadMode: "url",
                                  });
                                  setResourceDialogOpen(true);
                                }}
                                className="h-10 w-10"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="destructive"
                                onClick={() => handleDeleteResource(r.id)}
                                disabled={deleteResource.isPending}
                                className="h-10 w-10"
                              >
                                {deleteResource.isPending ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesPage;
