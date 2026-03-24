/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        rk: {
          blue: '#5B8DEF',
          'blue-light': '#7CB3FF',
          'blue-dark': '#3A5FC0',
          gold: '#FFD151',
          'gold-dark': '#E5A800',
          'gold-light': '#FFEBB0',
          orange: '#FF8C42',
          red: '#FF5252',
          green: '#43D9A2',
          purple: '#7C5CFC',
          'purple-light': '#A082FF',
          'purple-dark': '#5A3DC4',
          pink: '#FF7BAC',
          cyan: '#50C8FF',
          dark: '#0A0820',
          'bg-dark': '#0A0820',
          'bg-mid': '#120F2D',
          'bg-card': '#1A1545',
          'text-1': '#FFFFFF',
          'text-2': '#C4B8F0',
          'text-3': '#8A7CC0',
          'text-muted': '#5A4E80',
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.4s ease-out forwards',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}
