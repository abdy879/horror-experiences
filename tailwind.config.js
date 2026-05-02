/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        horror: {
          black: '#0a0a0a',
          dark: '#1a1a1a',
          darker: '#0d0d0d',
          red: '#8b0000',
          blood: '#660000',
          gray: '#2a2a2a',
          accent: '#ff3333',
          muted: '#666666',
        }
      },
      fontFamily: {
        'horror': ['Creepster', 'cursive'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'flicker': 'flicker 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
          '52%': { opacity: 0.3 },
          '54%': { opacity: 0.9 },
          '56%': { opacity: 0.4 },
          '58%': { opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
