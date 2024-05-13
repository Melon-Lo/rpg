/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // 修改這行
  theme: {
    extend: {
      animation: {
        shake: "shake 0.1s linear infinite",
      },
      keyframes: {
        shake: {
          "0%": { transform: "translate(-5px, -5px)", background: "pink" },
          "50%": { transform: "translate(3px, 7px)" },
          "75%": { transform: "translate(-1px, -5px)" },
          "100%": { transform: "translate(5px, -3px)", background: "white" },
        },
      },
    },
  },
  plugins: [],
  // 確保這些樣式可以正常顯示
  safelist: [
    {
      pattern:
        /(bg|text)-(neutral|stone|yellow|red|rose|green|emerald|blue|sky|teal|brown|cyan|orange|gray|slate|purple|fuchsia|lime|amber)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
};
