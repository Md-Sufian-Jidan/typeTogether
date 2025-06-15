/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Work Sans'", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#805AD5",
          light: "#B794F4",
          dark: "#553C9A",
        },
        background: {
          light: "#F5F7FA",
          card: "#FFFFFF",
        },
        text: {
          base: "#1A202C",
          muted: "#4A5568",
        },
      },
    },
  },
  plugins: [],
};
