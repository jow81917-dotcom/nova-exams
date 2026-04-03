import { Exam, Testimonial, BlogPost, Resource } from "@/types/admin";

export const initialExams: Exam[] = [
  {
    id: "1",
    examType: "Duolingo",
    mentorship: "2 days (in person)",
    examRoomService: 5000,
    sum: 8000,
  },
  {
    id: "2",
    examType: "TOEFL",
    mentorship: "1 Week",
    examRoomService: 8000,
    sum: 15000,
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "1",
    student: "John Doe",
    exam: "Duolingo",
    score: "130",
    testimonial: "Great experience with the mentorship program!",
    image: "",
  },
  {
    id: "2",
    student: "Jane Smith",
    exam: "TOEFL",
    score: "110",
    testimonial: "The exam room service was excellent.",
    image: "",
  },
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to Prepare for Duolingo",
    category: "Tips",
    excerpt: "Learn the best strategies for Duolingo exam preparation.",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "TOEFL vs IELTS: Which is Right for You?",
    category: "Comparison",
    excerpt: "A comprehensive comparison of the two popular English tests.",
    date: "2024-01-10",
  },
];

export const initialResources: Resource[] = [
  {
    id: "1",
    type: "pdf",
    title: "Duolingo Study Guide",
    description: "Complete guide for Duolingo preparation",
    url: "https://example.com/duolingo-guide.pdf",
  },
  {
    id: "2",
    type: "video",
    title: "TOEFL Speaking Tips",
    description: "Expert tips for the speaking section",
    url: "https://youtube.com/watch?v=example",
    videoType: "youtube",
  },
];
