/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minWidth: {
        30: '7.5rem',
        40: '10rem',
        50: '12.5rem'
      },
      keyframes: {
        pong: {
          "0%, 100%": {
            transform: "scale(1.1)",
          },
          "50%": {
            transform: "scale(1)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1
          }
        }
      },
      animation: {
        pong: "pong 1s infinite ease",
        fadeIn: "fadeIn .3s ease"
      },
      backgroundImage: {
        'hero-texture': "url('./src/assets/img/bg-texture.jpg')",
      }
    },
  },
  plugins: [],
};
