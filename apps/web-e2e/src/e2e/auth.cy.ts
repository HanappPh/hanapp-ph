/// <reference types="cypress" />

/**
 * Authentication E2E Test
 * Tests the OTP login flow using test credentials
 */
describe('Authentication Flow', () => {
  it('should login with OTP and logout user successfully', () => {
    cy.viewport(1280, 800);
    const testPhone = Cypress.env('TEST_PHONE_NUMBER');
    // const cleanedPhone = testPhone.replace(/^\+63/, ''); // Remove +63 prefix
    const invalidOtp = '000000'; // Invalid OTP
    const testOtp = Cypress.env('TEST_OTP');
    // Navigate directly to login page
    cy.visit('/auth/signin');
    cy.get('input[type="tel"]').type(testPhone);
    cy.contains('button', 'Send OTP').click();

    // Enter wrong OTP
    cy.get('input[aria-label^="Digit"]', { timeout: 20000 })
      .should('have.length', 6)
      .each(($el, index) => {
        cy.wrap($el).type(invalidOtp[index]);
      });
    cy.contains('button', 'Verify & Continue').click();

    // Should show error message
    cy.contains('Invalid or expired OTP', { timeout: 5000 });

    // Clear input
    cy.get('input[aria-label^="Digit"]', { timeout: 20000 })
      .should('have.length', 6)
      .each($el => {
        cy.wrap($el).clear();
      });
    // Enter correct OTP
    cy.get('input[aria-label^="Digit"]', { timeout: 20000 })
      .should('have.length', 6)
      .each(($el, index) => {
        cy.wrap($el).type(testOtp[index]);
      });
    cy.contains('button', 'Verify & Continue').click();

    // // Should redirect to signup page (first time login)
    // cy.url().should('include', '/auth/signin?mode=signup');

    // // Fill in signup form
    // cy.get('#lastName').type('User');
    // cy.get('#firstName').type('Test');
    // cy.get('#email').type('test@example.com');
    // // cy.get('#phoneNumber').type(cleanedPhone);

    // // Phone number should be placed already (from login)
    // cy.get('#phoneNumber').should('have.value', cleanedPhone);
    // // Should show that phone number is verified
    // cy.contains('Verified').should('be.visible');

    // // Select user type
    // cy.contains('button', 'offer jobs').click();

    // // Create Account
    // cy.contains('button', 'Create Account').click();

    // // Show error message (display name not entered)
    // cy.contains('Please fill in all required fields correctly').should(
    //   'be.visible'
    // );

    // // Enter display name
    // cy.get('#displayName').type('TestUser');
    // // Create Account again
    // cy.contains('button', 'Create Account').click();

    // // Show error message that email is not valid
    // cy.contains('Email address "test@example.com" is invalid').should(
    //   'be.visible'
    // );

    // cy.get('#email').clear();
    // cy.get('#email').type('test123@gmail.com');

    // // Create Account again
    // cy.contains('button', 'Create Account').click();

    // // Should be logged in after signup and redirected away from signin page
    // cy.url().should('not.include', '/auth/signin');

    // Should redirect to home page

    cy.url().should('not.include', '/auth/signin');

    // Open profile menu
    cy.get('button[aria-label="Profile"]', { timeout: 15000 }).click();
    cy.url().should('include', '/profile');
    // Click logout
    cy.intercept('POST', '/api/user/logout').as('logoutRequest');
    cy.contains('button', 'Logout').click();
    cy.wait('@logoutRequest');

    // Should be redirected to home page as guest user
    cy.url().should('eq', 'http://localhost:4200/');

    // Should be redirected to signin page when accessing protected pages
    cy.get('button[aria-label="Profile"]', { timeout: 15000 }).click();
    cy.url().should('include', '/auth/signin');
  });
});
