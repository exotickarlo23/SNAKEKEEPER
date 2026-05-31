/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        reptile: {
          50:  '#eaf4ec',
          100: '#cde4d2',
          200: '#9dc9a8',
          300: '#6caf7e',
          400: '#3f9558',
          500: '#27773d',
          600: '#1d5d2f',
          700: '#164824',
          800: '#0f3219',
          900: '#0a2113',
          950: '#06140b',
        },
        accent: {
          DEFAULT: '#f59e0b',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        scale: {
          DEFAULT: '#1a2f1f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(245, 158, 11, 0.4), 0 8px 24px -8px rgba(245, 158, 11, 0.35)',
      },
    },
  },
  plugins: [],
}
