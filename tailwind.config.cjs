/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/*.tsx',
    'index.html'
  ],
  theme: {
    extend: {
      colors:{
        'black':'#0A0909',
        'DF-black':'#262525',
        'input-DF':'#1B1A1A',
        'input-DF-border':"#5B5959",
      },
      fontFamily:{
        'K2D':['K2D','sans-serif']
      }
    },
  },
  plugins: [],
}
