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
import { Plus, Pencil, Trash2, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  useTeamMembers,
  useAddTeamMember,
  useUpdateTeamMember,
  useDeleteTeamMember,
} from "@/hooks/useTeam";
import { TeamMember } from "@/types/admin";

const TeamSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const { data: team = [], isLoading, error } = useTeamMembers();
  const addMember = useAddTeamMember();
  const updateMember = useUpdateTeamMember();
  const deleteMember = useDeleteTeamMember();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
      </div>
    );
  }

  const handleSaveMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (editingMember) {
      updateMember.mutate(
        { id: editingMember.id, formData },
        {
          onSuccess: () => {
            toast.success("Team member updated successfully!");
            setIsDialogOpen(false);
            setEditingMember(null);
          },
          onError: () => toast.error("Failed to update team member"),
        }
      );
    } else {
      addMember.mutate(formData, {
        onSuccess: () => {
          toast.success("Team member added successfully!");
          setIsDialogOpen(false);
        },
        onError: () => toast.error("Failed to add team member"),
      });
    }
  };

  const handleDeleteMember = (id: number) => {
    deleteMember.mutate(id, {
      onSuccess: () => toast.success("Team member deleted successfully!"),
      onError: () => toast.error("Failed to delete team member"),
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-neutral-dark">Manage Team</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingMember(null);
              }}
              className="gap-2"
            >
              <Plus className="h-4 w-4" /> Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>
                {editingMember ? "Edit Team Member" : "Add New Team Member"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveMember} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingMember?.name}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  defaultValue={editingMember?.role}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  defaultValue={editingMember?.bio}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image" className="flex items-center gap-2">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  Upload Image
                </Label>
                <Input id="image" name="image" type="file" accept="image/*" />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={addMember.isPending || updateMember.isPending}
              >
                {addMember.isPending || updateMember.isPending
                  ? "Saving..."
                  : "Save Team Member"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground text-center">
            Loading team members...
          </p>
        ) : error ? (
          <p className="text-red-500 text-center py-6">
            Failed to load team members
          </p>
        ) : team.length === 0 ? (
          <p className="text-muted-foreground text-center py-6">
            No team members yet. Click “Add Team Member” to create one.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Bio</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="w-12 h-12 flex-shrink-0">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full aspect-square rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          No image
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {member.name}
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {member.bio}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingMember(member);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteMember(member.id)}
                        disabled={deleteMember.isPending}
                      >
                        {deleteMember.isPending ? (
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

export default TeamSection;
