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
        /(bg|text)-(stone|yellow|red|green|emerald|blue|teal|brown|cyan|orange|gray|slate|fuchsia|lime|amber)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
};
