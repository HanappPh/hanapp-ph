#!/usr/bin/env node

/**
 * Professional Landing E2E Test Runner
 * Handles landing server startup and graceful test execution for CI/CD environments
 */

const { spawn } = require('child_process');
const http = require('http');

// Color codes for professional logging
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = colors.reset) {
  // eslint-disable-next-line no-console
  console.log(`${color}${message}${colors.reset}`);
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options,
    });

    child.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on('error', reject);
  });
}

function checkServerHealth(url, maxRetries = 30) {
  return new Promise((resolve, reject) => {
    let retries = 0;

    const check = () => {
      http
        .get(url, res => {
          if (res.statusCode === 200) {
            resolve();
          } else {
            retry();
          }
        })
        .on('error', retry);
    };

    const retry = () => {
      retries++;
      if (retries > maxRetries) {
        reject(new Error(`Server not healthy after ${maxRetries} attempts`));
        return;
      }
      setTimeout(check, 1000);
    };

    check();
  });
}

async function main() {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  let serverProcess = null;

  try {
    log('🚀 Starting Landing E2E Test Suite', colors.bright);

    if (isDevelopment) {
      log('📦 Building landing application...', colors.blue);
      await runCommand('npx', ['nx', 'build', 'landing']);

      log('🔧 Starting landing server...', colors.yellow);
      serverProcess = spawn('npx', ['nx', 'start', 'landing'], {
        stdio: 'pipe',
        shell: true,
      });

      // Wait for server to be ready
      log('⏳ Waiting for server to be ready...', colors.yellow);
      await checkServerHealth('http://localhost:3002');
      log('✅ Landing server is ready!', colors.green);
    }

    log('🧪 Running E2E tests...', colors.blue);
    await runCommand('npx', ['nx', 'e2e', 'landing-e2e', '--configuration=ci']);

    log('✅ All tests passed successfully!', colors.green);
  } catch (error) {
    log(`❌ Tests failed: ${error.message}`, colors.red);
    process.exit(1);
  } finally {
    if (serverProcess) {
      log('🔄 Cleaning up server process...', colors.yellow);
      serverProcess.kill('SIGTERM');

      // Force kill if still running after 5 seconds
      setTimeout(() => {
        if (!serverProcess.killed) {
          serverProcess.kill('SIGKILL');
        }
      }, 5000);
    }
  }
}

// Handle process termination gracefully
process.on('SIGINT', () => {
  log('🛑 Received SIGINT, cleaning up...', colors.yellow);
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('🛑 Received SIGTERM, cleaning up...', colors.yellow);
  process.exit(0);
});

if (require.main === module) {
  main().catch(error => {
    log(`💥 Unexpected error: ${error.message}`, colors.red);
    process.exit(1);
  });
}
