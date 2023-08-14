require('cypress-xpath');
const logger = require('./utils/log/logger.js');

class BaseForm {
    constructor(pageLocator, pageName) {
        this.pageLocator = pageLocator;
        this.pageName = pageName;
    }

    getUniqueElement() {
        return cy.xpath(this.pageLocator).first();
    }

    pageIsDisplayed() {
        logger.log(`[info] ▶ check ${this.pageName} is open:`);
        logger.log(this.getUniqueElement().isDisplayed() 
        ? `[info] ▶ ${this.pageName} is open` 
        : `[info] ▶ ${this.pageName} is not open`);
        return this.getUniqueElement().isDisplayed();
    }

    pageIsEnabled() {
        logger.log(`[info] ▶ check ${this.pageName} is enable:`);
        logger.log(this.getUniqueElement().isEnabled() 
        ? `[info] ▶ ${this.pageName} is enable` 
        : `[info] ▶ ${this.pageName} is not enable`);
        return this.getUniqueElement().isEnabled();
    }
}

module.exports = BaseForm;