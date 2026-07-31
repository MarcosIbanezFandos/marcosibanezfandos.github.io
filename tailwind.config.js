/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        bmw: { light: '#6CB2E4', blue: '#0166B1', red: '#E7222E' },
        clay: { 500: '#C1663F', 600: '#A2502F' },
      },
    },
  },
  plugins: [],
}
