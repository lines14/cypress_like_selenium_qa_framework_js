require('cypress-xpath');
const XPATH = require('./locators/baseLocatorChildren/XPATH');

class BaseForm {
    #pageName;
    #pageLocator;

    constructor(pageLocator, pageName) {
        this.#pageLocator = pageLocator;
        this.#pageName = pageName;
    }

    getUniqueElement() {
        return this.#pageLocator instanceof XPATH 
        ? cy.xpath(this.#pageLocator.locator).first() 
        : cy.get(this.#pageLocator.locator).first();
    }

    pageIsVisible() {
        return this.getUniqueElement().isVisible();
    }

    pageIsExisting() {
        return cy.isExisting(this.#pageLocator.locator);
    }

    pageIsDisplayed() {
        cy.logger(`[inf] ▶ check ${this.#pageName} is displayed:`);
        return this.pageIsExisting().then((isExisting) => {
            if (isExisting) {
                return this.pageIsVisible().then((isVisible) => {
                    cy.logger(
                        isVisible 
                        ? `[inf]   ${this.#pageName} is displayed` 
                        : `[inf]   ${this.#pageName} is not displayed`
                    );
                    return cy.wrap(isVisible);
                });
            } else {
                cy.logger(`[inf]   ${this.#pageName} is not displayed`);
                return cy.wrap(isExisting);
            }
        });
    }

    pageIsEnabled() {
        cy.logger(`[inf] ▶ check ${this.#pageName} is enabled:`);
        return this.getUniqueElement().isEnabled().then((isEnabled) => {
            cy.logger(
                isEnabled 
                ? `[inf]   ${this.#pageName} is enabled` 
                : `[inf]   ${this.#pageName} is not enabled`
            );
            return cy.wrap(isEnabled);
        });
    }
}

module.exports = BaseForm;