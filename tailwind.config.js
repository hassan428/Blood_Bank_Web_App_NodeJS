/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        customScr: "600px",
      },
      colors: {
        "primary-main": "#a80101",
        "secondary-main": "#ffb9b7",
      },
    },
  },
  plugins: [],
};
