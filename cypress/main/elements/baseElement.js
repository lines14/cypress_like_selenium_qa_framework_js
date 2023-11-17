require('cypress-xpath');
const Randomizer = require('../utils/random/randomizer');
const XPATH = require('../locators/baseLocatorChildren/XPATH');

class BaseElement {
    #elementName;
    #elementLocator;

    constructor(elementLocator, elementName) {
        this.#elementLocator = elementLocator;
        this.#elementName = elementName;
    }

    getElement(elementLocator) {
        if (!elementLocator) elementLocator = this.#elementLocator;
        return elementLocator instanceof XPATH 
        ? cy.xpath(elementLocator.locator).first() 
        : cy.get(elementLocator.locator).first();
    }

    getElements() {
        return this.#elementLocator instanceof XPATH 
        ? cy.xpath(this.#elementLocator.locator) 
        : cy.get(this.#elementLocator.locator);
    }

    clickElement() {
        cy.logger(`[inf] ▶ click ${this.#elementName}`);
        return this.getElement().click();
    }

    doubleClickElement() {
        cy.logger(`[inf] ▶ double click ${this.#elementName}`);
        this.getElement().dblclick();
    }

    multipleClickElement(count) {
        cy.logger(`[inf] ▶ click ${this.#elementName} ${count} times`);
        this.getElement().clicks(count);
    }

    clickElementFromList(index) {
        cy.logger(`[inf] ▶ click element from ${this.#elementName}`);
        this.getElements()[index].click();
    } 

    getText() {
        cy.logger(`[inf] ▶ get ${this.#elementName} text:`);
        this.getElement().then(($el) => cy.logger(`[inf]   text contains: "${$el.text()}"`));
        return this.getElement().then(($el) => $el.text());
    }    

    getElementsListText(attrName) {
        return this.getElements().then(($el) => Cypress._.map($el, attrName));
    }

    getAttributeValue(attrName) {
        cy.logger(`[inf] ▶ get ${this.#elementName} attribute "${attrName}" value:`);
        return this.getElement().invoke('attr', attrName).then((value) => {
            cy.logger(`[inf]   value contains: "${value}"`);
            return cy.wrap(value);
        });
    }

    scrollElementToView() {
        cy.logger(`[inf] ▶ scroll to ${this.#elementName}`);
        this.getElement().scrollIntoView();
    }

    clearData() {
        cy.logger(`[inf] ▶ clear ${this.#elementName}`);
        this.getElement().clear();
    }

    inputData(data) {
        cy.logger(`[inf] ▶ input ${this.#elementName}`);
        this.getElement().type(data);
    }

    forceInputData(data) {
        cy.logger(`[inf] ▶ force input ${this.#elementName}`);
        this.getElement().type(data, { force: true });
    }

    enterData(data) {
        cy.logger(`[inf] ▶ input ${this.#elementName} and submit`);
        this.getElement().type(`${data}{enter}`);
    }

    elementIsVisible() {
        return this.getElement().isVisible();
    }

    elementIsExisting() {
        return cy.isExisting(this.#elementLocator.locator);
    }

    elementIsDisplayed() {
        cy.logger(`[inf] ▶ check ${this.#elementName} is displayed:`);
        return this.elementIsExisting().then((isExisting) => {
            const notDisplayedLog = `[inf]   ${this.#elementName} is not displayed`;
            if (isExisting) {
                return this.elementIsVisible().then((isVisible) => {
                    cy.logger(isVisible ? `[inf]   ${this.#elementName} is displayed` : notDisplayedLog);
                    return cy.wrap(isVisible);
                });
            } else {
                cy.logger(notDisplayedLog);
                return cy.wrap(isExisting);
            }
        });
    }

    elementIsEnabled() {
        cy.logger(`[inf] ▶ check ${this.#elementName} is enabled:`);
        return this.getElement().isEnabled().then((isEnabled) => {
            cy.logger(
                isEnabled 
                ? `[inf]   ${this.#elementName} is enabled` 
                : `[inf]   ${this.#elementName} is not enabled`
            );
            return cy.wrap(isEnabled);
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
            exceptionsElements.forEach((element) => this.getElement(element.#elementLocator)
            .then(($el) => exceptionsTextList.push($el.text())));
        }

        for (let counter = 0; counter < count; counter++) {
            cy.logger(`[inf] ▶ click ${dropdownElement.#elementName}`);
            this.getElement(dropdownElement.#elementLocator).click()
            cy.logger(`[inf] ▶ get random element from ${this.#elementName}`);
            this.getElementsListText('innerText').then((elementsTextList) => {
                const randomElementText = Randomizer.getRandomElementByText(elementsTextList, exceptionsTextList);
                exceptionsTextList.push(randomElementText);
                cy.logger(`[inf] ▶ click ${randomElementText}`);
                cy.contains('span', randomElementText).click({ force: true });
            });
        }
    }

    // args contain exceptions elements array:
    clickCheckboxesByText(randomCount=true, ...args) {
        let exceptionsElements = args;
        this.getElementsListText('innerText').then((elementsTextList) => {
            let count = elementsTextList.length;
            if (randomCount) count = Randomizer.getRandomInteger(elementsTextList.length);
            let exceptionsTextList =[];
            if (exceptionsElements.length !== 0) {
                exceptionsElements.forEach((element) => this.getElement(element.#elementLocator)
                .then(($el) => exceptionsTextList.push($el.text())));
            }
            
            for (let counter = 0; counter < count; counter++) {
                cy.logger(`[inf] ▶ get random element from ${this.#elementName}`);
                const randomElementText = Randomizer.getRandomElementByText(elementsTextList, exceptionsTextList);
                exceptionsTextList.push(randomElementText);
                cy.logger(`[inf] ▶ click ${randomElementText}`);
                cy.contains('div', randomElementText).find('input[type=checkbox]').click({ force: true });
            }
        });
    }

    flipCalendarIfNotContainsDate(rightArrowElement, monthIncrement) {        
        cy.logger(`[inf] ▶ click ${this.#elementName}`);
        this.getElement().clicks(3);
        for (let i = 0; i < monthIncrement; i++) {
            cy.logger(`[inf] ▶ click ${rightArrowElement.#elementName}`);
            this.getElement(rightArrowElement.#elementLocator).click();
        }
    }
}

module.exports = BaseElement;