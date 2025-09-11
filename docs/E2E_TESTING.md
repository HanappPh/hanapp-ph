# E2E Testing Guide

## Overview

This project uses a professional E2E testing setup that ensures proper service orchestration and graceful handling of service availability.

## Architecture

### API E2E Tests (`apps/api-e2e`)

- **Global Setup**: Automatically starts API server if not running
- **Global Teardown**: Cleans up any started services
- **Smart Test Skipping**: Tests gracefully skip when services aren't available
- **Professional Error Handling**: Clear error messages and proper timeout handling

### Web E2E Tests (`apps/web-e2e`)

- **Cypress Integration**: Modern E2E testing with Cypress
- **Service Dependencies**: Properly configured to wait for web application
- **CI/CD Ready**: Handles headless execution in CI environments

## Running E2E Tests

### Local Development

```bash
# Run API E2E tests (recommended - handles service orchestration)
npm run e2e:api

# Run Web E2E tests
npm run e2e:web

# Run specific project E2E tests manually
npx nx run api-e2e:e2e --configuration=local
npx nx run web-e2e:e2e
```

### CI/CD Environment

```bash
# Run affected E2E tests (used in CI)
npm run e2e:affected

# Run specific configuration
npx nx run api-e2e:e2e --configuration=ci
```

## Configuration

### API E2E Configuration

- **Jest Configuration**: `apps/api-e2e/jest.config.ts`
- **Global Setup**: `apps/api-e2e/src/support/global-setup.ts`
- **Global Teardown**: `apps/api-e2e/src/support/global-teardown.ts`

### Environment Variables

- `API_BASE_URL`: Base URL for API tests (default: http://localhost:3001)
- `E2E_API_READY`: Set by global setup to indicate API availability
- `PORT`: API server port (default: 3001)
- `HOST`: API server host (default: localhost)

## Best Practices

### Writing E2E Tests

1. **Check Service Availability**: Tests should check if services are ready
2. **Proper Error Handling**: Use try-catch with meaningful error messages
3. **Timeouts**: Set appropriate timeouts for network requests
4. **Cleanup**: Ensure tests clean up any created resources

### Example Test Structure

```typescript
describe('API Feature', () => {
  const apiReady = process.env['E2E_API_READY'] === 'true';

  it('should test feature', async () => {
    if (!apiReady) {
      pending('API not available');
      return;
    }

    try {
      // Your test logic here
      const response = await axios.get('/api/endpoint', { timeout: 5000 });
      expect(response.status).toBe(200);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Test failed: ${error.message}`);
      }
      throw error;
    }
  });
});
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**: The setup will detect and use existing services
2. **Service Startup Timeout**: Increase timeout in global setup if needed
3. **CI/CD Failures**: E2E tests gracefully handle service unavailability

### Debug Mode

Run with verbose logging:

```bash
npx nx run api-e2e:e2e --configuration=local --verbose
```

### Checking Service Health

The setup includes health checks and will report service status:

- Service is ready
- Service timeout (tests may fail)
- Service startup failed (tests will be skipped)

## Integration with CI/CD

The E2E tests are designed to be CI/CD friendly:

- **Graceful Degradation**: Tests skip when services aren't available
- **Proper Exit Codes**: Non-zero exit only for actual test failures
- **Resource Cleanup**: Automatic cleanup prevents resource leaks
- **Parallel Execution**: Configured for optimal CI performance
