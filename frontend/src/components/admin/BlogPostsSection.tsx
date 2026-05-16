import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Loader2, Upload, ImageIcon, X } from "lucide-react";
import { toast } from "sonner";
import { BlogPost } from "@/types/admin";
import {
  useBlogPosts,
  useAddBlogPost,
  useUpdateBlogPost,
  useDeleteBlogPost,
} from "@/hooks/useBlogPosts";

const BlogPostsSection = () => {
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [imagePosition, setImagePosition] = useState<"top" | "middle" | "bottom">("top");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: blogPosts = [], isLoading, error } = useBlogPosts();
  const addBlogPost = useAddBlogPost();
  const updateBlogPost = useUpdateBlogPost();
  const deleteBlogPost = useDeleteBlogPost();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
      </div>
    );
  }

  const handleOpen = (post: BlogPost | null) => {
    setEditingBlog(post);
    setImagePosition((post?.imagePosition as "top" | "middle" | "bottom") || "top");
    setImagePreview(post?.imageUrl || null);
    setIsBlogDialogOpen(true);
  };

  const handleClose = () => {
    setIsBlogDialogOpen(false);
    setEditingBlog(null);
    setImagePosition("top");
    setImagePreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSaveBlog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("imagePosition", imagePosition);

    // Remove empty image field so multer doesn't get confused
    const fileInput = fileInputRef.current;
    const hasNewFile = fileInput?.files && fileInput.files.length > 0;
    if (!hasNewFile) {
      formData.delete("image");
      // preserve existing imageUrl when editing
      if (editingBlog?.imageUrl) {
        formData.set("imageUrl", editingBlog.imageUrl);
      }
    }

    // Ensure date is valid ISO string
    const rawDate = formData.get("date") as string;
    if (rawDate) {
      formData.set("date", new Date(rawDate).toISOString());
    }

    if (editingBlog) {
      updateBlogPost.mutate(
        { id: editingBlog.id, blogData: formData as any },
        {
          onSuccess: () => { toast.success("Blog post updated!"); handleClose(); },
          onError: () => toast.error("Failed to update blog post"),
        }
      );
    } else {
      addBlogPost.mutate(formData as any, {
        onSuccess: () => { toast.success("Blog post added!"); handleClose(); },
        onError: () => toast.error("Failed to add blog post"),
      });
    }
  };

  const handleDeleteBlog = (id: string) => {
    deleteBlogPost.mutate(id, {
      onSuccess: () => toast.success("Blog post deleted!"),
      onError: () => toast.error("Failed to delete blog post"),
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold">Manage Blog Posts</h2>
        <Dialog open={isBlogDialogOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpen(null)} className="gap-2">
              <Plus className="h-4 w-4" /> Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingBlog ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={editingBlog?.title} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" defaultValue={editingBlog?.category} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" name="author" defaultValue={editingBlog?.author} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date" name="date" type="date"
                  defaultValue={editingBlog ? new Date(editingBlog.date).toISOString().split("T")[0] : ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="readTime">Read Time</Label>
                <Input id="readTime" name="readTime" defaultValue={editingBlog?.readTime || ""} placeholder="e.g. 6 min read" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Content</Label>
                <Textarea id="excerpt" name="excerpt" defaultValue={editingBlog?.excerpt || ""} rows={6} required />
              </div>

              {/* Image upload section */}
              <div className="space-y-3 border border-border rounded-xl p-4 bg-muted/30">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-sm">Article Image (optional)</span>
                </div>

                {/* Preview */}
                {imagePreview && (
                  <div className="relative w-full">
                    <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg border border-border" />
                    <button
                      type="button"
                      onClick={() => { setImagePreview(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                      className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* File picker */}
                <div
                  className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl py-6 cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-6 h-6 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {imagePreview ? "Replace image" : "Click to upload image"}
                  </span>
                  <span className="text-xs text-muted-foreground/60">PNG, JPG, WEBP supported</span>
                </div>
                <input
                  ref={fileInputRef}
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* Position */}
                <div className="space-y-1.5">
                  <Label>Image Position</Label>
                  <Select value={imagePosition} onValueChange={(v) => setImagePosition(v as "top" | "middle" | "bottom")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top — above the content</SelectItem>
                      <SelectItem value="middle">Middle — between paragraphs</SelectItem>
                      <SelectItem value="bottom">Bottom — after the content</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={addBlogPost.isPending || updateBlogPost.isPending}>
                {addBlogPost.isPending || updateBlogPost.isPending ? "Saving..." : "Save Post"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        {error ? (
          <p className="text-red-500 text-center py-6">Failed to load blog posts</p>
        ) : blogPosts.length === 0 ? (
          <p className="text-muted-foreground text-center py-6">No posts yet. Click "Add Post" to create one.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt={post.title} className="w-12 h-12 object-cover rounded-lg border border-border" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap max-w-[160px] truncate">{post.title}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleOpen(post)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive" size="icon"
                        onClick={() => handleDeleteBlog(post.id)}
                        disabled={deleteBlogPost.isPending}
                      >
                        {deleteBlogPost.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogPostsSection;
