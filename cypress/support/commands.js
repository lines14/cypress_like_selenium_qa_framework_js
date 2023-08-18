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

Cypress.Commands.add('setSharedData', (key, value) => {
    cy.window().then((win) => {
        win.localStorage.setItem(key, JSON.stringify(value));
    });
});
  
Cypress.Commands.add('getSharedData', (key) => {
    return cy.window().then((win) => {
        const value = win.localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    });
});
  