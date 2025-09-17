import type { Config } from 'jest';
import nextJest from 'next/jest.js';
import { join } from 'path';

// Ensure we're pointing to the correct directory for Next.js configuration
// In CI, the working directory is the workspace root, so we need to point to apps/web
// Locally, __dirname points to the correct directory
const webDir = process.env.CI ? join(process.cwd(), 'apps', 'web') : __dirname;

const createJestConfig = nextJest({
  dir: webDir,
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
