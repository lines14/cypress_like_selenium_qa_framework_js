require('@testing-library/cypress/add-commands');

Cypress.Commands.add('isDisplayed', { prevSubject: true }, (subject) => {
    const isDisplayed = Cypress.dom.isVisible(subject);
    return isDisplayed;
});

Cypress.Commands.add('isEnabled', { prevSubject: true }, (subject) => {
    const isEnabled = !subject.prop('disabled');
    return isEnabled;
});

Cypress.Commands.add('isExisting', { prevSubject: true }, (subject) => {
    const isExisting = subject.length > 0;
    return isExisting;
});  
  
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })