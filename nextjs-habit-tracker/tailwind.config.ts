import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#EDEAE0",
        paperDim: "#E4E0D2",
        ink: "#16281F",
        inkSoft: "#3A4B41",
        moss: "#3F6B4E",
        mossLight: "#DCE6DB",
        clay: "#A8542E",
        clayLight: "#F1DCCB",
        sage: "#9CA694",
        line: "#D3CDB9",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "3px",
      },
      screens: {
        xs: "30rem",
      },
    },
  },
  plugins: [],
};

export default config;
