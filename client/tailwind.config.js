/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    // fontFamily :{"body":["Inter"]},
    extend: {},
  },
  plugins: [require('tailwindcss'),require('@tailwindcss/forms'),
  require('autoprefixer')],
}

