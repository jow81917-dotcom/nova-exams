import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, User } from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { TelegramButton } from "@/components/TelegramButton";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { useBlogPosts } from "@/hooks/useBlogPosts";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Blog = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: posts = [], isLoading, error } = useBlogPosts();

  const categories = ["All", ...new Set(posts.map((post) => post.category))];

  const filteredPosts = posts.filter((post) => {
    const searchTerm = search.trim().toLowerCase();

    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm) ||
      post.excerpt?.toLowerCase().includes(searchTerm);

    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar bgColor="bg-gradient-secondary" />

      <main className="pt-20">
        <section className="py-16 bg-gradient-secondary">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-6"
            >
              Nova <span className="text-primary">Blog</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-secondary-foreground/90 text-lg max-w-2xl mx-auto"
            >
              Expert tips, study guides, and resources to help you succeed in
              your exams.
            </motion.p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col lg:flex-row gap-4 mb-10 items-center justify-center"
          >
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 py-6 rounded-xl"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    activeCategory === cat
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-card border"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {isLoading ? (
            <p className="text-center text-muted-foreground">
              Loading posts...
            </p>
          ) : error ? (
            <p className="text-center text-red-500">Failed to load posts</p>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-5 max-w-3xl mx-auto"
            >
              <AnimatePresence>
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    variants={cardVariants}
                    layout
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="rounded-2xl hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 space-y-3">
                        <div className="flex items-center gap-3">
                          <Badge>{post.category}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold">{post.title}</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                          {post.excerpt}
                        </p>

                        <div className="flex justify-between items-center pt-2">
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {filteredPosts.length === 0 && !isLoading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Search className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                No articles found. Try a different search term.
              </p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
      <ChatBot />
      <TelegramButton />
    </div>
  );
};

export default Blog;
