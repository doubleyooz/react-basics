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
          '50': '#f1f3fd',
          '100': '#dfe5fa',
          '200': '#c6d1f7',
          '300': '#9fb3f1',
          '400': '#718ce9',
          '500': '#5066e1',
          '600': '#404dd6', // default
          '700': '#3237c3',
          '800': '#2e2f9f',
          '900': '#2a2d7e',
          '950': '#1e1e4d',
        },

        secondary: {
          '50': '#f5f8fe', // default
          '100': '#dee7fb',
          '200': '#c5d7f8',
          '300': '#9dbdf3',
          '400': '#6e99ec',
          '500': '#4c76e5',
          '600': '#3759d9',
          '700': '#2e46c7',
          '800': '#2b3ba2',
          '900': '#283680',
          '950': '#1d234e',
        },

        dark: {
          '50': '#f6f8f9',
          '100': '#eceff2',
          '200': '#d5dce2',
          '300': '#b0bdc9',
          '400': '#849aac',
          '500': '#657d92',
          '600': '#506579',
          '700': '#425262',
          '800': '#394653',
          '900': '#333d47',
          '950': '#171b20', // default
        },
      },
    },
  },
  plugins: [],
};
export default config;
