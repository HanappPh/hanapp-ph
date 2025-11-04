# Testing Authentication

This document explains how to use the test mode OTP authentication for automated testing with Cypress.

## Test Mode Overview

To facilitate automated testing without requiring real SMS, the application supports a **test mode** for OTP authentication. When a specific test phone number is used, the system:

1. Uses a fixed, predictable OTP code
2. Skips sending SMS via Semaphore
3. Still validates the OTP flow normally

## Configuration

### Backend (.env)

Add these variables to your API's `.env` file:

```bash
TEST_PHONE_NUMBER=+639123456789
TEST_OTP=123456
```

- `TEST_PHONE_NUMBER`: The phone number that triggers test mode (should be in E.164 format with country code)
- `TEST_OTP`: The OTP code that will always work for the test phone number

### Cypress (cypress.env.json)

The Cypress tests use `apps/web-e2e/cypress.env.json`:

```json
{
  "TEST_PHONE_NUMBER": "+639123456789",
  "TEST_OTP": "123456",
  "API_URL": "http://localhost:3001"
}
```

## Usage in Cypress Tests

```typescript
// Get test credentials from environment
const testPhone = Cypress.env('TEST_PHONE_NUMBER');
const testOtp = Cypress.env('TEST_OTP');

// Use in your test
cy.get('input[type="tel"]').type(testPhone);
cy.contains('button', 'Send OTP').click();
cy.get('input[placeholder*="OTP"]').type(testOtp);
cy.contains('button', 'Verify OTP').click();
```

## Example Tests

See `apps/web-e2e/src/e2e/auth.cy.ts` for complete authentication test examples including:

- ✅ Login with OTP
- ✅ Signup with OTP
- ✅ Invalid OTP handling

## How It Works

In `apps/api/src/app/user/user.service.ts`:

```typescript
// Test mode: Use fixed OTP for testing
const testPhone = process.env.TEST_PHONE_NUMBER;
const testOtp = process.env.TEST_OTP || '123456';
const isTestMode =
  testPhone && normalizedPhone === this.normalizePhoneNumber(testPhone);

const otp = isTestMode ? testOtp : this.semaphoreService.generateOTP();

// Skip SMS sending in test mode
if (!isTestMode) {
  const smsResult = await this.semaphoreService.sendOTP(phone, otp);
  // ...
}
```

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never use test mode in production** - Only set `TEST_PHONE_NUMBER` in development/staging environments
2. **Use a fake phone number** - Don't use a real phone number that could belong to a user
3. **Rotate test credentials** - Change the test phone number periodically
4. **Environment-specific** - Keep test credentials out of version control (use `.env.local` or CI secrets)

## Running Tests

```bash
# Run Cypress tests
npx nx e2e web-e2e

# Run in headed mode to see the browser
npx nx e2e web-e2e --watch

# Run specific test file
npx cypress run --spec "apps/web-e2e/src/e2e/auth.cy.ts"
```

## CI/CD Integration

For GitHub Actions or other CI pipelines, set the environment variables as secrets:

```yaml
- name: Run E2E Tests
  env:
    TEST_PHONE_NUMBER: ${{ secrets.TEST_PHONE_NUMBER }}
    TEST_OTP: ${{ secrets.TEST_OTP }}
  run: npx nx e2e web-e2e
```

## Troubleshooting

### Test mode not activating

- Verify `TEST_PHONE_NUMBER` is set in `.env`
- Check that phone number format matches exactly (including country code)
- Ensure API server is restarted after changing `.env`

### OTP still being sent via SMS

- Confirm test phone number normalization matches
- Check logs for "Test Mode" indicator in OTP response
- Verify environment variables are loaded correctly

### Tests timing out

- Increase `defaultCommandTimeout` in `cypress.config.ts`
- Add explicit `cy.wait()` after OTP send
- Check that API is running and accessible

## Best Practices

1. **Use unique test data** - Create test users with unique emails to avoid conflicts
2. **Clean up after tests** - Consider adding database cleanup scripts
3. **Mock external services** - Test mode already mocks SMS, extend for other services
4. **Parallel testing** - Use different test phone numbers for parallel test runs
