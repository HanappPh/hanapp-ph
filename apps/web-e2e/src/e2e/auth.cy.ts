/// <reference types="cypress" />

/**
 * Authentication E2E Test
 * Tests the OTP login flow using test credentials
 */
describe('Authentication Flow', () => {
  it('should login successfully with test OTP', () => {
    // Get test credentials from environment variables
    const testPhone = Cypress.env('TEST_PHONE_NUMBER');
    const testOtp = Cypress.env('TEST_OTP');

    cy.log('Test Phone:', testPhone);
    cy.log('Test OTP:', testOtp);

    // Navigate directly to login page (since app uses middleware-based auth)
    cy.visit('/auth/signin');
    cy.url().should('include', '/auth/signin');

    // Enter phone number
    cy.get('input[type="tel"]').type(testPhone);
    cy.contains('button', 'Send OTP').click();

    // Wait for OTP to be sent (should be instant in test mode)
    cy.contains('OTP sent successfully', { timeout: 5000 });

    // Enter OTP
    cy.get('input[placeholder*="OTP"]').type(testOtp);
    cy.contains('button', 'Verify OTP').click();

    // Should redirect to dashboard or home after successful login
    cy.url().should('not.include', '/login');

    // Verify user is logged in (adjust selector based on your UI)
    cy.contains('Profile', { timeout: 10000 }).should('exist');
  });

  it('should show error for invalid OTP', () => {
    const testPhone = Cypress.env('TEST_PHONE_NUMBER');

    // Navigate directly to login page
    cy.visit('/auth/signin');
    cy.get('input[type="tel"]').type(testPhone);
    cy.contains('button', 'Send OTP').click();

    // Enter wrong OTP
    cy.get('input[placeholder*="OTP"]').type('000000');
    cy.contains('button', 'Verify OTP').click();

    // Should show error message
    cy.contains('Invalid or expired OTP', { timeout: 5000 });
  });

  it('should allow signup with test phone number', () => {
    const testPhone = Cypress.env('TEST_PHONE_NUMBER');
    const testOtp = Cypress.env('TEST_OTP');

    // Navigate directly to signup page (mode=signup query parameter)
    cy.visit('/auth/signin?mode=signup');
    cy.url().should('include', '/auth/signin');

    // Fill in signup form
    cy.get('input[name="fullName"]').type('Test User');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="tel"]').type(testPhone);

    // Select user type (adjust based on your UI)
    cy.get('select[name="userType"]').select('client');

    // Send OTP
    cy.contains('button', 'Send OTP').click();
    cy.contains('OTP sent successfully', { timeout: 5000 });

    // Enter OTP and submit
    cy.get('input[placeholder*="OTP"]').type(testOtp);
    cy.contains('button', 'Sign Up').click();

    // Should be logged in after signup and redirected away from signin page
    cy.url().should('not.include', '/auth/signin');
  });
});
