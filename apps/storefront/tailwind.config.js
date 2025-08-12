/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        accent: "#f8f8f8",
        text: "#333333",
        "light-text": "#666666",
        border: "#e0e0e0",
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0 2px 10px rgba(0,0,0,0.1)',
      },
      container: {
        center: true,
        padding: '1.25rem',
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1200px',
          xl: '1200px',
        },
      },
    },
  },
  plugins: [],
};