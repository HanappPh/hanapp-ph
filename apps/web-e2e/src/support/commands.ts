/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Type declarations for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Login with email/password
       */
      login(email: string, password: string): Chainable<void>;

      /**
       * Login with OTP
       */
      loginWithOTP(
        phoneNumber: string,
        otp: string,
        userType?: 'client' | 'provider'
      ): Chainable<void>;

      /**
       * Logout command
       */
      logout(): Chainable<void>;
    }
  }
}

// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  // Custom login implementation would go here
  // For now, this is a placeholder for future authentication flows
  cy.log(`Login attempt for user: ${email}`);
});

/**
 * Login with OTP command
 * @param phoneNumber - The phone number to use for login
 * @param otp - The OTP code (6 digits)
 * @param userType - Optional: 'client' or 'provider' (defaults to client)
 */
Cypress.Commands.add(
  'loginWithOTP',
  (phoneNumber, otp, userType = 'client') => {
    cy.log(`Logging in as ${userType} with phone: ${phoneNumber}`);

    // Intercept the OTP request for debugging
    cy.intercept('POST', '**/api/user/send-otp*').as('sendOTP');

    // Visit signin page with login mode explicitly
    cy.visit('/auth/signin?mode=login');
    cy.url().should('include', '/auth/signin');
    cy.get('body').should('be.visible');

    // Clean phone number - remove +63 prefix and non-digits
    let cleanPhone = phoneNumber.replace(/^\+63/, '').replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = cleanPhone.substring(1); // Remove leading 0 if present
    }

    cy.log(
      `Original: ${phoneNumber} → Cleaned: ${cleanPhone} → Final: +63${cleanPhone}`
    );

    // Enter phone number (UI will add +63 prefix automatically)
    cy.get('input[type="tel"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(cleanPhone);

    // Verify the phone number was entered
    cy.get('input[type="tel"]').should('have.value', cleanPhone);

    // Click send OTP button
    cy.contains('button', 'Send OTP', { timeout: 10000 })
      .should('be.visible')
      .should('not.be.disabled')
      .click();

    // Wait for OTP API call
    cy.wait('@sendOTP', { timeout: 15000 }).then(interception => {
      cy.log('OTP API Status: ' + interception.response?.statusCode);
      if (
        interception.response?.statusCode !== 200 &&
        interception.response?.statusCode !== 201
      ) {
        cy.log(
          '⚠️ OTP API failed: ' + JSON.stringify(interception.response?.body)
        );
        cy.screenshot('otp-api-error');
      }
    });

    // Wait for OTP screen - look for "We sent a 6-digit code to" message
    cy.contains('We sent a 6-digit code to', { timeout: 20000 }).should(
      'be.visible'
    );
    cy.log('OTP screen appeared');

    // Enter OTP in 6 separate digit boxes
    const otpDigits = otp.split('');
    otpDigits.forEach((digit, index) => {
      cy.get(`input[aria-label="Digit ${index + 1} of 6"]`, { timeout: 10000 })
        .should('be.visible')
        .type(digit);
    });

    cy.log('Entered all OTP digits');

    // Click verify button
    cy.contains('button', /Verify & Continue|Verify/i, { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.log('Clicked verify button');

    // Wait for redirect away from signin
    cy.url({ timeout: 20000 }).should('not.include', '/auth/signin');

    // Check if redirected to signup (new user needs to complete registration)
    cy.url({ timeout: 5000 }).then(url => {
      if (url.includes('/auth/signup') || url.includes('mode=signup')) {
        cy.log('New user detected - completing signup form');

        // Fill signup form
        cy.get('input[placeholder*="First name"]', { timeout: 10000 })
          .should('be.visible')
          .clear()
          .type(userType === 'client' ? 'Test' : 'Provider');

        cy.get('input[placeholder*="Last name"]')
          .should('be.visible')
          .clear()
          .type(userType === 'client' ? 'Client' : 'User');

        cy.get('input[type="email"]')
          .should('be.visible')
          .clear()
          .type(`test.${userType}.${Date.now()}@hanapp.test`);

        // Phone should be pre-filled from OTP verification
        cy.log('Phone number should be pre-filled from OTP');

        // Select user type (client or provider)
        if (userType === 'provider') {
          cy.contains('I want to Provide Services', { timeout: 10000 })
            .should('be.visible')
            .click();
        } else {
          cy.contains('I want to Offer Jobs', { timeout: 10000 })
            .should('be.visible')
            .click();
        }

        // Click Create Account button
        cy.contains('button', /Create Account/i, { timeout: 10000 })
          .should('be.visible')
          .click();

        // Wait for signup to complete and redirect
        cy.url({ timeout: 20000 }).should('not.include', 'mode=signup');

        // Wait for session to be established after signup
        cy.wait(3000); // Give time for Supabase session to be created
        cy.log('Signup completed, session established');
      }
    });

    // Verify NOT on signup page anymore
    cy.url().should('not.include', 'mode=signup');

    // Wait for authentication session to be fully established
    cy.wait(2000);

    cy.log(`Successfully logged in as ${userType}`);
  }
);

/**
 * Logout command
 */
Cypress.Commands.add('logout', () => {
  cy.log('Logging out');

  // Navigate to profile page
  cy.visit('/profile', { timeout: 15000 });
  cy.url().should('include', '/profile');

  // Look for logout button and click it
  cy.contains('button', /Logout|Log out|Sign Out/i, { timeout: 15000 })
    .scrollIntoView()
    .should('be.visible')
    .click();

  // Wait for redirect
  cy.url({ timeout: 10000 }).should('satisfy', (url: string) => {
    return (
      url.includes('/auth/signin') ||
      url === Cypress.config('baseUrl') + '/' ||
      url.includes('/?')
    );
  });

  // Clear session data for clean next login
  cy.clearCookies();
  cy.clearLocalStorage();

  cy.log('✅ Successfully logged out and cleared session');
});

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
