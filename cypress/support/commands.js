require('@testing-library/cypress/add-commands');

Cypress.Commands.add('open', (url, options) => {
    cy.logger(`[inf] ▶ open base URL: ${Cypress.config('baseUrl')}`);
    cy.visit(url, options);
});

Cypress.Commands.add('isDisplayed', { prevSubject: true }, (subject) => {
    return Cypress.dom.isVisible(subject);
});

Cypress.Commands.add('isVisible', { prevSubject: true }, (subject) => {
    return Cypress.dom.isVisible(subject);
});

Cypress.Commands.add('isExisting', { prevSubject: false }, (elementLocator) => {
    return cy.document().then((document) => {
        const convertLocator = (locator) => {
            const nodesList = [];
            const result = document.evaluate(locator, document, null, XPathResult.ANY_TYPE, null);
            let node;
            while ((node = result.iterateNext())) {
                nodesList.push(node);
            }

            return nodesList;
        }

        return Cypress.$(document).find(convertLocator(elementLocator.locator)).length > 0;
    });
});

Cypress.Commands.add('isEnabled', { prevSubject: true }, (subject) => {
    return !subject.prop('disabled');
});

Cypress.Commands.add('logger', (step) => {
    cy.task('log', step).then((timeStamp) => cy.log(`${timeStamp} ${step}`));
});

Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes("Cannot read properties of null (reading 'focus')")) return false;
});