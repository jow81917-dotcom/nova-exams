export interface Exam {
  id: string;
  examType: "Duolingo" | "TOEFL" | "Pearson" | "IELTS Home" | "Others";
  mentorship: string;        
  mentorshipValue: number;   
  examRoomService: number;
  sum: number;
}

export interface Testimonial {
  id: string;          
  student: string;
  exam: string;
  rating: number;       
  testimonial: string;
  image?: string;
  created_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;   
  author: string;    
  excerpt: string;   
  date: string;       
  readTime?: string;  
}

export interface Resource {
  id: string;
  type: "pdf" | "video";
  title: string;
  description: string;
  sourceUrl: string;            
  sourceType: "upload" | "url";  
  videoType?: "youtube" | "social" | "upload" | null;
  pdfUploadMode?: "url" | "upload" | null;
  videoFile?: File | null;
  pdfFile?: File | null;
  created_at?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image?: string | null;
  imageId?: string | null;   
  createdAt: string;
  updatedAt: string;
}





