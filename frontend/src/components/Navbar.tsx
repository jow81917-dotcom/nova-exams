import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Menu, Shield, X } from "lucide-react";
import navLogo from "@/assets/navlogo.png";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLogin, useSession } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about-us" },
  { label: "Blog", path: "/blog" },
  { label: "Resources", path: "/resources" },
  { label: "Contact Us", path: "/contact-us" },
];

interface NavbarProps {
  bgColor?: string;
}

export function Navbar({
  bgColor = "bg-[hsl(var(--hero-bg))]/70",
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { mutateAsync: login, isPending } = useLogin();
  const { data: user } = useSession();

  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      if (res.success) {
        toast.success("Login successful");
        setIsLoginOpen(false);
        setEmail("");
        setPassword("");
        queryClient.setQueryData(["session"], {
          id: res.user?.id,
          email: res.user?.email,
          isAdmin: true,
        });

        navigate("/admin");
      } else {
        toast.error("Invalid Credential");
      }
    } catch (error: any) {
      toast.error("Login failed");
    }
  };

  const handleLoginClick = () => {
    if (user) {
      navigate("/admin");
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${bgColor} backdrop-blur-md`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-purple-950 flex items-center justify-center">
              <img src={navLogo} alt="Nova Exams Logo" className="w-8 h-8" />
            </div>
            <span className="text-secondary-foreground font-display font-bold text-xl">
              <span className="text-primary">Nova </span>Exams
            </span>
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="nav-link font-medium text-secondary-foreground/80 hover:text-yellow-400 transition-colors"
            >
              {item.label.split("").map((char, i) => (
                <span key={i} className="drop-char">
                  {char}
                </span>
              ))}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLoginClick}
            className="hidden lg:block px-5 py-2 rounded-lg border border-secondary-foreground/30
               bg-yellow-400 font-medium text-black
               transform transition-all duration-300
               hover:bg-yellow-400/90 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-lg
               focus-visible:-translate-y-1 focus-visible:-translate-x-1 focus-visible:shadow-lg
               active:translate-x-0 active:translate-y-0 active:shadow-md"
          >
            {user ? "Go to Dashboard" : "Log in"}
          </button>
          <button
            className="block lg:hidden text-secondary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div
          className={`lg:hidden absolute left-0 right-0 top-full ${bgColor} backdrop-blur-md border-t border-secondary-foreground/10 p-4 animate-fade-in space-y-3`}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="block w-full nav-link font-medium text-secondary-foreground/80 hover:text-yellow-400 transition-colors"
            >
              {item.label.split("").map((char, i) => (
                <span key={i} className="drop-char">
                  {char}
                </span>
              ))}
            </Link>
          ))}
          <button
            onClick={handleLoginClick}
            className="mt-4 w-full px-5 py-2 rounded-lg border border-secondary-foreground/30
                 bg-yellow-400 font-medium text-black
                 transform transition-all duration-300
                 hover:bg-yellow-400/90 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-lg
                 focus-visible:-translate-y-1 focus-visible:-translate-x-1 focus-visible:shadow-lg
                 active:translate-x-0 active:translate-y-0 active:shadow-md"
          >
            {user ? "Go to Dashboard" : "Log in"}
          </button>
        </div>
      )}
      {!user && (
        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <DialogContent className="w-full max-w-sm sm:max-w-md sm:mx-0 bg-card border-border rounded-lg sm:rounded-xl">
            <DialogHeader className="text-center">
              <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center ">
                <img src={navLogo} alt="Nova Exams Logo" className="w-8 h-8" />
              </div>
              <DialogTitle className="font-display text-2xl text-center">
                Admin Login
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                This login is for administrators only. Regular users do not need
                to log in.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@novaexams.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                variant="cta"
                size="lg"
                className="w-full"
                disabled={isPending}
              >
                {isPending ? "Signing in..." : "Sign In"}
              </Button>

              <p className="text-center text-xs text-muted-foreground mt-4">
                <Shield className="inline w-3 h-3 mr-1" />
                Admin access only
              </p>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </nav>
  );
}
