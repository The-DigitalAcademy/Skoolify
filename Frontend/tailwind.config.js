/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#F18420",
          secondary: "#FFEDCF",
          accent: "#F4F4F4",
          neutral: "#A3B4A2",
          info:"#333333",
          "base-100": "#ffffff",
        },
      },
    ],
  },
}
