/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Rutas de tus archivos JSX/TSX
  ],
  darkMode: "class",
  theme: {
    extend: {
      filter: {
        white: "brightness(0) saturate(100%) invert(100%)",
      },
    },
  },
  plugins: [],
};
