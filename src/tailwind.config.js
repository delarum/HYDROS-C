/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        ocean: {
          900: '#0a1628',
          800: '#1e293b',
          700: '#334155',
        },
        brand: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        }
      }
    },
  },
  plugins: [],
}