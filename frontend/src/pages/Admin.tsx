import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminStats from "@/components/admin/AdminStats";
import ExamsSection from "../components/admin/ExamSection";
import TestimonialsSection from "../components/admin/TestimonialSection";
import BlogPostsSection from "../components/admin/BlogPostsSection";
import ResourcesSection from "../components/admin/ResourceSection";
import TeamSection from "../components/admin/TeamSection";

import { useExams } from "../hooks/useExam";
import { useTestimonials } from "@/hooks/useTestimonial";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useResources } from "@/hooks/useResources";
import { useTeamMembers } from "@/hooks/useTeam";

import { useLogout, useSession, useUpdateProfile } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Admin = () => {
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    data: exams = [],
    isLoading: isExamsLoading,
    error: examsError,
  } = useExams();
  const { data: testimonials = [] } = useTestimonials();
  const { data: blogPosts = [] } = useBlogPosts();
  const { data: resource = [] } = useResources();
  const { data: team = [] } = useTeamMembers();

  const logout = useLogout();
  const { data: user } = useSession();
  const updateProfile = useUpdateProfile();

  const handleLogoutClick = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      await logout();
      toast.success("Logged out");
      navigate("/login");
    }
  };

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        email: user.email || "",
        oldPassword: "",
        newPassword: "",
      });
    }
  }, [user]);

  const handleProfileUpdate = () => {
    updateProfile.mutate(profileForm, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
        setProfileForm({
          name: user?.name || "",
          email: user?.email || "",
          oldPassword: "",
          newPassword: "",
        });
      },
      onError: () => {
        toast.error("Failed to update profile");
      },
    });
  };

  const handleCancelUpdate = () => {
    setProfileForm({
      name: user?.name || "",
      email: user?.email || "",
      oldPassword: "",
      newPassword: "",
    });
  };
  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={handleLogoutClick}
          className="px-5 py-2 rounded-lg border border-red-700
                     bg-red-500 text-white font-medium
                     cursor-pointer transition-all duration-200
                     hover:bg-red-600 hover:shadow-lg
                     active:bg-red-700 active:scale-95
                     focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Logout
        </button>
      </div>
      <main>
        <div className="container mx-auto px-4 py-12 relative">
          <div className="absolute top-4 left-4">
            <Link
              to="/"
              className="flex items-center space-x-2 rounded-md px-3 py-2 bg-muted text-muted-foreground hover:bg-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </Link>
          </div>
          <div className="mb-8 mt-7">
            <h1 className="text-4xl font-display font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mb-5">
              Manage exams, testimonials, blog posts, resources and team members
            </p>
            {user ? (
              <p className="text-[20px] font-medium text-foreground">
                Welcome back👋, {user.name || user.email}!
              </p>
            ) : (
              <p className="text-lg font-medium text-foreground">
                Not logged in
              </p>
            )}
          </div>
          <AdminStats
            examsCount={exams.length}
            testimonialsCount={testimonials.length}
            blogPostsCount={blogPosts.length}
            resourcesCount={resource.length}
            teamCount={team.length}
          />
          <Tabs defaultValue="exams" className="space-y-6">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="exams">Exam Prices</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="blog">Blog Posts</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="team">Team Members</TabsTrigger>{" "}
            </TabsList>
            <TabsContent value="exams">
              {isExamsLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : examsError ? (
                <p className="text-red-500 text-center">Failed to load exams</p>
              ) : (
                <ExamsSection />
              )}
            </TabsContent>
            <TabsContent value="testimonials">
              <TestimonialsSection />
            </TabsContent>

            <TabsContent value="blog">
              <BlogPostsSection />
            </TabsContent>

            <TabsContent value="resources">
              <ResourcesSection />
            </TabsContent>

            <TabsContent value="team">
              <TeamSection />
            </TabsContent>
          </Tabs>
        </div>
        <div className="mb-10 p-6 border rounded-lg bg-card shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
          <div className="space-y-4">
            <Input
              placeholder="Name"
              value={profileForm.name}
              onChange={(e) =>
                setProfileForm({ ...profileForm, name: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              type="email"
              value={profileForm.email}
              onChange={(e) =>
                setProfileForm({ ...profileForm, email: e.target.value })
              }
            />
            <div className="relative">
              <Input
                placeholder="Old Password"
                type={showOldPassword ? "text" : "password"}
                value={profileForm.oldPassword}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    oldPassword: e.target.value,
                  })
                }
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showOldPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="relative">
              <Input
                placeholder="New Password"
                type={showNewPassword ? "text" : "password"}
                value={profileForm.newPassword}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    newPassword: e.target.value,
                  })
                }
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleProfileUpdate}
                disabled={updateProfile.isPending}
                className="bg-primary"
              >
                {updateProfile.isPending ? "Updating..." : "Update Profile"}
              </Button>
              <Button
                onClick={handleCancelUpdate}
                variant="outline"
                className="border-gray-400"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
