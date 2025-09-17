import type { Config } from 'jest';
import nextJest from 'next/jest.js';

// Ensure we're pointing to the correct directory for Next.js configuration
const createJestConfig = nextJest({
  dir: process.env.CI ? process.cwd() + '/apps/web' : __dirname,
});

const config: Config = {
  displayName: '@hanapp-ph/web',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/web',
  testEnvironment: 'jsdom',
};

export default createJestConfig(config);
