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

    clickElement() {
        logger.log(`[info] ▶ click ${this.elementName}`);
        this.getElement().click();
    }

    doubleClickElement() {
        logger.log(`[info] ▶ click ${this.elementName}`);
        this.getElement().dblclick();
    }

    clickElementFromList(index) {
        logger.log(`[info] ▶ click element from ${this.elementName}`);
        this.getElements()[index].click();
    }

    getText($el, attr) {
        return Cypress._.map($el, attr).pop();
    }

    getElementsText($el, attr) {
        return Cypress._.map($el, attr);
    }

    waitForText(text) {
        this.getElement().should('have.text', text);
    }

    getAttributeValue(attr) {
        logger.log(`[info] ▶ get ${this.elementName} attribute value`);
        return this.getElement().attribute(attr);
    }

    scrollElementToView() {
        logger.log(`[info] ▶ scroll to ${this.elementName}`);
        this.getElement().scrollIntoView();
    }

    inputData(data) {
        logger.log(`[info] ▶ input ${this.elementName}`);
        this.getElement().type(data);
    }

    enterData(data) {
        logger.log(`[info] ▶ enter ${this.elementName}`);
        this.getElement().type(`${data}{enter}`);
    }

    elementIsDisplayed() {
        logger.log(`[info] ▶ check ${this.elementName} is present:`);
        logger.log(this.getElement().isDisplayed() ? `[info]   ${this.elementName} is present` : `[info]   ${this.elementName} is not present`);
        return this.getElement().isDisplayed();
    }

    elementIsExisting() {
        logger.log(`[info] ▶ check ${this.elementName} is exists:`);
        logger.log(this.getElement().isExisting() ? `[info]   ${this.elementName} is exists` : `[info]   ${this.elementName} is not exists`);
        return this.getElement().isExisting();
    }

    elementIsEnabled() {
        logger.log(`[info] ▶ check ${this.elementName} is enable:`);
        logger.log(this.getElement().isEnabled() ? `[info]   ${this.elementName} is enable` : `[info]   ${this.elementName} is not enable`);
        return this.getElement().isEnabled();
    }

    // args contain required count of returning random elements and exceptions elements array:
    clickRandomElementsFromDropdownByText(dropdownElement, ...args) {
        cy.xpath(dropdownElement.elementLocator).first().as('dropdown');
        let count = args[0];
        let exceptionsElements = args.slice(1, args.length);
        if (args === undefined) {
            count = 1;
        } else if (typeof args[0] !== 'number') {
            count = 1;
            exceptionsElements = args.slice(0, args.length);
        }

        this.randomElementsList = [];
        let exceptionsList =[];
        if (exceptionsElements.length !== 0) {
            exceptionsElements.forEach((element) => {
                cy.xpath(element.elementLocator).first().then((elem) => {
                    const exceptionElementText = this.getText(elem, 'innerText');
                    exceptionsList.push(exceptionElementText);
                });
            });
        }

        for (let counter = 0; counter < count; counter++) {
            logger.log(`[info] ▶ click ${dropdownElement.elementName}`);
            cy.get('@dropdown').click()
            logger.log(`[info] ▶ get random element from ${this.elementName}`);
            this.getElements().then((value) => {
                const randomElementText = randomizer.getRandomElementByText(this.getElementsText(value, 'innerText'), exceptionsList);
                exceptionsList.push(randomElementText);
                this.randomElementsList.push(randomElementText);
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

    // args contain required count of returning random elements and exceptions elements array:
    clickRandomCheckboxesByText(...args) {
        let count = args[0];
        let exceptionsElements = args.slice(1, args.length);
        if (args === undefined) {
            count = 1;
        } else if (typeof args[0] !== 'number') {
            count = 1;
            exceptionsElements = args.slice(0, args.length);
        }

        this.randomElementsList = [];
        let exceptionsList =[];
        if (exceptionsElements.length !== 0) {
            exceptionsElements.forEach((element) => {
                cy.xpath(element.elementLocator).first().then((elem) => {
                    const exceptionElementText = this.getText(elem, 'innerText');
                    exceptionsList.push(exceptionElementText);
                });
            });
        }

        for (let counter = 0; counter < count; counter++) {
            logger.log(`[info] ▶ get random element from ${this.elementName}`);
            this.getElements().then((value) => {
                const randomElementText = randomizer.getRandomElementByText(this.getElementsText(value, 'innerText'), exceptionsList);
                exceptionsList.push(randomElementText);
                this.randomElementsList.push(randomElementText);
                logger.log(`[info] ▶ click ${randomElementText}`);
                cy.contains('div', randomElementText).find('input[type=checkbox]').click({ force: true });
            });
        }
    }

    getBothElementsTextLists(element, firstAttr, secondAttr=firstAttr) {
        return this.getElements().then((value) => {
            const firstTextList = this.getElementsText(value, firstAttr);
            return cy.xpath(element.elementLocator).then((elem) => {
                const secondTextList = this.getElementsText(elem, secondAttr);
                return { firstTextList, secondTextList };
            });
        });
    }
}
    
module.exports = BaseElement;