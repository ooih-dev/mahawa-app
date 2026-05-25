import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d9edff",
          200: "#bce0ff",
          300: "#8eccff",
          400: "#53b0ff",
          500: "#1a8cff",
          600: "#0073e6",
          700: "#005bb8",
          800: "#004a94",
          900: "#003f7a",
          950: "#002856",
        },
        ocean: {
          50: "#f0f7fe",
          100: "#ddedf9",
          200: "#c2dff5",
          300: "#97cbee",
          400: "#65b0e4",
          500: "#3d94d6",
          600: "#2a78bb",
          700: "#23629a",
          800: "#21537f",
          900: "#1f466a",
          950: "#152d46",
        },
        dark: {
          50: "#f0f2f5",
          100: "#d8dce5",
          200: "#b1b8cb",
          300: "#838eac",
          400: "#5c6990",
          500: "#414d74",
          600: "#323c5e",
          700: "#2a324d",
          800: "#1e253a",
          900: "#181e30",
          950: "#0f1322",
        },
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "soft-lg":
          "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)",
        glow: "0 0 20px rgba(26, 140, 255, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "bounce-gentle": "bounceGentle 1s ease-in-out infinite",
        "fill-rise": "fillRise 0.5s ease-out",
        "ripple": "ripple 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        fillRise: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.5" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
