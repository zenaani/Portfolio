/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mont: ['Montserrat']
      },
      colors: {
        green: ['#15ccc1'],
        grey: ['#363636']
      }
    },
  },
  plugins: [],
}

