import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── PALETA FROST AI ── */
      colors: {
        frost: {
          dark:    "#0B1120",
          darker:  "#080E1C",
          darkest: "#060C18",
          surface: "#0F1929",
          blue:    "#2563EB",
          "blue-dark": "#1d4ed8",
          cyan:    "#06B6D4",
          gray:    "#111827",
          light:   "#F9FAFB",
        },
      },

      /* ── TIPOGRAFÍA ── */
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },

      /* ── BORDES REDONDEADOS ── */
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      /* ── ANIMACIONES PERSONALIZADAS ── */
      keyframes: {
        "fade-in-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)", filter: "blur(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)",    filter: "blur(0)"   },
        },
        shimmer: {
          "0%":   { transform: "translateX(-110%) skewX(-20deg)" },
          "100%": { transform: "translateX(110%)  skewX(-20deg)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.4" },
        },
        scan: {
          "0%":   { top: "0%" },
          "100%": { top: "100%" },
        },
      },
      animation: {
        "fade-in-up":  "fade-in-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "shimmer":     "shimmer 0.7s ease-out",
        "pulse-slow":  "pulse-slow 3s ease-in-out infinite",
        "scan":        "scan 8s linear infinite",
      },

      /* ── SOMBRAS ── */
      boxShadow: {
        "glow-blue": "0 0 30px rgba(37, 99, 235, 0.3)",
        "glow-cyan": "0 0 30px rgba(6, 182, 212, 0.3)",
        "card":      "0 8px 32px rgba(0, 0, 0, 0.4)",
        "card-hover":"0 16px 48px rgba(0, 0, 0, 0.5)",
      },

      /* ── BACKDROP BLUR EXTRA ── */
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
