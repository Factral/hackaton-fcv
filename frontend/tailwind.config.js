/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        dosis: ['Dosis', 'system-ui', 'sans-serif']
      },
      colors: {
        'main-green': {
          DEFAULT: '#00D35B',
          50: '#75FFBB',
          100: '#63FFB1',
          200: '#3FFF9B',
          300: '#1BFF85',
          400: '#00F76F',
          500: '#00D35B',
          600: '#00BF4F',
          700: '#00AA44',
          800: '#009639',
          900: '#00812F',
          950: '#00772A'
        },
        'main-white': {
          DEFAULT: '#E9F8F1',
          100: '#E9F8F1',
          200: '#C2E9D8'
        }
      }
    }
  },
  plugins: []
}
