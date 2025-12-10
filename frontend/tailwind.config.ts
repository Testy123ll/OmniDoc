import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "neon-pink": "#ff006e",
        "neon-purple": "#8338ec",
        "neon-cyan": "#00f5ff",
        "neon-green": "#00ff41",
        "dark-bg": "#0a0e27",
        "dark-secondary": "#16213e",
        "dark-tertiary": "#1f3a5f",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(131, 56, 236, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(131, 56, 236, 0.1) 1px, transparent 1px)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(131, 56, 236, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(131, 56, 236, 0.8)" },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
