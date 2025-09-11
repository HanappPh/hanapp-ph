/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../libs/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [require('../../libs/ui/tailwind.config.js')],
};
