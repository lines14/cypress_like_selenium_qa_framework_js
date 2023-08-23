require('@testing-library/cypress/add-commands');

Cypress.Commands.add('open', (url, options) => {
    cy.logger(`[info] ▶ open base URL: ${Cypress.config('baseUrl')}`);
    cy.visit(url, options);
});

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

Cypress.Commands.add('logger', (step) => {
    cy.task('log', step).then((timeStamp) => cy.log(`${timeStamp} ${step}`));
});

Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes("Cannot read properties of null (reading 'focus')")) return false;
});