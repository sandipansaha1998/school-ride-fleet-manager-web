/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lemon1: "#FFF3B0",
        lemon2: "#FFE27A",
        yellowSecondary: "#F28705",
      },
    },
  },
  plugins: [],
};
