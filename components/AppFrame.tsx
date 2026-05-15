"use client";

import { Award, BarChart3, Gauge, LogOut, NotebookPen, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const nav = [
  { label: "Dashboard", href: "/dashboard", icon: Gauge },
  { label: "Update", href: "/dashboard#update", icon: NotebookPen },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Compare", href: "/dashboard/leaderboard", icon: Trophy },
  { label: "Certificate", href: "/dashboard#certificate", icon: Award }
];

export function AppFrame({ children, title, subtitle }: { children: ReactNode; title: string; subtitle: string }) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen text-textPrimary">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/10 bg-backgroundPrimary/82 p-5 backdrop-blur-xl lg:block">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-accentGold text-xl font-black text-[#15120c] shadow-gold">P</span>
          <span>
            <strong className="block">Pragati</strong>
            <span className="text-sm text-mutedText">Progress, measured well</span>
          </span>
        </Link>

        <nav className="mt-10 grid gap-2">
          {nav.map(({ label, href, icon: Icon }) => {
            const baseHref = href.split("#")[0];
            const active = pathname === baseHref || (pathname === "/dashboard" && href.includes("#"));
            return (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
                  active
                    ? "border-accentGold/35 bg-accentGold/10 text-accentSoft"
                    : "border-transparent text-textSecondary hover:border-white/10 hover:bg-white/[0.05] hover:text-textPrimary"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/login"
          className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-mutedText transition hover:bg-white/[0.05] hover:text-textPrimary"
        >
          <LogOut size={18} />
          Sign out
        </Link>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-backgroundPrimary/75 px-5 py-4 backdrop-blur-xl sm:px-8">
          <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-accentSoft">Pragati</p>
              <h1 className="mt-1 text-xl font-semibold">{title}</h1>
              <p className="mt-1 text-sm text-mutedText">{subtitle}</p>
            </div>
            <Link href="/dashboard#update" className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#101318] transition hover:bg-accentSoft">
              Add update
            </Link>
          </div>
        </header>

        {children}
      </div>

      <nav className="fixed inset-x-4 bottom-4 z-30 grid grid-cols-4 rounded-3xl border border-white/10 bg-backgroundPrimary/90 p-2 shadow-panel backdrop-blur lg:hidden">
        {nav.slice(0, 4).map(({ label, href, icon: Icon }) => (
          <Link key={label} href={href} aria-label={label} className="grid h-12 place-items-center rounded-2xl text-mutedText hover:bg-white/[0.05]">
            <Icon size={20} />
          </Link>
        ))}
      </nav>
    </main>
  );
}
