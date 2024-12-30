/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundColor: {
        mainBlue: "#163172",
        secondaryBlue: "#1062fe",
      },
      textColor: {
        mainBlue: "#163172",
        secondaryBlue: "#1062fe",
        tertiaryBlue: "#2a6bfe",
        indomonangeRed: "#9c1c23",
      },
    },
  },

  plugins: [],
};
