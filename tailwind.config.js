/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta cálida tierra y marfil
        warm: {
          50: '#fdfcfb',    // marfil muy claro
          100: '#f8f5f0',   // marfil
          200: '#f0e6d2',   // beige claro
          300: '#e8d5b7',   // beige
          400: '#d4b896',   // arena
          500: '#c4986a',   // tierra clara
          600: '#a67c52',   // tierra media
          700: '#8b5a3c',   // tierra oscura
          800: '#704732',   // marrón
          900: '#5c3a2a',   // marrón oscuro
        },
        earth: {
          50: '#f9f7f4',
          100: '#f3ede3',
          200: '#e6d6c1',
          300: '#d9bf9f',
          400: '#cc9f73',
          500: '#b8824c',   // color principal tierra
          600: '#9d6d3f',
          700: '#7f5632',
          800: '#654429',
          900: '#4a3220',
        },
        accent: {
          50: '#fef7f0',
          100: '#fdeee1',
          200: '#fbd5b5',
          500: '#f4a261',   // terracota suave
          600: '#e76f51',   // terracota
          700: '#d55e3a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}