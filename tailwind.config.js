/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        accent:  ['"Cormorant Garamond"', 'serif'],
      },
      colors: {
        gold: {
          50:  '#fdf9ec', 100: '#f9eecc', 200: '#f3d98a',
          300: '#ecbd4a', 400: '#e4a420', 500: '#c98810',
          600: '#a56a0d', 700: '#7a4e10', 800: '#653f13', 900: '#573516',
        },
        ink: {
          900: '#0a0705', 800: '#1a1310', 700: '#2d2018', 600: '#3d2d22',
        },
        // Light theme palette
        cream: {
          50:  '#fdfaf4', 100: '#fdf5e6', 200: '#f9e8c8',
          300: '#f2d49a', 400: '#e8bc62', 500: '#d9a230',
        },
      },
      spacing: {
        18: '4.5rem', 22: '5.5rem', 26: '6.5rem',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'gold-sm': '0 2px 12px rgba(201,136,16,0.15)',
        'gold':    '0 4px 24px rgba(201,136,16,0.25)',
        'gold-lg': '0 8px 48px rgba(201,136,16,0.35)',
        'card':    '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.10)',
      },
      animation: {
        'float':   'float 5s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        float:    { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        shimmer:  { '0%': { backgroundPosition: '0% center' }, '100%': { backgroundPosition: '200% center' } },
        fadeUp:   { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulseGold:{ '0%,100%': { boxShadow: '0 0 0 0 rgba(201,136,16,0.4)' }, '50%': { boxShadow: '0 0 0 8px rgba(201,136,16,0)' } },
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
}
