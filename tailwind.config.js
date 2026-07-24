/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sumi: {
          50: '#f6f5f3',
          100: '#e8e6e1',
          200: '#cfcabf',
          300: '#a8a092',
          400: '#7a7160',
          500: '#5a5246',
          600: '#3e3830',
          700: '#2a2620',
          800: '#1a1814',
          900: '#0d0c0a',
          950: '#070605',
        },
        shu: {
          50: '#fef2f2',
          100: '#fde3e2',
          200: '#fbccca',
          300: '#f7a8a4',
          400: '#f0746e',
          500: '#e04b43',
          600: '#c8312a',
          700: '#a52420',
          800: '#84201d',
          900: '#6b1d1b',
          950: '#3a0c0b',
        },
        kin: {
          50: '#fdfbf3',
          100: '#faf2d7',
          200: '#f4e3a8',
          300: '#edcd72',
          400: '#e6b347',
          500: '#d99a2b',
          600: '#bc7a20',
          700: '#95591d',
          800: '#7c481f',
          900: '#683d1e',
          950: '#3b2010',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Noto Sans JP"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
};
