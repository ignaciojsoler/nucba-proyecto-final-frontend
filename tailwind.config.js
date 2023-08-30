/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';
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
        },
        sladeInFromBottomShort: {
          "0%": {
            opacity: 0,
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)"
          }
        },
        sladeInFromBottomMedium: {
          "0%": {
            opacity: 0,
            transform: "translateY(20px)"
          },
          "50%": {
            opacity: 0,
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)"
          }
        },
        sladeInFromBottomLong: {
          "0%": {
            opacity: 0,
            transform: "translateY(20px)"
          },
          "77%": {
            opacity: 0,
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)"
          }
        },
        blurTransition: {
          "0%": {
            filter: "blur(16px)"
          },
          "100%": {
            filter: "blur(0px)"
          }
        }
      },
      animation: {
        pong: "pong 1s infinite ease",
        fadeIn: "fadeIn .3s ease",
        sladeInFromBottomShort: "sladeInFromBottomShort .3s ease",
        sladeInFromBottomMedium: "sladeInFromBottomMedium .6s  ease",
        sladeInFromBottomLong: "sladeInFromBottomLong .9s ease-out",
        blurTransition: "blurTransition .3s ease"
      },
    },
  },
  plugins: [
    lineClamp
  ],
};
