/** @type {import('tailwindcss').Config} */
  module.exports = {
    purge: [],
    images: {
    domains: ['tmdb.org', 'themoviedb.org'],
  },
   purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
         backgroundImage: {
         'hero-wrapper': "linear-gradient(to right bottom, rgba('#000',0.8),[rgb(173,221,208,0.5)]))",
      },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [  
        require("tailwind-scrollbar-hide"),],
  }
