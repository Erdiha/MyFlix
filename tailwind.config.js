/** @type {import('tailwindcss').Config} */
  module.exports = {
   purge: [],
   purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        // backgroundImage: {
        //   'gradient-to-b':'linear-gradient(to bottom,rgba(20,20,20,0) 0,rgba(20,20,20,.15) 15%,rgba(20,20,20,.35) 29%,rgba(20,20,20,.58) 44%,#141414 68%,#141414 100%);'
        // }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [require('tailwind-scrollbar-hide')],
  }
