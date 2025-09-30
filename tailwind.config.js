/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Coolvetica', 'sans-serif'],
        'subtext': ['Coolvetica', 'sans-serif'],
      },
      colors: {
        'black': '#000000',
        'blue-purple': '#3533cd',
        'navy': '#1a1a2e',
        'midnight': '#16213e',
        'deep-blue': '#0f3460',
        'accent-blue': '#64b5f6',
        'accent-blue-light': '#42a5f5',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}