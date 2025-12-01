/// <reference types="cypress" />

describe('Signup Flow - Phone OTP', () => {
  it('creates a new account using phone + OTP', () => {
    const testPhone = Cypress.env('TEST_PHONE_NUMBER') || '9123456789';
    const testOtp = Cypress.env('TEST_OTP') || '123456';

    // Visit signup page
    cy.visit('/auth/signin?mode=login');

    // Fill visible name/email/phone fields (robust selectors)
    cy.get('.flex-row > .flex-1').should('not.be.disabled').type(testPhone);
    cy.get('.bg-\\[\\#F5C45E\\]').click();
    cy.get('[aria-label="Digit 1 of 6"]').type(testOtp[0]);
    cy.get('[aria-label="Digit 2 of 6"]').type(testOtp[1]);
    cy.get('[aria-label="Digit 3 of 6"]').type(testOtp[2]);
    cy.get('[aria-label="Digit 4 of 6"]').type(testOtp[3]);
    cy.get('[aria-label="Digit 5 of 6"]').type(testOtp[4]);
    cy.get('[aria-label="Digit 6 of 6"]').type(testOtp[5]);
    cy.get('.bg-\\[\\#F5C45E\\]').click();
    // cy.get('[href="/chat"]').click();
    cy.get('.gap-4 > .w-8').click();
    cy.contains('button', 'Provider').click();
    cy.get('[href="/provider"]').click();
    cy.get('.space-y-5 > :nth-child(1) > .flex-1').click();
    cy.contains('button', 'Message Client').click();
    cy.get('.overflow-y-auto > .bg-white').click();
    cy.get('.gap-3 > .flex-1 > .flex').type('TEST MESSAGE');
    cy.get('.bg-primary').click();
    cy.get('.gap-4 > .w-8').click();
    // cy.get('.pt-4 > .whitespace-nowrap').click();
    // cy.intercept('POST', '/api/user/logout').as('logoutRequest');
    // cy.contains('button', 'Logout').click();
    // cy.wait('@logoutRequest');
    // cy.url().should('eq', 'http://localhost:4200/');
  });
});
