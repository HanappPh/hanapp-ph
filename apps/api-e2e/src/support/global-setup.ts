import { spawn, ChildProcess } from 'child_process';
import * as http from 'http';
import { join } from 'path';

/* eslint-disable */
var __TEARDOWN_MESSAGE__: string;

interface GlobalTestContext {
  apiProcess?: ChildProcess;
  apiReady: boolean;
}

declare global {
  var __GLOBAL_TEST_CONTEXT__: GlobalTestContext;
}

// Check if port is available
async function isPortAvailable(
  port: number,
  host: string = 'localhost'
): Promise<boolean> {
  return new Promise(resolve => {
    const req = http.request(
      { host, port, method: 'GET', path: '/api' },
      res => {
        resolve(res.statusCode === 200);
      }
    );
    req.on('error', () => resolve(false));
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

// Start API server for testing
async function startApiServer(port: number): Promise<ChildProcess | null> {
  return new Promise(resolve => {
    console.log('Starting API server for E2E tests...');

    // Ensure we're using the correct workspace root path
    const workspaceRoot = process.cwd().includes('apps')
      ? join(process.cwd(), '..', '..')
      : process.cwd();
    const apiPath = join(workspaceRoot, 'dist', 'apps', 'api', 'main.js');
    const apiProcess = spawn('node', [apiPath], {
      env: { ...process.env, PORT: port.toString(), NODE_ENV: 'test' },
      stdio: ['pipe', 'pipe', 'pipe'],
      detached: false,
    });

    let resolved = false;

    // Handle process output
    apiProcess.stdout?.on('data', data => {
      const output = data.toString();
      if (
        output.includes('Listening at') ||
        output.includes('Server running')
      ) {
        if (!resolved) {
          resolved = true;
          console.log('API server started successfully');
          resolve(apiProcess);
        }
      }
    });

    apiProcess.stderr?.on('data', data => {
      console.error('API Error:', data.toString());
    });

    apiProcess.on('error', error => {
      console.error('Failed to start API:', error);
      if (!resolved) {
        resolved = true;
        resolve(null);
      }
    });

    apiProcess.on('exit', code => {
      console.log(`API process exited with code ${code}`);
    });

    // Timeout after 10 seconds
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        console.warn('WARNING: API server startup timeout');
        resolve(apiProcess); // Return process anyway, might still work
      }
    }, 10000);
  });
}

module.exports = async function () {
  console.log('\nSetting up E2E test environment...\n');

  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ? Number(process.env.PORT) : 3001;

  // Initialize global context
  globalThis.__GLOBAL_TEST_CONTEXT__ = {
    apiReady: false,
  };

  // Check if API is already running
  if (await isPortAvailable(port, host)) {
    console.log('API is already running');
    globalThis.__GLOBAL_TEST_CONTEXT__.apiReady = true;
  } else {
    console.log('API not running. E2E tests will be skipped.');
    globalThis.__GLOBAL_TEST_CONTEXT__.apiReady = false;
  }

  // Set environment variable for tests
  process.env.API_BASE_URL = `http://${host}:${port}`;
  process.env.E2E_API_READY =
    globalThis.__GLOBAL_TEST_CONTEXT__.apiReady.toString();

  globalThis.__TEARDOWN_MESSAGE__ = '\nCleaning up E2E test environment...\n';
};
