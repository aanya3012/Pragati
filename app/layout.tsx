import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Pragati | Consistency Intelligence",
  description:
    "A premium DSA consistency intelligence platform for daily logs, growth scoring, milestones, analytics, and certificates.",
  keywords: ["DSA", "coding practice", "consistency", "Pragati", "Next.js", "Supabase"],
  openGraph: {
    title: "Pragati | Consistency Intelligence",
    description: "Track growth quality, topic breadth, streaks, milestones, and share-worthy DSA certificates.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>{children}</body>
    </html>
  );
}
