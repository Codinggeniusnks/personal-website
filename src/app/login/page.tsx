"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function signIn(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
      setError("Supabase is not configured.");
      return;
    }
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); return; }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center p-4">
      <form onSubmit={signIn} className="w-full max-w-md p-8 rounded-2xl bg-[var(--bg-glass-active)] hairline-border space-y-5">
        <h1 className="font-display text-2xl font-bold">Admin sign in</h1>
        <label className="block text-sm">Email
          <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full px-4 py-2.5 rounded-xl bg-[var(--bg-canvas)] hairline-border" />
        </label>
        <label className="block text-sm">Password
          <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full px-4 py-2.5 rounded-xl bg-[var(--bg-canvas)] hairline-border" />
        </label>
        {error && <p role="alert" className="text-rose-400 text-sm">{error}</p>}
        <button type="submit" className="w-full min-h-[44px] rounded-xl bg-[var(--accent-primary)] text-[#06090F] font-semibold">Sign in</button>
      </form>
    </main>
  );
}
