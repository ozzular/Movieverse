/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'galaxy-dark': '#0a0a0a',
        'galaxy-gray': '#1a1a1a',
        'galaxy-purple': '#9333ea',
        'galaxy-red': '#dc2626',
        'galaxy-pink': '#ec4899',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}