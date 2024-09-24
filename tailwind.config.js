/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        default: 'var(--color-text-default)'
      },
      fontFamily: {
        sans: [
          'var(--font-sans, ui-sans-serif)',
          ...defaultTheme.fontFamily.sans
        ],
        serif: [
          'var(--font-serif, ui-serif)',
          ...defaultTheme.fontFamily.serif
        ],
        heading: [
          'var(--font-heading, ui-sans-serif)',
          ...defaultTheme.fontFamily.sans
        ]
      },
      gridTemplateColumns: {
        'auto-fit-200px': 'repeat(auto-fit, minmax(200px, 1fr))'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
