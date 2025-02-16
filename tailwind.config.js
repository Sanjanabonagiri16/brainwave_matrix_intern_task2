/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF3B30',
          50: '#FFF5F5',
          100: '#FFE9E8',
          200: '#FFD3D1',
          300: '#FF9D97',
          400: '#FF6B63',
          500: '#FF3B30',
          600: '#FF1408',
          700: '#D60800',
          800: '#A30600',
          900: '#700400',
        },
        secondary: {
          DEFAULT: '#FF9500',
          50: '#FFF9F0',
          100: '#FFF3E0',
          200: '#FFE7C2',
          300: '#FFCB85',
          400: '#FFAF47',
          500: '#FF9500',
          600: '#D67E00',
          700: '#A36100',
          800: '#704300',
          900: '#3D2400',
        },
        success: {
          DEFAULT: '#32D74B',
          50: '#F0FDF4',
          100: '#E0FBE4',
          200: '#C2F7C9',
          300: '#85EF94',
          400: '#47E35C',
          500: '#32D74B',
          600: '#28B53E',
          700: '#1F8C30',
          800: '#166123',
          900: '#0D3615',
        },
        error: {
          DEFAULT: '#FF2D55',
          50: '#FFF5F7',
          100: '#FFE9EE',
          200: '#FFD3DD',
          300: '#FF9DB2',
          400: '#FF6787',
          500: '#FF2D55',
          600: '#FF0533',
          700: '#D60029',
          800: '#A3001F',
          900: '#700015',
        },
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#555555',
          600: '#424242',
          700: '#303030',
          800: '#1F1F1F',
          900: '#121212',
        },
        background: {
          light: '#FFFFFF',
          dark: '#121212',
        },
      },
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
        heading: ['Cormorant Garamond', ...defaultTheme.fontFamily.sans],
        mono: ['Source Code Pro', ...defaultTheme.fontFamily.mono],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.600'),
              },
            },
            h1: {
              fontFamily: theme('fontFamily.heading').join(', '),
              color: theme('colors.gray.800'),
            },
            h2: {
              fontFamily: theme('fontFamily.heading').join(', '),
              color: theme('colors.gray.800'),
            },
            h3: {
              fontFamily: theme('fontFamily.heading').join(', '),
              color: theme('colors.gray.800'),
            },
            h4: {
              fontFamily: theme('fontFamily.heading').join(', '),
              color: theme('colors.gray.800'),
            },
            code: {
              fontFamily: theme('fontFamily.mono').join(', '),
              backgroundColor: theme('colors.gray.100'),
              padding: '0.25rem',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },
            h1: {
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            h3: {
              color: theme('colors.gray.100'),
            },
            h4: {
              color: theme('colors.gray.100'),
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 