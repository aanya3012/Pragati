"use client";

import { AnimatedShell } from "@/components/AnimatedShell";
import { signIn, signUp } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Chrome, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [oauthError, setOauthError] = useState<string | null>(null);

  async function handleGoogleSignIn() {
    console.log("[auth] Google sign-in clicked");
    setOauthError(null);

    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=/onboarding`;

      console.log("[auth] Starting Google OAuth", { redirectTo });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: {
            access_type: "offline",
            prompt: "consent"
          }
        }
      });

      if (error) {
        console.error("[auth] Google OAuth failed", error);
        setOauthError(error.message);
        return;
      }

      console.log("[auth] Google OAuth redirect created", data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Google sign-in failed.";
      console.error("[auth] Google OAuth threw", error);
      setOauthError(message);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-5 py-10 text-textPrimary">
      <AnimatedShell className="grid w-full max-w-6xl overflow-hidden rounded-[34px] border border-white/10 bg-surface/82 shadow-panel backdrop-blur lg:grid-cols-[1fr_0.9fr]">
        <section className="relative min-h-[640px] overflow-hidden bg-[linear-gradient(135deg,#1F2630_0%,#101318_58%,#2b261a_100%)] p-7 sm:p-10">
          <div className="absolute right-10 top-12 hidden size-72 animate-spin rounded-full border border-accentGold/20 [animation-duration:20s] md:block" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="grid size-14 place-items-center rounded-2xl bg-accentGold text-2xl font-black text-[#15120c] shadow-gold">P</div>
              <p className="mt-10 text-xs font-bold uppercase tracking-[0.12em] text-accentSoft">Pragati</p>
              <h1 className="mt-4 max-w-xl text-5xl font-bold leading-[0.98] tracking-normal sm:text-7xl">
                Track the work that actually changes you.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-textSecondary">
                Sign in, set your DSA starting point, update your journey daily, and compare your progress with learners moving beside you.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Daily effort", "Logged with context"],
                ["Growth score", "Difficulty plus breadth"],
                ["Peer position", "Relative momentum"]
              ].map(([title, text]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.055] p-4">
                  <strong className="block">{title}</strong>
                  <span className="mt-2 block text-sm leading-6 text-mutedText">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="p-7 sm:p-10">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-accentSoft">Welcome back</p>
            <h2 className="mt-2 text-3xl font-semibold">Login to continue</h2>
            <p className="mt-3 text-textSecondary">Your dashboard starts after a short journey quiz.</p>
          </div>

          <form action={signIn} className="grid gap-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex h-12 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] font-semibold text-textPrimary transition hover:-translate-y-0.5 hover:border-white/20"
            >
              <Chrome size={19} />
              Continue with Google
            </button>
            {oauthError ? (
              <p className="rounded-2xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-200">{oauthError}</p>
            ) : null}

            <label className="grid gap-2 text-sm font-semibold text-mutedText">
              Email
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-backgroundPrimary/60 px-4 transition focus-within:border-accentGold/60 focus-within:ring-4 focus-within:ring-accentGold/10">
                <Mail size={18} />
                <input className="h-12 flex-1 bg-transparent text-textPrimary outline-none" name="email" placeholder="you@example.com" type="email" required />
              </div>
            </label>

            <label className="grid gap-2 text-sm font-semibold text-mutedText">
              Password
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-backgroundPrimary/60 px-4 transition focus-within:border-accentGold/60 focus-within:ring-4 focus-within:ring-accentGold/10">
                <LockKeyhole size={18} />
                <input className="h-12 flex-1 bg-transparent text-textPrimary outline-none" name="password" placeholder="••••••••" type="password" required minLength={6} />
              </div>
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-accentGold font-bold text-[#17130b] shadow-gold transition hover:-translate-y-0.5 hover:bg-accentSoft"
            >
              Login
              <ArrowRight size={18} />
            </button>
            <button formAction={signUp} className="text-sm font-semibold text-accentSoft hover:text-accentGold">
              Create account instead
            </button>
          </form>

          <p className="mt-7 text-sm leading-6 text-mutedText">
            New here? Create an account with the same flow. Supabase auth is wired in the project shell and ready for real credentials.
          </p>
        </section>
      </AnimatedShell>
    </main>
  );
}
