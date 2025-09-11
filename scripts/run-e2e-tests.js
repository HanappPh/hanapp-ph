#!/usr/bin/env node

/**
 * Professional E2E Test Runner
 *
 * This script ensures proper service orchestration for E2E tests:
 * 1. Builds the API if needed
 * 2. Starts the API server
 * 3. Runs E2E tests
 * 4. Cleans up services
 */

const { spawn } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
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
        resolve(code);
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on('error', reject);
  });
}

async function main() {
  try {
    log('\nProfessional E2E Test Runner\n', colors.bright + colors.blue);

    // Step 1: Build API
    log('Building API...', colors.yellow);
    await runCommand('npx', ['nx', 'build', 'api']);
    log('API built successfully\n', colors.green);

    // Step 2: Run E2E tests (setup will handle API server)
    log('Running E2E tests...', colors.yellow);
    await runCommand('npx', [
      'nx',
      'run',
      'api-e2e:e2e',
      '--configuration=local',
    ]);
    log('E2E tests completed successfully\n', colors.green);

    log('All E2E tests passed!', colors.bright + colors.green);
    process.exit(0);
  } catch (error) {
    log(`E2E tests failed: ${error.message}`, colors.red);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
