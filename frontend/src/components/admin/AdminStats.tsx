import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, MessageSquare, FileText, Book, Users } from "lucide-react";

interface AdminStatsProps {
  examsCount: number;
  testimonialsCount: number;
  blogPostsCount: number;
  resourcesCount: number;
  teamCount: number;
}

const AdminStats = ({
  examsCount,
  testimonialsCount,
  blogPostsCount,
  resourcesCount,
  teamCount,
}: AdminStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Exams
          </CardTitle>
          <DollarSign className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{examsCount}</div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-purple-100 to-purple-50 border-purple-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Testimonials
          </CardTitle>
          <MessageSquare className="h-5 w-5 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">
            {testimonialsCount}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-pink-100 to-pink-50 border-pink-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Blog Posts
          </CardTitle>
          <FileText className="h-5 w-5 text-pink-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">
            {blogPostsCount}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-indigo-100 to-indigo-50 border-indigo-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Resources
          </CardTitle>
          <Book className="h-5 w-5 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">
            {resourcesCount}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-100 to-green-50 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Team Members
          </CardTitle>
          <Users className="h-5 w-5 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{teamCount}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
