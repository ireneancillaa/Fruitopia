import { defineConfig } from 'tailwindcss'

export default defineConfig({
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        'sm': '3rem'
      }
    },
    extend: {
      colors: {
        primary: 'rgb(0, 126, 110)',
        secondary: 'rgb(115, 175, 111)'
      },
      fontFamily: {
        custom: ['regular', 'medium', 'bold'],
      },
    },
  },
  safelist: [
    'text-primary',
    'hover:text-primary',
    'text-secondary',
    'hover:text-secondary',
    'bg-primary',
    'hover:bg-primary',
  ],
  plugins: [],
})
