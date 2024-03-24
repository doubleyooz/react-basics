import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          default: '#404dd6',
          hover: '#283085',
        },
        secondary: {
          default: '#F5F8FE',
          hover: '#aaadb3',
        },

        dark: '#171B20',
      },
    },
  },
  plugins: [],
};
export default config;
