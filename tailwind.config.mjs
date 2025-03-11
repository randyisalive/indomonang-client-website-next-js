/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif", "medium"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundColor: {
        mainBlue: "#007BFF", // status open
        mainOrage: "#FD7E14", // Use for label status Drafting  & Waiting for Payment
        secondaryBrown: "#D39E00", // Use for label status Checking
        secondaryBlue: "#17A2B8", // Use for label status Processing
        mainGreen: "#28A745", //Use for label status Finished, Approved, Success, Paid, Uploaded, Submitted, Active
        indomonangeRed: "#9B1D24", // Use for primary color
        mainRed: "#DC3545", // Use for label status Cancelled, Not Uploaded, Expired, Failed
        whiteMain: "#f3f4f6",
        // priority color
        priorityGreen: "#E6FEF6", //Use for background label chips Priority & Delivery Status
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
