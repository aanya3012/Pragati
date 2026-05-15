import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        backgroundPrimary: "#0E1117",
        backgroundSecondary: "#171B22",
        surface: "#1F2630",
        surface2: "#242C38",
        accentGold: "#C6A969",
        accentSoft: "#D8C08A",
        textPrimary: "#F5F7FA",
        textSecondary: "#B0B8C4",
        mutedText: "#7C8796"
      },
      boxShadow: {
        panel: "0 24px 70px rgba(0, 0, 0, 0.34)",
        gold: "0 20px 54px rgba(198, 169, 105, 0.22)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
