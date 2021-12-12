module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        // https://www.tailwindshades.com/
        primary: {
          main: "#050258",
          50: "#4B45FB",
          100: "#332CFA",
          200: "#0E05EE",
          300: "#0B04BC",
          400: "#08038A",
          500: "#050258",
          600: "#020126",
        },
        secondary: {
          main: "#B58C12",
          50: "#F8E7B5",
          100: "#F5DF9E",
          200: "#F1D06F",
          300: "#ECC141",
          400: "#E3B017",
          500: "#B58C12",
          600: "#87680D",
          700: "#584409",
          800: "#2A2004",
        },
      },
      ...Object.fromEntries(
        ["minWidth", "maxWidth", "minHeight", "maxHeight"].map((property) => [
          property,
          (theme) => theme("spacing"),
        ])
      ),
    },
  },
  variants: {},
  plugins: [],
};
