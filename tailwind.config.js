/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "412px",
      },
      fontSize: {
        md: "1.125rem",
      },
      transitionDuration: {
        2000: "2000ms",
        3000: "3000ms",
        3500: "3500ms",
        4000: "4000ms",
        5000: "5000ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
