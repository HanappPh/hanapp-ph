import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';
import * as http from 'http';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'npx nx run web:serve',
      },
      // CI configuration - don't auto-start server, we handle it externally
      ciWebServerCommand: undefined,
      ciBaseUrl: 'http://localhost:3000',
    }),
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    setupNodeEvents(on, config) {
      // Professional CI setup: Health checks and graceful error handling
      on('task', {
        checkServerHealth() {
          return new Promise(resolve => {
            const req = http.request(
              {
                hostname: 'localhost',
                port: 3000,
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

      return config;
    },
  },
});
