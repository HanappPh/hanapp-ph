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

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      login(testPhone: string, testOtp: string): void;
    }
  }
}

// -- This is a parent command --
Cypress.Commands.add('login', (testPhone, testOtp) => {
  cy.viewport(1280, 800);
  cy.visit('/auth/signin');
  cy.url().should('include', '/auth/signin');

  cy.get('input[type="tel"]').type(testPhone);
  cy.contains('button', 'Send OTP').click();

  cy.get('input[aria-label^="Digit"]', { timeout: 20000 })
    .should('have.length', 6)
    .each(($el, index) => {
      cy.wrap($el).type(testOtp[index]);
    });
  cy.contains('button', 'Verify & Continue').click();
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
