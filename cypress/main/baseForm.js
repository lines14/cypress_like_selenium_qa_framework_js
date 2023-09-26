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

    pageIsDisplayed() {
        cy.logger(`[inf] ▶ check ${this.#pageName} is open:`);
        cy.logger(this.getUniqueElement().isDisplayed() 
        ? `[inf] ▶ ${this.#pageName} is open` 
        : `[inf] ▶ ${this.#pageName} is not open`);
        return this.getUniqueElement().isDisplayed();
    }

    pageIsEnabled() {
        cy.logger(`[inf] ▶ check ${this.#pageName} is enable:`);
        cy.logger(this.getUniqueElement().isEnabled() 
        ? `[inf] ▶ ${this.#pageName} is enable` 
        : `[inf] ▶ ${this.#pageName} is not enable`);
        return this.getUniqueElement().isEnabled();
    }
}

module.exports = BaseForm;