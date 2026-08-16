import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLogin, useSession } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import navLogo from "@/assets/navlogo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync: login, isPending } = useLogin();
  const { data: user } = useSession();
  const queryClient = useQueryClient();

  if (user) {
    navigate("/admin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      if (res.success) {
        toast.success("Login successful");
        queryClient.setQueryData(["session"], {
          id: res.user?.id,
          email: res.user?.email,
          isAdmin: true,
        });
        navigate("/admin");
      } else {
        toast.error("Invalid credentials");
      }
    } catch {
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center mb-3">
            <img src={navLogo} alt="Nova Exams Logo" className="w-8 h-8" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-muted-foreground text-sm mt-1">This login is for administrators only.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email" type="email" placeholder="admin@novaexams.com"
              value={email} onChange={(e) => setEmail(e.target.value)} required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password" type={showPassword ? "text" : "password"}
                placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)} required className="pr-10"
              />
              <button
                type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" variant="cta" size="lg" className="w-full" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            <Shield className="inline w-3 h-3 mr-1" />
            Admin access only
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
