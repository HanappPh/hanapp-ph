import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';
import * as http from 'http';

// Register custom tsconfig for CI environments
// This addresses the TS5098 error with customConditions
process.env.TS_NODE_PROJECT = './apps/web-e2e/tsconfig.cypress.json';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'npx nx run @hanapp-ph/web:serve',
      },
      // CI configuration - don't auto-start server, we handle it externally
      ciWebServerCommand: undefined,
      ciBaseUrl: 'http://localhost:4200',
    }),
    baseUrl: 'http://localhost:4200',
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    env: {
      // Inject Supabase environment variables for Cypress tests
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      // Test credentials
      TEST_PHONE_NUMBER: '+639123456789',
      TEST_PHONE_NUMBER_2: '+639987654321',
      TEST_OTP: '123456',
    },
    setupNodeEvents(on, config) {
      // Professional CI setup: Health checks and graceful error handling
      on('task', {
        checkServerHealth() {
          return new Promise(resolve => {
            const req = http.request(
              {
                hostname: 'localhost',
                port: 4200,
                path: '/',
                method: 'GET',
                timeout: 5000,
              },
              res => {
                resolve(res.statusCode === 200);
              }
            );

            req.on('error', () => resolve(false));
            req.on('timeout', () => {
              req.destroy();
              resolve(false);
            });
            req.end();
          });
        },
        log(message: string) {
          console.log(`[Web E2E]: ${message}`);
          return null;
        },
      });

      // Professional logging for CI environments
      on('before:run', async () => {
        if (process.env.CI) {
          console.log('Running in CI environment - using production build...');
        }
      });

      // Make sure Supabase env vars are available in config
      config.env = {
        ...config.env,
        NEXT_PUBLIC_SUPABASE_URL: config.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: config.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        TEST_PHONE_NUMBER: config.env.TEST_PHONE_NUMBER,
        TEST_PHONE_NUMBER_2: config.env.TEST_PHONE_NUMBER_2,
        TEST_OTP: config.env.TEST_OTP,
      };

      return config;
    },
  },
});
