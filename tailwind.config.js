/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "9999px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      colors: {
        "custom-gray": "#4e4e4e",
        "custom-black": "#000",
        "custom-light-gray": "#a3a3a3",
        "custom-hover-gray": "#dedede",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(0deg, rgb(44, 44, 44) 0%, rgb(44, 44, 44) 35%, rgba(44, 44, 44, 0.75) 100%);",
      },
      backgroundColor: {
        "new-color": "#2c2c2c",
        "naver-green": "#2db400",
      },

      fontFamily: {
        "noto-sans-kr": [
          '"Noto Sans KR"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Roboto"',
          '"Segoe UI"',
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          '"Helvetica Neue"',
          "sans-serif",
        ],
      },
    },
    fontFamily: {
      pretendard: ["Pretendard"],
      pretendardLight: ["Pretendard-Light"],
      pretendardBold: ["Pretendard-Bold"],
    },
  },
  plugins: [require("daisyui")],
};
