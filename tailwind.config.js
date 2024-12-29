/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#a32e2d",
        bgColor:"#161622",
        disabledBG:"#d9d9d9",
        disabledText:"#8e8e90",
        border:"#3E3A39",
        lighttext:"#7f7e7e",
        lightbg:"#f7f7f7",
        secondary: {
          DEFAULT: "#FF8582",
          100: "#cc0f16",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#231F1E",
          100: "#3E3A39",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
        green: {
          DEFAULT: "#63bc46",
          100:"#C57672"
        },
      },
      fontFamily: {
        mbold: ["Montserrat-Bold", "sans-serif"],
        mlight: ["Montserrat-Light", "sans-serif"],
        mmedium: ["Montserrat-Medium", "sans-serif"],
        mregular: ["Montserrat-Regular", "sans-serif"],
        msemibold: ["Montserrat-SemiBold", "sans-serif"],
        sbold: ["SourceSansPro-Bold", "sans-serif"],
        slightitalic: ["SourceSansPro-LightItalic", "sans-serif"],
        sregular: ["SourceSansPro-Regular", "sans-serif"],
        ssemibold: ["SourceSansPro-Semibold", "sans-serif"],
        xslight: ["xxSourceSansPro-LightItalic", "sans-serif"],
        sfbold:["SF-UI-Display-Bold", "sans-serif"],
        sfmedium:["SF-UI-Display-Medium", "sans-serif"],
        sfregular:["SF-UI-Display-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
