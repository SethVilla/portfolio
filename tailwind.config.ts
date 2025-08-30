import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "oklch(0.585 0.208 15.919)",
      },
      fontFamily: {
        lausanne: ["var(--font-lausanne)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
