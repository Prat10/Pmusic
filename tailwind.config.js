/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #4B0000 0%, rgba(0,0,0,1) 90%)',
      },
      backgroundColor:{
        'button-color':"#0A4D68"
      }
    },
  },
  plugins: [],
}

