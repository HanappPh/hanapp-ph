const nextJest = require('next/jest.js');
const { join } = require('path');

// Ensure we're pointing to the correct directory for Next.js configuration
// In CI, the working directory is the workspace root, so we need to point to apps/web
// Locally, __dirname points to the correct directory
const webDir = process.env.CI ? join(process.cwd(), 'apps', 'web') : __dirname;

const createJestConfig = nextJest({
  dir: webDir,
});

const config = {
  displayName: '@hanapp-ph/web',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/web',
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(config);
