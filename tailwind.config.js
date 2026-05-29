/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wine: '#3B0A18',
        burgundy: '#5C0E2E',
        bordeaux: '#7A1232',
        ivory: '#F7EFE3',
        champagne: '#E9D8B4',
        roseGold: '#B76E79',
        roseGoldLight: '#D89AA3',
        candle: '#FFB178',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Italianno"', 'cursive'],
        body: ['"Manrope"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        eyebrow: ['"Cormorant SC"', '"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        soft: '0 18px 50px rgba(0, 0, 0, 0.35)',
        glow: '0 0 0 1px rgba(233, 216, 180, 0.20), 0 20px 60px rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'wine-gradient':
          'radial-gradient(1200px 700px at 15% 10%, rgba(255, 177, 120, 0.12), rgba(0,0,0,0) 55%), radial-gradient(1100px 700px at 85% 80%, rgba(183, 110, 121, 0.18), rgba(0,0,0,0) 60%), linear-gradient(180deg, #3B0A18 0%, #2A0711 100%)',
      },
    },
  },
}

