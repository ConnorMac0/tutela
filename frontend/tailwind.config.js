/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      colors: {
        'green': '#45552D',
        'ivory': '#FFFFF0'
      },
      fontFamily: {
        main: ['uncage'],
        brand: ['migha'],
      },
      minHeight: {
        'custom': 'calc(100vh - 156px)',
      },
      height: {
        'custom': 'calc(100vh - 156px)',
      },
      maxHeight: {
        'custom': 'calc(100vh - 156px)',
      }
    },
  },
  plugins: [],
}

