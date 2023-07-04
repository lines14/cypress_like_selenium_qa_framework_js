require('cypress-xpath');
const randomizer = require('../utils/random/randomizer.js');
const configManager = require('../utils/data/configManager.js');
const logger = require('../utils/log/logger.js');

class BaseElement {
    constructor(elementLocator, elementName) {
        this.elementLocator = elementLocator;
        this.elementName = elementName;
    }

    getElement() {
        return cy.xpath(this.elementLocator).first();
    }

    getElements() {
        return cy.xpath(this.elementLocator);
    }

    getText() {
        logger.log(`[info] ▶ get ${this.elementName} text:`);
        logger.log(`[info]   text contains: "${this.getElement().text()}"`);
        return this.getElement().text();
    }

    getElementsListText() {
        const elementsList = this.getElements();
        const textList = [];
        for (let i = 0; i < elementsList.length; i++) {
            textList.push(elementsList[i].text());
        }
        
        return textList;
    }

    clickElement() {
        logger.log(`[info] ▶ click ${this.elementName}`);
        this.getElement().click();
    }

    doubleClickElement() {
        logger.log(`[info] ▶ click ${this.elementName}`);
        this.getElement().dblclick();
    }

    scrollToElement() {
        logger.log(`[info] ▶ scroll to ${this.elementName}`);
        this.getElement().scrollIntoView();
    }

    clickElementFromList(index) {
        logger.log(`[info] ▶ click element from ${this.elementName}`);
        this.getElements()[index].click();
    }

    inputData(data) {
        logger.log(`[info] ▶ input ${this.elementName}`);
        this.getElement().type(data);
    }

    getAttributeValue(attr) {
        logger.log(`[info] ▶ get ${this.elementName} attribute value`);
        return this.getElement().attribute(attr);
    }

    getElementsListAttributesValues(attr) {
        return this.getElements().map((elem) => elem.attribute(attr));
    }

    elementIsDisplayed() {
        logger.log(`[info] ▶ check ${this.elementName} is present:`);
        logger.log(this.getElement().should('be.visible') ? `[info]   ${this.elementName} is present` : `[info]   ${this.elementName} is not present`);
        return this.getElement().should('be.visible');
    }

    elementIsExisting() {
        logger.log(`[info] ▶ check ${this.elementName} is exists:`);
        logger.log(this.getElement().should('exist') ? `[info]   ${this.elementName} is exists` : `[info]   ${this.elementName} is not exists`);
        return this.getElement().should('exist');
    }

    elementIsEnabled() {
        logger.log(`[info] ▶ check ${this.elementName} is enable:`);
        logger.log(this.getElement().should('be.enabled') ? `[info]   ${this.elementName} is enable` : `[info]   ${this.elementName} is not enable`);
        return this.getElement().should('be.enabled');
    }
    
    // waitIsEnabled() {
    //     logger.log(`[info] ▶ wait ${this.elementName} is enable`);
    //     this.getElement().wait(configManager.getConfigData().waitTime).should('be.enabled');
    // }

    // waitIsExisting() {
    //     logger.log(`[info] ▶ wait ${this.elementName} is exists`);
    //     this.getElement().wait(configManager.getConfigData().waitTime).should('exist');
    // }

    waitForText(text) {
        this.getElement().should('have.text', text);
    }

    // if intervalObj not needed it's value must be false;
    // args contain required count of returning random elements and exceptions locators array:
    clickRandomElementsFromDropdown(dropdownElementLocator, intervalObj, ...args) {
        const dropdownElement = cy.xpath(dropdownElementLocator).first();
        // dropdownElement.waitForClickable({ timeout: configManager.getConfigData().waitTime });
        dropdownElement.click();

        let interval = intervalObj;
        if (!intervalObj) {
            interval = { start: 0, end: undefined}
        }

        let count = args[0];
        let exceptionsLocators = args.slice(1, args.length);
        if (args === undefined) {
            count = 1;
        } else if (typeof args[0] !== 'number') {
            count = 1;
            exceptionsLocators = args.slice(0, args.length);
        }

        const randomElementsList = [];
        let exceptionsList =[];
        if (exceptionsLocators.length !== 0) {
            exceptionsList = exceptionsLocators.map((locator) => cy.xpath(locator).first());
        }

        const elementsList = this.getElements();
        for (let counter = 0; counter < count; counter++) {
            logger.log(`[info] ▶ get random element from ${this.elementName}`);
            const randomElement = randomizer.getRandomElement(elementsList.slice(interval.start, interval.end), exceptionsList);
            exceptionsList.push(randomElement);
            randomElementsList.push(randomElement);
        }

        dropdownElement.click();
        for (let elem of randomElementsList) {
            // dropdownElement.waitForClickable({ timeout: configManager.getConfigData().waitTime });
            dropdownElement.click();
            // elem.waitForClickable({ timeout: configManager.getConfigData().waitTime });
            logger.log(`[info] ▶ click ${elem.text()}`);
            elem.click();
        }
    }

    // if intervalObj not needed it's value must be false;
    // args contain required count of returning random elements and exceptions locators array:
    clickRandomCheckboxes(intervalObj, ...args) {
        let interval = intervalObj;
        if (!intervalObj) {
            interval = { start: 0 }
        }

        let count = args[0];
        let exceptionsLocators = args.slice(1, args.length);
        if (args === undefined) {
            count = 1;
        } else if (typeof args[0] !== 'number') {
            count = 1;
            exceptionsLocators = args.slice(0, args.length);
        }

        const randomElementsList = [];
        let exceptionsList =[];
        if (exceptionsLocators.length !== 0) {
            exceptionsList = exceptionsLocators.map((locator) => cy.xpath(locator).first());
        }

        const elementsList = this.getElements();
        for (let counter = 0; counter < count; counter++) {
            logger.log(`[info] ▶ get random element from ${this.elementName}`);
            const randomElement = randomizer.getRandomElement(elementsList.slice(interval.start, interval.end), exceptionsList);
            exceptionsList.push(randomElement);
            randomElementsList.push(randomElement);
        }
        
        for (let elem of randomElementsList) {
            // elem.waitForClickable({ timeout: configManager.getConfigData().waitTime })
            logger.log(`[info] ▶ click ${configManager.getTestData().checkboxesValues[elem.attribute('id')]}`);
            elem.click();
        }
    }

    // async scrollElementIntoView() {
    //     logger.log(`[info] ▶ scroll ${this.elementName} into view`);
    //     await (await this.getElement()).scrollIntoView({ block: 'end', inline: 'end' });
    // }
}
    
module.exports = BaseElement;