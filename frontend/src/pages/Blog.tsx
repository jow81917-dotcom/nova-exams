import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, User, X, ArrowRight, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { TelegramButton } from "@/components/TelegramButton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { BlogPost } from "@/types/admin";

const Blog = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const { data: posts = [], isLoading, error } = useBlogPosts();
  const categories = ["All", ...new Set(posts.map((p) => p.category))];

  const filteredPosts = posts.filter((post) => {
    const term = search.trim().toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(term) ||
      post.category?.toLowerCase().includes(term) ||
      post.excerpt?.toLowerCase().includes(term);
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featured = filteredPosts[0];
  const rest = filteredPosts.slice(1);

  const ArticleImage = ({ post }: { post: BlogPost }) =>
    post.imageUrl ? (
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full rounded-xl object-cover max-h-72 my-5 border border-primary/20"
      />
    ) : null;

  const ModalContent = ({ post }: { post: BlogPost }) => {
    const paragraphs = post.excerpt?.split("\n").filter(Boolean) ?? [];
    const mid = Math.floor(paragraphs.length / 2);
    return (
      <div className="space-y-4 text-foreground/80 leading-relaxed text-[15px]">
        {post.imagePosition === "top" && <ArticleImage post={post} />}
        {paragraphs
          .slice(0, post.imagePosition === "middle" ? mid : paragraphs.length)
          .map((p, i) => <p key={i}>{p}</p>)}
        {post.imagePosition === "middle" && <ArticleImage post={post} />}
        {post.imagePosition === "middle" &&
          paragraphs.slice(mid).map((p, i) => <p key={i}>{p}</p>)}
        {post.imagePosition === "bottom" && <ArticleImage post={post} />}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar bgColor="bg-gradient-secondary" />

      {/* Hero header */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-4"
          >
            Nova <span className="text-primary">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-secondary-foreground/80 text-lg max-w-xl mx-auto"
          >
            Expert tips, study guides, and resources to help you succeed.
          </motion.p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Search + filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10 items-center justify-between">
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 rounded-xl"
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading && <p className="text-center text-muted-foreground py-20">Loading posts...</p>}
        {error && <p className="text-center text-red-500 py-20">Failed to load posts.</p>}

        {!isLoading && !error && filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No articles found.</p>
          </div>
        )}

        {!isLoading && !error && filteredPosts.length > 0 && (
          <>
            {/* Featured post */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 group cursor-pointer"
                onClick={() => setSelectedPost(featured)}
              >
                <div className="relative rounded-2xl overflow-hidden border border-border bg-card hover:shadow-lg hover:border-primary/30 transition-all">
                  {featured.imageUrl && featured.imagePosition === "top" && (
                    <img src={featured.imageUrl} alt={featured.title} className="w-full h-64 object-cover" />
                  )}
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-primary text-primary-foreground">{featured.category}</Badge>
                      {featured.readTime && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />{featured.readTime}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{new Date(featured.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground line-clamp-3 mb-4">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <User className="w-3 h-3" />{featured.author}
                      </span>
                      <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read Article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {rest.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="group cursor-pointer rounded-2xl border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all hover:-translate-y-1"
                    onClick={() => setSelectedPost(post)}
                  >
                    {post.imageUrl && post.imagePosition === "top" && (
                      <img src={post.imageUrl} alt={post.title} className="w-full h-44 object-cover rounded-t-2xl" />
                    )}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs border-primary/40 text-primary">
                          {post.category}
                        </Badge>
                        {post.readTime && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />{post.readTime}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </main>

      {/* Holographic Modal */}
      <AnimatePresence>
        {selectedPost && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(10, 6, 30, 0.75)", backdropFilter: "blur(10px)" }}
              onClick={() => setSelectedPost(null)}
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 30 }}
              transition={{ type: "spring", damping: 24, stiffness: 280 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="relative w-full max-w-2xl max-h-[88vh] flex flex-col pointer-events-auto"
                style={{
                  background: "linear-gradient(145deg, hsl(248 65% 9%), hsl(248 55% 13%))",
                  border: "1px solid rgba(201,168,76,0.25)",
                  borderRadius: "1.25rem",
                  boxShadow: "0 0 0 1px rgba(201,168,76,0.08), 0 0 60px rgba(201,168,76,0.12), 0 0 120px rgba(100,80,200,0.15), 0 30px 80px rgba(0,0,0,0.5)",
                }}
              >
                {/* Holographic top shimmer bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-px rounded-t-[1.25rem]"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.6), rgba(160,120,255,0.4), transparent)" }}
                />

                {/* Corner sparkles */}
                <span className="absolute top-3 left-4 text-primary/30 text-lg select-none pointer-events-none">✦</span>
                <span className="absolute top-3 right-12 text-primary/20 text-sm select-none pointer-events-none">✦</span>

                {/* Header */}
                <div
                  className="flex items-start justify-between px-7 pt-6 pb-5 shrink-0"
                  style={{ borderBottom: "1px solid rgba(201,168,76,0.12)" }}
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)" }}
                      >
                        {selectedPost.category}
                      </span>
                      {selectedPost.readTime && (
                        <span className="text-xs flex items-center gap-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                          <Clock className="w-3 h-3" />{selectedPost.readTime}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-bold leading-snug text-white">{selectedPost.title}</h2>
                    <div className="flex items-center gap-4 mt-2 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{selectedPost.author}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(selectedPost.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-2 rounded-lg transition-colors shrink-0"
                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,168,76,0.15)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto px-7 py-6 text-white/75">
                  <ModalContent post={selectedPost} />
                </div>

                {/* Footer bar */}
                <div
                  className="px-7 py-4 shrink-0 flex items-center justify-between"
                  style={{ borderTop: "1px solid rgba(201,168,76,0.10)" }}
                >
                  <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(201,168,76,0.5)" }}>
                    <Sparkles className="w-3 h-3" /> Nova Exams
                  </span>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-xs px-4 py-1.5 rounded-full transition-all"
                    style={{ background: "rgba(201,168,76,0.12)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.25)" }}
                  >
                    Close
                  </button>
                </div>

                {/* Bottom shimmer */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px rounded-b-[1.25rem]"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(100,80,200,0.4), rgba(201,168,76,0.3), transparent)" }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
      <ChatBot />
      <TelegramButton />
    </div>
  );
};

export default Blog;
