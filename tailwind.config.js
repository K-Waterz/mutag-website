/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#4379D9",
          purple: "#5D308E",
          dark: "#0B0F1A",
          light: "#F6F7FB"
        }
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"]
      },
      maxWidth: {
        container: "1280px"
      },
      spacing: {
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '56': '56px',
        '64': '64px',
        '72': '72px',
        '80': '80px'
      },
      fontSize: {
        'base': '1rem',
        'xs': '0.8rem',
        'sm': '0.875rem',
        'lg': '1.25rem',
        'xl': '1.563rem',
        '2xl': '1.953rem',
        '3xl': '2.441rem',
        '4xl': '3.052rem',
        '5xl': '3.815rem'
      },
      lineHeight: {
        'body': '1.5',
        'heading': '1.2'
      }
    }
  },
  plugins: []
}

