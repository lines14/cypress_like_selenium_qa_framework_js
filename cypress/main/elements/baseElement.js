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

    getText() {
        return this.getElement().then(($el) => $el.text());
    }

    getElementsTextList(attrName) {
        return this.getElements().then(($el) => Cypress._.map($el, attrName));
    }

    waitForText(text) {
        this.getElement().should('have.text', text);
    }

    getAttributeValue(attrName) {
        logger.log(`[info] ▶ get ${this.elementName} attribute value`);
        return this.getElement().attribute(attrName);
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
        logger.log(this.getElement().isDisplayed() 
        ? `[info]   ${this.elementName} is present` 
        : `[info]   ${this.elementName} is not present`);
        return this.getElement().isDisplayed();
    }

    elementIsExisting() {
        logger.log(`[info] ▶ check ${this.elementName} is exists:`);
        logger.log(this.getElement().isExisting() 
        ? `[info]   ${this.elementName} is exists` 
        : `[info]   ${this.elementName} is not exists`);
        return this.getElement().isExisting();
    }

    elementIsEnabled() {
        logger.log(`[info] ▶ check ${this.elementName} is enable:`);
        logger.log(this.getElement().isEnabled() 
        ? `[info]   ${this.elementName} is enable` 
        : `[info]   ${this.elementName} is not enable`);
        return this.getElement().isEnabled();
    }

    waitElementHasNotProperty(attrName, attrValue) {
        this.getElement().should(($el) => {
            expect($el.css(attrName)).not.to.equal(attrValue);
        });
    }

    // args contain required count of returning random elements and exceptions elements array:
    clickRandomElementsFromDropdownByText(dropdownElement, ...args) {
        let count = args[0];
        let exceptionsElements = args.slice(1, args.length);
        if (args === undefined) {
            count = 1;
        } else if (typeof args[0] !== 'number') {
            count = 1;
            exceptionsElements = args.slice(0, args.length);
        }

        let exceptionsTextList =[];
        if (exceptionsElements.length !== 0) {
            exceptionsElements.forEach((element) => cy.xpath(element.elementLocator).first()
            .then(($el) => exceptionsTextList.push($el.text())));
        }

        for (let counter = 0; counter < count; counter++) {
            logger.log(`[info] ▶ click ${dropdownElement.elementName}`);
            cy.xpath(dropdownElement.elementLocator).first().click()
            logger.log(`[info] ▶ get random element from ${this.elementName}`);
            this.getElementsTextList('innerText').then((elementsTextList) => {
                const randomElementText = randomizer.getRandomElementByText(elementsTextList, exceptionsTextList);
                exceptionsTextList.push(randomElementText);
                logger.log(`[info] ▶ click ${randomElementText}`);
                cy.contains('span', randomElementText).click({ force: true });
            });
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

        let exceptionsTextList =[];
        if (exceptionsElements.length !== 0) {
            exceptionsElements.forEach((element) => cy.xpath(element.elementLocator).first()
            .then(($el) => exceptionsTextList.push($el.text())));
        }

        for (let counter = 0; counter < count; counter++) {
            logger.log(`[info] ▶ get random element from ${this.elementName}`);
            this.getElementsTextList('innerText').then((elementsTextList) => {
                const randomElementText = randomizer.getRandomElementByText(elementsTextList, exceptionsTextList);
                exceptionsTextList.push(randomElementText);
                logger.log(`[info] ▶ click ${randomElementText}`);
                cy.contains('div', randomElementText).find('input[type=checkbox]').click({ force: true });
            });
        }
    }

    flipCalendarIfNotContainsDate(rightArrowElement, monthIncrement) {        
        logger.log(`[info] ▶ click ${this.elementName}`);
        this.getElement().click();
        this.getElement().click();
        this.getElement().click();
        for (let i = 0; i < monthIncrement; i++) {
            logger.log(`[info] ▶ click ${rightArrowElement.elementName}`);
            cy.xpath(rightArrowElement.elementLocator).first().click();
        }
    }
}
    
module.exports = BaseElement;