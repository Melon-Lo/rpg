/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // 修改這行
  theme: {
    extend: {},
  },
  plugins: [],
  // 確保這些樣式可以正常顯示
  safelist: [
    {
      pattern:
        /(bg|text)-(yellow|red|blue|teal|brown|cyan|orange|gray)-(100|500|800)/,
    },
  ],
};
