import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lock, User, LogIn } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Sign in — Tribute" },
      { name: "description", content: "Secure admin access for managing tribute uploads." },
    ],
  }),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/admin" });
  },
  component: LoginPage,
});

// Map the friendly username to the underlying account email
const ADMIN_USERNAME = "Lavish kumar";
const ADMIN_EMAIL = "lavish@codeyogi.app";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    if (username.trim().toLowerCase() !== ADMIN_USERNAME.toLowerCase()) {
      toast.error("Invalid credentials");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    });
    setLoading(false);
    if (error) {
      toast.error("Invalid credentials");
      return;
    }
    toast.success("Welcome back, Lavish 👋");
    navigate({ to: "/admin" });
  }

  return (
    <div className="px-4 sm:px-6">
      <section className="mx-auto max-w-md pt-20 pb-24">
        <div className="text-center text-white mb-6">
          <h1 className="text-4xl font-bold tracking-tight">Admin Sign in</h1>
          <p className="mt-2 text-white/75">Authorized access only.</p>
        </div>

        <form onSubmit={onSubmit} className="glass-strong rounded-3xl p-7 sm:p-8 space-y-5">
          <Field icon={<User className="w-4 h-4" />} label="Username">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              placeholder="Lavish kumar"
              className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </Field>

          <Field icon={<Lock className="w-4 h-4" />} label="Password">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-hero text-white font-medium px-5 py-3 shadow-lg hover:opacity-95 disabled:opacity-60 transition"
          >
            <LogIn className="w-4 h-4" />
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </section>
    </div>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-border bg-white/70 px-4 py-3 focus-within:ring-2 focus-within:ring-ring transition">
        <span className="text-muted-foreground">{icon}</span>
        {children}
      </div>
    </label>
  );
}
