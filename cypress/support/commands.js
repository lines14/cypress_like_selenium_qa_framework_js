require('@testing-library/cypress/add-commands');

Cypress.Commands.add('open', (url, options) => {
    cy.logger(`[inf] ▶ open base URL: ${Cypress.config('baseUrl')}`);
    cy.visit(url, options);
});

Cypress.Commands.add('isVisible', { prevSubject: true }, (subject) => {
    return Cypress.dom.isVisible(subject);
});

Cypress.Commands.add('isExisting', { prevSubject: false }, (locator) => {
    return cy.document().then((document) => {
        const convertLocator = (locator) => {
            const nodeList = [];
            const result = document.evaluate(locator, document, null, XPathResult.ANY_TYPE, null);
            let node;
            while (node = result.iterateNext()) {
                nodeList.push(node);
            }

            return nodeList;
        }

        return new Cypress.Promise((resolve) => {
            Cypress.$(function () {
                resolve(Cypress.$(document).find(convertLocator(locator)).length > 0);
            });
        });
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