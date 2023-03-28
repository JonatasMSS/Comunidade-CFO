/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/*.tsx',
    './src/components/*.tsx',
    'index.html'
  ],
  theme: {
    extend: {
      colors:{
        'black':'#0A0909',
      },
      fontFamily:{
        'K2D':['K2D','sans-serif']
      }
    },
  },
  plugins: [],
}
