/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': ' 0px 0px 2px 0px black',
        '4xl': ' 0px 0px 4px 0px black',
      }
    }
  },
  plugins: [],
}

