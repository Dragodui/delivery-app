/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'text': '#0c0b0e',
      'textWhite': '#ffffff',
      'background': '#f3edff',
      'primary': '#7854ba',
      'secondary': '#a98ce0',
      'accent': '#9060e6',
      'modalBg': '#ddcbff',
      'error': '#f44336',
      'main': '#30ff68',
      'mainLight': '#8cffab'
     },
     fontSize: {
      sm: '0.750rem',
      base: '1rem',
      xl: '1.333rem',
      '2xl': '1.777rem',
      '3xl': '2.369rem',
      '4xl': '3.158rem',
      '5xl': '4.210rem',
    },
    fontFamily: {
      heading: 'Poppins',
      body: 'Poppins',
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },
    extend: {
      boxShadow: {
        '3xl': ' 0px 0px 2px 0px black',
        '4xl': ' 0px 0px 4px 0px black',
      }
    }
  },
  plugins: [],
}

