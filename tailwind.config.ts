import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        overlay: "hsl(var(--overlay))",
        panel: {
          DEFAULT: "hsl(var(--panel))",
          translucent: "hsl(var(--panel-translucent))",
        },
        accent: {
          "1": "hsl(var(--accent-1))",
          "2": "hsl(var(--accent-2))",
          "3": "hsl(var(--accent-3))",
          "4": "hsl(var(--accent-4))",
          "5": "hsl(var(--accent-5))",
          "6": "hsl(var(--accent-6))",
          "7": "hsl(var(--accent-7))",
          "8": "hsl(var(--accent-8))",
          "9": "hsl(var(--accent-9))",
          "10": "hsl(var(--accent-10))",
          "11": "hsl(var(--accent-11))",
          "12": "hsl(var(--accent-12))",
          a1: "hsl(var(--accent-a1))",
          a2: "hsl(var(--accent-a2))",
          a3: "hsl(var(--accent-a3))",
          a4: "hsl(var(--accent-a4))",
          a5: "hsl(var(--accent-a5))",
          a6: "hsl(var(--accent-a6))",
          a7: "hsl(var(--accent-a7))",
          a8: "hsl(var(--accent-a8))",
          a9: "hsl(var(--accent-a9))",
          a10: "hsl(var(--accent-a10))",
          a11: "hsl(var(--accent-a11))",
          a12: "hsl(var(--accent-a12))",
          contrast: "hsl(var(--accent-contrast))",
        },
        gray: {
          "1": "hsl(var(--gray-1))",
          "2": "hsl(var(--gray-2))",
          "3": "hsl(var(--gray-3))",
          "4": "hsl(var(--gray-4))",
          "5": "hsl(var(--gray-5))",
          "6": "hsl(var(--gray-6))",
          "7": "hsl(var(--gray-7))",
          "8": "hsl(var(--gray-8))",
          "9": "hsl(var(--gray-9))",
          "10": "hsl(var(--gray-10))",
          "11": "hsl(var(--gray-11))",
          "12": "hsl(var(--gray-12))",
          a1: "hsl(var(--gray-a1))",
          a2: "hsl(var(--gray-a2))",
          a3: "hsl(var(--gray-a3))",
          a4: "hsl(var(--gray-a4))",
          a5: "hsl(var(--gray-a5))",
          a6: "hsl(var(--gray-a6))",
          a7: "hsl(var(--gray-a7))",
          a8: "hsl(var(--gray-a8))",
          a9: "hsl(var(--gray-a9))",
          a10: "hsl(var(--gray-a10))",
          a11: "hsl(var(--gray-a11))",
          a12: "hsl(var(--gray-a12))",
        },
        danger: {
          "1": "hsl(var(--danger-1))",
          "2": "hsl(var(--danger-2))",
          "3": "hsl(var(--danger-3))",
          "4": "hsl(var(--danger-4))",
          "5": "hsl(var(--danger-5))",
          "6": "hsl(var(--danger-6))",
          "7": "hsl(var(--danger-7))",
          "8": "hsl(var(--danger-8))",
          "9": "hsl(var(--danger-9))",
          "10": "hsl(var(--danger-10))",
          "11": "hsl(var(--danger-11))",
          "12": "hsl(var(--danger-12))",
          a1: "hsl(var(--danger-a1))",
          a3: "hsl(var(--danger-a3))",
          a2: "hsl(var(--danger-a2))",
          a4: "hsl(var(--danger-a4))",
          a5: "hsl(var(--danger-a5))",
          a6: "hsl(var(--danger-a6))",
          a7: "hsl(var(--danger-a7))",
          a8: "hsl(var(--danger-a8))",
          a9: "hsl(var(--danger-a9))",
          a10: "hsl(var(--danger-a10))",
          a11: "hsl(var(--danger-a11))",
          a12: "hsl(var(--danger-a12))",
        },
        focus: "hsl(var(--focus))",
        surface: "hsl(var(--surface))",
      },
      borderRadius: {
        "2xl": "calc(1rem * var(--radius))",
        xl: "calc(0.75rem * var(--radius))",
        lg: "calc(0.5rem * var(--radius))",
        md: "calc(0.375rem * var(--radius))",
        DEFAULT: "calc(0.25rem * var(--radius))",
        sm: "calc(0.1875rem * var(--radius))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
        brand: ["var(--font-brand)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};

export default config;
