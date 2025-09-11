import { getGreeting } from '../support/app.po';

describe('Web Application E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Home Page', () => {
    it('should load successfully', () => {
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('should display the main heading', () => {
      getGreeting().should('be.visible');
      getGreeting().contains(/Hello, Next\.js!/);
    });

    it('should have proper page structure', () => {
      cy.get('body').should('exist');
      cy.get('h1').should('exist');
    });
  });

  describe('Navigation', () => {
    it('should handle 404 pages gracefully', () => {
      cy.visit('/nonexistent-page', { failOnStatusCode: false });
      cy.contains('404').should('be.visible');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      cy.get('h1').should('have.length.at.least', 1);
    });

    it('should be keyboard navigable', () => {
      cy.get('body').trigger('keydown', { key: 'Tab' });
      cy.focused().should('exist');
    });
  });
});
