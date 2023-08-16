/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
      "secondary":"#9A9483",
      "primary":'#2C7E80',
      "warning":'#E6F07C',
      "danger":'#E03232',
      "info":'#6FB2D2',
      "success":'#427659'
    }
    },
    fontFamily:{
      "roboto":'Roboto'
    },
    
  },
  plugins: [],
}

