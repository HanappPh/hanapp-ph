// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.ts using ES2015 syntax:
import './commands';

// Professional server health check before tests
beforeEach(() => {
  cy.task('checkServerHealth').then(isHealthy => {
    if (!isHealthy) {
      cy.log('WARNING: Web server is not responding. Skipping test.');
      // In a real scenario, you might want to skip the test
      // For now, we'll let Cypress handle the connection error gracefully
    }
  });
});
