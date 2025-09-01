/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Champagne Gold - Luxury brand color
        champagne: {
          50: '#fefcf7',
          100: '#fdf8e8',
          200: '#fbf0d1',
          300: '#f8e4a8',
          400: '#f4d375',
          500: '#D4AF37', // Primary champagne gold
          600: '#B8941F',
          700: '#9A7A1A',
          800: '#7D6118',
          900: '#67501A',
        },
        // Platinum accents
        platinum: {
          50: '#fefefe',
          100: '#fdfdfd',
          200: '#fafafa',
          300: '#f5f5f5',
          400: '#E5E4E2', // Primary platinum
          500: '#d1d0ce',
          600: '#b8b7b5',
          700: '#9a9997',
          800: '#7c7b79',
          900: '#666564',
        },
        // Deep charcoal to black gradient
        charcoal: {
          50: '#f8f8f8',
          100: '#e8e8e8',
          200: '#d1d1d1',
          300: '#b4b4b4',
          400: '#8a8a8a',
          500: '#636363',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#1a1a1a', // Deep charcoal
        },
        // Legacy colors for compatibility
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        dark: {
          50: '#18181b',
          100: '#27272a',
          200: '#3f3f46',
          300: '#52525b',
          400: '#71717a',
          500: '#a1a1aa',
          600: '#d4d4d8',
          700: '#e4e4e7',
          800: '#f4f4f5',
          900: '#fafafa',
        },
        success: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
        },
        error: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
        info: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
      },
      fontFamily: {
        sans: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Playfair Display', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',

        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },

        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow-champagne': '0 0 20px rgba(212, 175, 55, 0.3)',
        'glow-champagne-strong': '0 0 30px rgba(212, 175, 55, 0.5)',
        'luxury-sm': '0 2px 8px rgba(0, 0, 0, 0.12)',
        'luxury-md': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'luxury-lg': '0 16px 64px rgba(0, 0, 0, 0.24)',
        'luxury-xl': '0 24px 96px rgba(0, 0, 0, 0.36)',
        'champagne-sm': '0 2px 8px rgba(212, 175, 55, 0.12)',
        'champagne-md': '0 8px 32px rgba(212, 175, 55, 0.12)',
        'champagne-lg': '0 16px 64px rgba(212, 175, 55, 0.24)',
        'champagne-xl': '0 24px 96px rgba(212, 175, 55, 0.36)',
        // Legacy shadows for compatibility
        'glow-gold': '0 0 20px rgba(245, 158, 11, 0.3)',
        'glow-gold-strong': '0 0 30px rgba(245, 158, 11, 0.5)',
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        'dark-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gradient-champagne': 'linear-gradient(135deg, #D4AF37, #B8941F)',
        'gradient-charcoal': 'linear-gradient(135deg, #1a1a1a, #000000)',
        'gradient-luxury': 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
        // Legacy gradients for compatibility
        'gradient-gold': 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)',
        'gradient-dark': 'linear-gradient(135deg, #27272a, #3f3f46)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      letterSpacing: {
        'wider': '0.05em',
        'widest': '0.1em',
      },
      backdropBlur: {
        'luxury': '12px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
