/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'ui-monospace',
  				'JetBrains Mono',
  				'Consolas',
  				'monospace'
  			]
  		},
  		colors: {
  			primary: {
  				'50': 'var(--color-primary-50)',
  				'100': 'var(--color-primary-100)',
  				'200': 'var(--color-primary-200)',
  				'300': 'var(--color-primary-300)',
  				'400': 'var(--color-primary-400)',
  				'500': 'var(--color-primary-500)',
  				'600': 'var(--color-primary-600)',
  				'700': 'var(--color-primary-700)',
  				'800': 'var(--color-primary-800)',
  				'900': 'var(--color-primary-900)',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
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
  				diamond: 'var(--color-casino-diamond)'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		animation: {
  			shimmer: 'shimmer 2s infinite'
  		},
  		keyframes: {
  			shimmer: {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}; 