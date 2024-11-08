/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        customLight: {
          primary: "#F27F20",
          "primary-content": "#FFFFFF",
          secondary: "#FFFFFF",
          "secondary-content": "#050505",
          accent: "#000000",
          neutral: "#000000",
          "neutral-content": "#FFFFFF",
          "base-100": "#F4F2EE",
          "base-content": "#62615F",
          "base-200": "#FFFFFF",
          info: "#FFFFFF",
        },

        customDark: {
          primary: "#FF8F00",
          "primary-content": "#FFFFFF",
          secondary: "#242526",
          "secondary-content": "#E4E6EB",
          accent: "#3d4451",
          neutral: "#A6ADBB",
          "neutral-content": "#FFFFFF",
          "base-100": "#18191A",
          "base-content": "#B0B3B8",
          "base-200": "#252728",
          info: "#333334",
        },
      },
    ],
  },
};
