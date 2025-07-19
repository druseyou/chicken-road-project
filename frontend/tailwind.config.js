/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'JetBrains Mono', 'Consolas', 'monospace'],
      },
      colors: {
        // Використовуємо CSS змінні з tokens.css
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        casino: {
          red: 'var(--color-casino-red)',
          gold: 'var(--color-casino-gold)',
          green: 'var(--color-casino-green)',
          purple: 'var(--color-casino-purple)',
          orange: 'var(--color-casino-orange)',
          emerald: 'var(--color-casino-emerald)',
          ruby: 'var(--color-casino-ruby)',
          royal: 'var(--color-casino-royal)',
          premium: 'var(--color-casino-premium)',
          platinum: 'var(--color-casino-platinum)',
          diamond: 'var(--color-casino-diamond)',
        },
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}; 