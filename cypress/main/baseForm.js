require('cypress-xpath');
const { XPATH } = require('../support/locators');

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
        cy.logger(`[info] ▶ check ${this.#pageName} is open:`);
        cy.logger(this.getUniqueElement().isDisplayed() 
        ? `[info] ▶ ${this.#pageName} is open` 
        : `[info] ▶ ${this.#pageName} is not open`);
        return this.getUniqueElement().isDisplayed();
    }

    pageIsEnabled() {
        cy.logger(`[info] ▶ check ${this.#pageName} is enable:`);
        cy.logger(this.getUniqueElement().isEnabled() 
        ? `[info] ▶ ${this.#pageName} is enable` 
        : `[info] ▶ ${this.#pageName} is not enable`);
        return this.getUniqueElement().isEnabled();
    }
}

module.exports = BaseForm;