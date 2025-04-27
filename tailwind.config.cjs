// eslint-disable-next-line @typescript-eslint/no-require-imports
const plugin = require("tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: {
          forground: "#fafafa",
        },
        primary: "#000000",
        secondary: "#414651",
        tertiary: "#535862",
        quaternary: "#717680",
        "blast-off-bronze": "#A47764",
        "grey-light": "#D5D7DA",
        "grey-light-02": "#E9EAEB",
        "grey-light-03": "#F6F7F9",
        "grey-dark": "#79716B",
        "grey-dark-02": "#252B37",
        "grey-medium": "#A4A7AE",
        "grey-light-04": "#F2F2F2",
        primary: {
          900: "#181D27",
        },
        black: {
          primary: "#0C0E12",
          secondary: "#22262F",
          "01": "#4C4743",
          "02": "#0A0D12",
        },
        red: {
          500: "#F04438",
          "01": "#D92D20",
          "02": "#B42318",
          "03": "#FECDCA",
          "04": "#FDA29B",
        },
        green: {
          "01": "#ABEFC6",
          "02": "#067647",
          "03": "#079455",
        },

        text: {
          primary: {
            900: "#181D27",
          },
          secondary: {
            700: "#414651",
            hover: "#252B37",
          },
          quaternary: {
            500: "#717680",
            600: "#535862",
          },
          placeholder: "#717680",
          error_primary: "#D92D20",
        },
        gray: {
          "light-mode-100": "#F2F2F2",
          "utility-gray-50": "#F6F7F9",
          "utility-gray-200": "#E9EAEB",
          "utility-gray-600": "#535862",
          "utility-gray-700": "#414651",
        },
        Foreground: {
          "fg-secoundary_hover": "#252B37",
        },
        utility: {
          success: {
            50: "#ECFDF3",
            200: "#ABEFC6",
            500: "#17B26A",
            700: "#067647",
          },
          error: {
            50: "#FEF3F2",
            200: "#FECDCA",
            500: "#F04438",
            600: "#D92D20",
            700: "#B42318",
          },
          blue: {
            light: {
              100: "#E0F2FE",
              200: "#B9E6FE",
              600: "#0086C9",
            },
          },
          green: {
            100: "#D3F8DF",
            200: "#AAF0C4",
            600: "#099250",
          },
          yellow: {
            100: "#FEF7C3",
            200: "#FEEE95",
            600: "#CA8504",
          },
        },
        bg: {
          secondary: "#F6F7F9",
          primary_hover: "#F6F7F9",
        },
        button: {
          primary: {
            bg: "#A47764",
          },
        },
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90deg, #6FA9FF 0%, #FF2394 52.79%, #FF7514 100%)",
      },
      boxShadow: {
        "01": "0px 1px 2px 0px #0A0D120D",
        skeuomorphic:
          "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".container-max-width-desktop": {
          maxWidth: "1280px",
        },
      });
    }),
  ],
};
