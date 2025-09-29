/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta personalizada LaNik usando nuevas variables CSS
        'lanik': {
          'beige': 'var(--color1)',     // #F5E6D3 - Beige cálido
          'terracota': 'var(--color2)', // #D9826C - Terracota
          'oliva': 'var(--color3)',     // #A2B29F - Verde oliva
          'crema': 'var(--color4)',     // #FFF4E1 - Crema
          'mostaza': 'var(--color5)',   // #E0B761 - Mostaza
        },
        // Mantener algunos colores de Tailwind para compatibilidad
        white: '#ffffff',
        black: '#000000',
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}