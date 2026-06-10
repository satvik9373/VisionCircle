import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F9F4F0",
        forest: "#0F3328",
        ink: "#1E1E1E",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        serif: ['var(--font-cormorant)', "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
