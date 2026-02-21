/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af',
        accent: '#8b5cf6',
        dark: '#1e293b',
        light: '#f8fafc',
      },
    },
  },
  plugins: [],
}