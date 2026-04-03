import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
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

  const handleSaveBlog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const blogData = {
      title: formData.get("title") as string,
      excerpt: formData.get("excerpt") as string,
      category: formData.get("category") as string,
      author: formData.get("author") as string,
      readTime: formData.get("readTime") as string,
      date: new Date(formData.get("date") as string).toISOString(),
    };

    if (editingBlog) {
      updateBlogPost.mutate(
        { id: editingBlog.id, blogData },
        {
          onSuccess: () => {
            toast.success("Blog post updated successfully!");
            setIsBlogDialogOpen(false);
            setEditingBlog(null);
          },
          onError: () => toast.error("Failed to update blog post"),
        }
      );
    } else {
      addBlogPost.mutate(blogData, {
        onSuccess: () => {
          toast.success("Blog post added successfully!");
          setIsBlogDialogOpen(false);
        },
        onError: () => toast.error("Failed to add blog post"),
      });
    }
  };

  const handleDeleteBlog = (id: string) => {
    deleteBlogPost.mutate(id, {
      onSuccess: () => toast.success("Blog post deleted successfully!"),
      onError: () => toast.error("Failed to delete blog post"),
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-dark">
          Manage Blog Posts
        </h2>
        <Dialog open={isBlogDialogOpen} onOpenChange={setIsBlogDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingBlog(null)} className="gap-2">
              <Plus className="h-4 w-4" /> Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBlog ? "Edit Blog Post" : "Add New Blog Post"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingBlog?.title}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  defaultValue={editingBlog?.category}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  defaultValue={editingBlog?.author}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={
                    editingBlog
                      ? new Date(editingBlog.date).toISOString().split("T")[0]
                      : ""
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="readTime">Read Time</Label>
                <Input
                  id="readTime"
                  name="readTime"
                  defaultValue={editingBlog?.readTime || ""}
                  placeholder="e.g. 6 min read"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  defaultValue={editingBlog?.excerpt || ""}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={addBlogPost.isPending || updateBlogPost.isPending}
              >
                {addBlogPost.isPending || updateBlogPost.isPending
                  ? "Saving..."
                  : "Save Post"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500 text-center py-6">
            Failed to load BlogPosts
          </p>
        ) : blogPosts.length === 0 ? (
          <p className="text-muted-foreground text-center py-6">
            No Blog yet. Click “Add Post” to create one.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Read Time</TableHead>
                <TableHead>Excerpt</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {post.title}
                  </TableCell>

                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    {new Date(post.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{post.readTime}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {post.excerpt}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingBlog(post);
                          setIsBlogDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteBlog(post.id)}
                        disabled={deleteBlogPost.isPending}
                      >
                        {deleteBlogPost.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
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
