import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF555B",
        secondary: "#F9F1F1",
        stroke: "#E2E8F0",
        grey: "#64748B",
        gray_bg: "#F0F0F0",
        green: "#53B95D",
      },
      fontFamily: {
        body: ["Roboto"],
      },
    },
  },
  plugins: [],
};
