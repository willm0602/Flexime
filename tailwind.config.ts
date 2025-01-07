import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

console.log('TAILWIND LOADING');

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
      },
    },
  },
  plugins: [
    daisyui,
    typography,
  ],
  daisyui: {
    themes: ['luxury']
  }
} satisfies Config;
