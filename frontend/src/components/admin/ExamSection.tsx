import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2, CirclePlus } from "lucide-react";
import { toast } from "sonner";
import { Exam } from "@/types/admin";
import {
  useAddExam,
  useUpdateExam,
  useDeleteExam,
  useExams,
} from "@/hooks/useExam";

type MentorshipRow = {
  id: string;
  type: string;
  value: string;
};

const createMentorshipRow = (): MentorshipRow => ({
  id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  type: "",
  value: "",
});

const toMentorshipOptions = (rows: MentorshipRow[]) =>
  rows
    .filter((row) => row.type.trim() || row.value.trim())
    .map((row) => ({
      type: row.type.trim() || "Mentorship",
      value: Number(row.value) || 0,
    }));

const ExamsSection = () => {
  const [isExamDialogOpen, setIsExamDialogOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [mentorshipRows, setMentorshipRows] = useState<MentorshipRow[]>([
    createMentorshipRow(),
  ]);

  const { data: exams = [], isLoading, error } = useExams();

  const addExam = useAddExam();
  const updateExam = useUpdateExam();
  const deleteExam = useDeleteExam();

  const calculateSum = useMemo(() => {
    const examPrice = Number(
      mentorshipRows[0]?.value && mentorshipRows[0]?.type ? 0 : 0
    );
    return examPrice;
  }, [mentorshipRows]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
      </div>
    );
  }

  const openCreateDialog = () => {
    setEditingExam(null);
    setMentorshipRows([createMentorshipRow()]);
    setIsExamDialogOpen(true);
  };

  const openEditDialog = (exam: Exam) => {
    const rows = exam.mentorshipOptions?.length
      ? exam.mentorshipOptions.map((option) => ({
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          type: option.type || "",
          value: String(option.value || 0),
        }))
      : [
          {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            type: exam.mentorship || "",
            value: String(exam.mentorshipValue || 0),
          },
        ];

    setEditingExam(exam);
    setMentorshipRows(rows.length ? rows : [createMentorshipRow()]);
    setIsExamDialogOpen(true);
  };

  const addMentorshipRow = () => {
    setMentorshipRows((prev) => [...prev, createMentorshipRow()]);
  };

  const updateMentorshipRow = (
    rowId: string,
    field: "type" | "value",
    value: string
  ) => {
    setMentorshipRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, [field]: value } : row))
    );
  };

  const removeMentorshipRow = (rowId: string) => {
    setMentorshipRows((prev) => {
      if (prev.length === 1) {
        return [createMentorshipRow()];
      }
      return prev.filter((row) => row.id !== rowId);
    });
  };

  const handleSaveExam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const examPrice = Number(formData.get("examPrice")) || 0;
    const examRoomService = Number(formData.get("examRoomService")) || 0;
    const options = toMentorshipOptions(mentorshipRows);

    if (!examPrice && !examRoomService && options.length === 0) {
      toast.error("Please add exam pricing details");
      return;
    }

    const defaultMentorship = options[0] || { type: "Mentorship", value: 0 };
    const payload = {
      examType: formData.get("examType") as Exam["examType"],
      mentorship: defaultMentorship.type,
      mentorshipValue: defaultMentorship.value,
      mentorshipOptions: options,
      examPrice,
      examRoomService,
      sum: examPrice + examRoomService + defaultMentorship.value,
      bankName: String(formData.get("bankName") || "").trim() || null,
      accountName: String(formData.get("accountName") || "").trim() || null,
      accountNumber: String(formData.get("accountNumber") || "").trim() || null,
    };

    try {
      if (editingExam) {
        await updateExam.mutateAsync({ id: editingExam.id, ...payload });
        toast.success("Exam updated successfully");
      } else {
        await addExam.mutateAsync(payload);
        toast.success("Exam added successfully");
      }
      setEditingExam(null);
      setMentorshipRows([createMentorshipRow()]);
      setIsExamDialogOpen(false);
    } catch {
      toast.error("Error saving exam");
    }
  };

  const handleDeleteExam = async (id: string) => {
    try {
      await deleteExam.mutateAsync(id);
      toast.success("Exam deleted");
    } catch {
      toast.error("Error deleting exam");
    }
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-neutral-dark">
            Manage Exam Prices
          </h2>
          <Dialog open={isExamDialogOpen} onOpenChange={setIsExamDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog} className="gap-2">
                <Plus className="h-4 w-4" /> Add Exam
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingExam ? "Edit Exam" : "Add New Exam"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSaveExam} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="examType">Exam Type</Label>
                  <Input
                    id="examType"
                    name="examType"
                    defaultValue={editingExam?.examType}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Mentorship Types</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addMentorshipRow}
                      className="gap-2"
                    >
                      <CirclePlus className="h-4 w-4" /> Add Mentorship
                    </Button>
                  </div>

                  {mentorshipRows.map((row, index) => (
                    <div key={row.id} className="grid grid-cols-1 md:grid-cols-[1fr_180px_40px] gap-3 items-end">
                      <div className="space-y-2">
                        <Label htmlFor={`mentorship-type-${row.id}`}>
                          Mentorship Type {index + 1}
                        </Label>
                        <Input
                          id={`mentorship-type-${row.id}`}
                          value={row.type}
                          onChange={(event) =>
                            updateMentorshipRow(row.id, "type", event.target.value)
                          }
                          placeholder="Online or In Person"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`mentorship-value-${row.id}`}>
                          Value (ETB)
                        </Label>
                        <Input
                          id={`mentorship-value-${row.id}`}
                          type="number"
                          value={row.value}
                          onChange={(event) =>
                            updateMentorshipRow(row.id, "value", event.target.value)
                          }
                          placeholder="0"
                        />
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMentorshipRow(row.id)}
                        className="mb-1"
                        aria-label="Remove mentorship option"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="examPrice">Exam Price (ETB)</Label>
                    <Input
                      id="examPrice"
                      name="examPrice"
                      type="number"
                      defaultValue={editingExam?.examPrice ?? editingExam?.sum ?? 0}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="examRoomService">
                      Exam Room Service (ETB)
                    </Label>
                    <Input
                      id="examRoomService"
                      name="examRoomService"
                      type="number"
                      defaultValue={editingExam?.examRoomService ?? 0}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-md border bg-muted/40 p-3 text-sm">
                    <div className="font-medium text-neutral-dark">Estimated Total</div>
                    <div className="text-lg font-semibold text-secondary">
                      {(
                        (Number(
                          (
                            document.getElementById("examPrice") as HTMLInputElement
                          )?.value || 0
                        ) || 0) +
                        (Number(
                          (
                            document.getElementById("examRoomService") as HTMLInputElement
                          )?.value || 0
                        ) || 0) +
                        (Number(
                          mentorshipRows.find((row) => row.type.trim())?.value || 0
                        ) || 0)
                      ).toLocaleString()} ETB
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      name="bankName"
                      defaultValue={editingExam?.bankName ?? ""}
                      placeholder="Commercial Bank of Ethiopia"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input
                      id="accountName"
                      name="accountName"
                      defaultValue={editingExam?.accountName ?? ""}
                      placeholder="Nova Exams"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      name="accountNumber"
                      defaultValue={editingExam?.accountNumber ?? ""}
                      placeholder="1000000000000"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={addExam.isPending || updateExam.isPending}
                >
                  {addExam.isPending || updateExam.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Save Exam"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <p className="text-center py-6">Loading exams...</p>
          ) : error ? (
            <p className="text-red-500 text-center py-6">Failed to load exams</p>
          ) : exams.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              No exams yet. Click “Add Exam” to create one.
            </p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Exam Type</th>
                  <th className="text-left py-3 px-4">Mentorship Options</th>
                  <th className="text-left py-3 px-4">Exam Price</th>
                  <th className="text-left py-3 px-4">Exam Room Service</th>
                  <th className="text-left py-3 px-4">Total</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr key={exam.id} className="border-b hover:bg-muted/5">
                    <td className="py-4 px-4">{exam.examType}</td>
                    <td className="py-4 px-4">
                      {exam.mentorshipOptions?.length
                        ? exam.mentorshipOptions
                            .map(
                              (option) => `${option.type} (${option.value.toLocaleString()} ETB)`
                            )
                            .join(", ")
                        : exam.mentorship
                          ? `${exam.mentorship} (${(exam.mentorshipValue ?? 0).toLocaleString()} ETB)`
                          : "—"}
                    </td>
                    <td className="py-4 px-4">
                      {(exam.examPrice ?? exam.sum ?? 0).toLocaleString()} ETB
                    </td>
                    <td className="py-4 px-4">
                      {(exam.examRoomService ?? 0).toLocaleString()} ETB
                    </td>
                    <td className="py-4 px-4">
                      {(exam.sum ?? 0).toLocaleString()} ETB
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => openEditDialog(exam)}
                          className="h-10 w-10 mr-2"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteExam(exam.id)}
                          className="h-10 w-10"
                          disabled={deleteExam.isPending}
                        >
                          {deleteExam.isPending ? (
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamsSection;
