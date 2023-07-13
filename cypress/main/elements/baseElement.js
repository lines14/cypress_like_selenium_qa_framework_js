require('cypress-xpath');
const randomizer = require('../utils/random/randomizer.js');
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
        logger.log(`[info] ▶ get ${this.elementName} text`);
        this.getElement().invoke('text').as('text');
        return cy.get('@text');

        // return cy.get('@text').then((text) => {
        //     logger.log(`[info]   text contains: "${text}"`);
        //     return text;
        // });

        // logger.log(`[info] ▶ get ${this.elementName} text:`);
        // this.getElement().invoke('text').as('text');
        // return cy.get('@text').then((res) => {
        //     return res.then((text) => {
        //         logger.log(`[info]   text contains: "${text}"`);
        //         return text;
        //     });
        // });
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

    scrollElementToView() {
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

    enterData(data) {
        logger.log(`[info] ▶ enter ${this.elementName}`);
        this.getElement().type(`${data}{enter}`);
    }

    getAttributeValue(attr) {
        logger.log(`[info] ▶ get ${this.elementName} attribute value`);
        return this.getElement().attribute(attr);
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

    waitForText(text) {
        this.getElement().should('have.text', text);
    }

    // args contain required count of returning random elements and exceptions locators array:
    clickRandomElementsFromDropdownByText(dropdownElement, ...args) {
        const getText = ($el) => {
            return Cypress._.map($el, 'innerText')
        }

        cy.xpath(dropdownElement.elementLocator).first().as('dropdown');
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
            exceptionsList = exceptionsLocators.map((locator) => cy.xpath(locator).first().text());
        }

        for (let counter = 0; counter < count; counter++) {
            logger.log(`[info] ▶ click ${dropdownElement.elementName}`);
            cy.get('@dropdown').click()
            logger.log(`[info] ▶ get random element from ${this.elementName}`);
            this.getElements().then((value) => {
                const randomElementText = randomizer.getRandomElementByText(getText(value), exceptionsList);
                exceptionsList.push(randomElementText);
                randomElementsList.push(randomElementText);
                logger.log(`[info] ▶ click ${randomElementText}`);
                cy.contains('span', randomElementText).click({ force: true });
            });
        }
    }

    flipCalendarIfNotContainsDate(calendarElement, rightArrowElement, monthIncrement) {        
        cy.xpath(calendarElement.elementLocator).first().as('calendar');
        logger.log(`[info] ▶ click ${calendarElement.elementName}`);
        cy.get('@calendar').click();
        cy.get('@calendar').click();
        cy.get('@calendar').click();
        cy.xpath(rightArrowElement.elementLocator).first().as('rightArrow');
        for (let i = 0; i < monthIncrement; i++) {
            logger.log(`[info] ▶ click ${rightArrowElement.elementName}`);
            cy.get('@rightArrow').click();
        }
    }

    // args contain required count of returning random elements and exceptions locators array:
    clickRandomCheckboxesByText(...args) {
        const getText = ($el) => {
            return Cypress._.map($el, 'innerText')
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
            exceptionsList = exceptionsLocators.map((locator) => cy.xpath(locator).first().text());
        }

        for (let counter = 0; counter < count; counter++) {
            logger.log(`[info] ▶ get random element from ${this.elementName}`);
            this.getElements().then((value) => {
                const randomElementText = randomizer.getRandomElementByText(getText(value), exceptionsList);
                exceptionsList.push(randomElementText);
                randomElementsList.push(randomElementText);
                logger.log(`[info] ▶ click ${randomElementText}`);
                cy.contains('div', randomElementText).find('input[type=checkbox]').click({ force: true });
            });
        }
    }
}
    
module.exports = BaseElement;