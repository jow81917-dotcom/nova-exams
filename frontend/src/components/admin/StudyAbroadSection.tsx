import { useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  useStudyAbroadOpportunities,
  useAddStudyAbroadOpportunity,
  useUpdateStudyAbroadOpportunity,
  useDeleteStudyAbroadOpportunity,
  StudyAbroadOpportunity,
} from "@/hooks/useStudyAbroad";

const categoryOptions = [
  "Universities",
  "Self-funded",
  "Scholarships",
  "Grants",
  "Summits",
  "Work abroad",
  "Other programs",
];

const emptyForm = {
  title: "",
  country: "",
  flag: "🌍",
  category: "Scholarships",
  funding: "Fully Funded",
  fundingColor: "#D4A43A",
  degree: "",
  description: "",
  deadline: "",
  daysLeft: "",
  eligibility: "",
  featured: false,
  isPublished: true,
};

const StudyAbroadSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<StudyAbroadOpportunity | null>(null);
  const [form, setForm] = useState(emptyForm);

  const { data: opportunities = [], isLoading } = useStudyAbroadOpportunities();
  const addOpportunity = useAddStudyAbroadOpportunity();
  const updateOpportunity = useUpdateStudyAbroadOpportunity();
  const deleteOpportunity = useDeleteStudyAbroadOpportunity();

  const resetForm = () => {
    setForm(emptyForm);
    setEditingOpportunity(null);
  };

  const handleOpenNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.country.trim() || !form.description.trim()) {
      toast.error("Title, country, and description are required.");
      return;
    }

    const payload = {
      ...form,
      daysLeft: form.daysLeft === "" ? null : Number(form.daysLeft),
    };

    if (editingOpportunity) {
      updateOpportunity.mutate(
        { id: editingOpportunity.id, data: payload },
        {
          onSuccess: () => {
            toast.success("Opportunity updated successfully");
            setIsDialogOpen(false);
            resetForm();
          },
          onError: () => toast.error("Failed to update opportunity"),
        }
      );
      return;
    }

    addOpportunity.mutate(payload, {
      onSuccess: () => {
        toast.success("Opportunity added successfully");
        setIsDialogOpen(false);
        resetForm();
      },
      onError: () => toast.error("Failed to add opportunity"),
    });
  };

  const handleDelete = (id: string) => {
    deleteOpportunity.mutate(id, {
      onSuccess: () => toast.success("Opportunity deleted successfully"),
      onError: () => toast.error("Failed to delete opportunity"),
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-neutral-dark">Manage Study Abroad Hub</h2>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={handleOpenNew} className="gap-2">
              <Plus className="h-4 w-4" /> Add Opportunity
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingOpportunity ? "Edit opportunity" : "Add new opportunity"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Italian Government Scholarship 2027"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    placeholder="Italy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Flag</Label>
                  <Input
                    value={form.flag}
                    onChange={(e) => setForm({ ...form, flag: e.target.value })}
                    placeholder="🇮🇹"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Funding</Label>
                  <Input
                    value={form.funding}
                    onChange={(e) => setForm({ ...form, funding: e.target.value })}
                    placeholder="Fully Funded"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Funding Color</Label>
                  <Input
                    type="color"
                    value={form.fundingColor}
                    onChange={(e) => setForm({ ...form, fundingColor: e.target.value })}
                    className="h-10 p-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    value={form.degree}
                    onChange={(e) => setForm({ ...form, degree: e.target.value })}
                    placeholder="Bachelor's · Master's · PhD"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Days Left</Label>
                  <Input
                    type="number"
                    value={form.daysLeft}
                    onChange={(e) => setForm({ ...form, daysLeft: e.target.value })}
                    placeholder="270"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Deadline</Label>
                <Input
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  placeholder="May 15, 2027"
                />
              </div>

              <div className="space-y-2">
                <Label>Eligibility</Label>
                <Input
                  value={form.eligibility}
                  onChange={(e) => setForm({ ...form, eligibility: e.target.value })}
                  placeholder="Ethiopian applicants eligible"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Write a short description..."
                  rows={5}
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                  />
                  Published
                </label>
              </div>

              <Button onClick={handleSave} className="w-full" disabled={addOpportunity.isPending || updateOpportunity.isPending}>
                {addOpportunity.isPending || updateOpportunity.isPending ? "Saving..." : "Save Opportunity"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        {opportunities.length === 0 ? (
          <p className="text-muted-foreground text-center py-6">No study abroad opportunities yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Flag</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Funding</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunities.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.flag || "🌍"}</TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.country}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.funding}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingOpportunity(item);
                          setForm({
                            title: item.title || "",
                            country: item.country || "",
                            flag: item.flag || "🌍",
                            category: item.category || "Scholarships",
                            funding: item.funding || "Fully Funded",
                            fundingColor: item.fundingColor || "#D4A43A",
                            degree: item.degree || "",
                            description: item.description || "",
                            deadline: item.deadline || "",
                            daysLeft: item.daysLeft?.toString() || "",
                            eligibility: item.eligibility || "",
                            featured: Boolean(item.featured),
                            isPublished: item.isPublished !== false,
                          });
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                        disabled={deleteOpportunity.isPending}
                      >
                        {deleteOpportunity.isPending ? (
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

export default StudyAbroadSection;
