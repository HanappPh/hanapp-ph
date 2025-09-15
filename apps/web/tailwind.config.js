const rootConfig = require('../../tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...rootConfig,
  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    // Include the commons library components
    '../../libs/commons/src/**/*.{ts,tsx,js,jsx,html}',
    '!../../libs/commons/src/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
  ],
};
