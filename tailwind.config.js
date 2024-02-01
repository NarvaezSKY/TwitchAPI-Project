/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { 'sidebar': "#1F1F23", 'navbar': "#19181a", 'twitch-color': '#9146fe' },
    },
  },
  plugins: [],
};