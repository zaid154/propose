/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Italianno"', 'cursive'],
        body: ['"Manrope"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        eyebrow: ['"Cormorant SC"', '"Cormorant Garamond"', 'serif'],
      },
    },
  },
}
