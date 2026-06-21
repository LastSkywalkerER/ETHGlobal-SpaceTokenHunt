import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-orbitron)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        space: {
          950: "#03050f",
          900: "#070b1f",
          800: "#0b1230",
          700: "#131c40",
          600: "#1d2a5c",
        },
        neon: {
          cyan: "#34e7e4",
          blue: "#3da9ff",
          purple: "#c084fc",
          green: "#86ff00",
          pink: "#f472b6",
          red: "#ff4d6d",
          amber: "#ffaa00",
        },
      },
      borderRadius: {
        large: "1.25rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(52,231,228,0.15), 0 8px 40px -8px rgba(8,12,30,0.9)",
        "glow-cyan": "0 0 20px -2px rgba(52,231,228,0.55)",
        "glow-purple": "0 0 20px -2px rgba(192,132,252,0.55)",
      },
      backgroundImage: {
        "panel-glass": "linear-gradient(135deg, rgba(29,42,92,0.55) 0%, rgba(11,18,48,0.65) 100%)",
        "grid-faint":
          "linear-gradient(rgba(52,231,228,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(52,231,228,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 12px -2px rgba(52,231,228,0.4)" },
          "50%": { boxShadow: "0 0 24px 2px rgba(52,231,228,0.7)" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out both",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "spin-slow": "spin 1.1s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
