/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // 👈 重点是这一行要有
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
