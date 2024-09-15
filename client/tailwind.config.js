/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        biGray: "#2F3136",
        biBlack: "#202225",
        bidBlack: "#131313",
        biBlue: "#496CE9",
        bidBlue: "#4063DA",
        biPurple: "#A577FF",
        bidPurple: "#4B06FF",
      },
      boxShadow: {
        white: '0 2px 4px 0 rgba(255, 255, 255, 0.7)',
      },
    },
  },
  plugins: [],
}