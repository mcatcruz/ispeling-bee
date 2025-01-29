/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFD700", // NYT Gold Yellow
        dark: "#333333", // Dark Gray
        light: "#F5F5F5", // Light Gray
        accent: "#0077B6", // Accent Blue
      },
      fontFamily: {
        sans: ['var(--font-libre-franklin)', 'sans-serif']
      }
    },
  },
  plugins: [],
};
