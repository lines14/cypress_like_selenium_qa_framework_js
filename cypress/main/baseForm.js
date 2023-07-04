require('cypress-xpath');
// const configManager = require('./utils/data/configManager.js');
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
        logger.log(`[info] ▶ ${this.pageName} is open`);
        return this.getUniqueElement().should('be.visible');
    }

    pageIsEnabled() {
        logger.log(`[info] ▶ ${this.pageName} is enable`);
        return this.getUniqueElement().should('be.enabled');
    }

    // waitPageIsDisplayed() {
    //     logger.log('[info] ▶ wait page is open:');
    //     this.getUniqueElement().wait(configManager.getConfigData().waitTime).should('be.displayed');
    // }
    
    // waitPageIsEnabled() {
    //     logger.log('[info] ▶ wait page is enable:');
    //     this.getUniqueElement().wait(configManager.getConfigData().waitTime).should('be.enabled');
    // }

    // waitPageIsExist() {
    //     logger.log('[info] ▶ wait page is exist:');
    //     this.getUniqueElement().wait(configManager.getConfigData().waitTime).should('exist');
    // }
}

module.exports = BaseForm;