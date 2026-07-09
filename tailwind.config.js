/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'sidebar': "#18181b",
        'navbar': "#0f0f11",
        'twitch': '#9146fe',
        'twitch-dark': '#772ce8',
        'twitch-light': '#a970ff',
        'surface': '#1c1c1f',
        'surface-hover': '#27272a',
        'border-custom': '#2a2a2e',
      },
      fontFamily: {
        'display': ['"Inter"', 'system-ui', 'sans-serif'],
        'body': ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(145, 70, 254, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(145, 70, 254, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};