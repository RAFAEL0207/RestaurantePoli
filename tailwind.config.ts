import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'
import { lightTheme } from './src/config/theme';

const config: Config = {
  content: [
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        'sm': '0 3px 10px rgba(107, 125, 233, 0.1)',
        'md': '0 5px 10px rgba(107, 125, 233, 0.1)',
        'xl': '0 10px 20px -15px rgba(107, 125, 233, 0.9)',
      },
      colors: {
        'primary-soft': '#f1f4fb'
      }
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {

            radius: {
              small: '5px',
              medium: '5px',
              large: '5px',
            }

          },
          colors: {
            background: '#f1f4fb',
            primary: {
              DEFAULT: "#dd5502",
              '50': '#fff8eb',
              '100': '#ffebc6',
              '200': '#ffd488',
              '300': '#ffb33d',
              '400': '#ff9e20',
              '500': '#f97907',
              '600': '#dd5502',
              '700': '#b73706',
              '800': '#942a0c',
              '900': '#7a240d',
          }
            // primary: {
            //   '50': '#f7f7f6',
            //   '100': '#e5e4e2',
            //   '200': '#cbc8c4',
            //   '300': '#a9a69f',
            //   '400': '#86847b',
            //   '500': '#6b6961',
            //   '600': '#55534c',
            //   '700': '#46443f',
            //   '800': '#3a3935',
            //   '900': '#32322f',
            // },
            // secondary: {
            //   '50': '#fdf9ed',
            //   '100': '#f7ecce',
            //   '200': '#efd798',
            //   '300': '#e7be62',
            //   '400': '#e1a83e',
            //   '500': '#d98926',
            //   '600': '#c0691f',
            //   '700': '#a04c1d',
            //   '800': '#823c1e',
            //   '900': '#6c321b',

            // },
          }
        }
      }
    }),
  ],
}
export default config
