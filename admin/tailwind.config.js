/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      colors: {
        'green': '#45552D',
        'ivory': '#FFFFF0',
      },
      fontFamily: {
        brand: ['migha'],
        main: ['Lato']
      },
      height: {
        'mobile': 'calc(100vh - 122px)',
        'desktop': 'calc(100vh - 84px)',
      },
      minHeight: {
        'mobile': 'calc(100vh - 122px)',
        'desktop': 'calc(100vh - 84px)',
      },
      maxHeight: {
        'mobile': 'calc(100vh - 122px)',
        'desktop': 'calc(100vh - 84px)',
      },
    },
  },
  plugins: [],
}

