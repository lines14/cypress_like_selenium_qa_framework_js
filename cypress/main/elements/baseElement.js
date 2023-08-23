require('cypress-xpath');
const randomizer = require('../utils/random/randomizer');

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
        cy.logger(`[info] ▶ click ${this.elementName}`);
        this.getElement().click();
    }

    doubleClickElement() {
        cy.logger(`[info] ▶ double click ${this.elementName}`);
        this.getElement().dblclick();
    }

    multipleClickElement(count) {
        cy.logger(`[info] ▶ click ${this.elementName} ${count} times`);
        this.getElement().clicks(count);
    }

    clickElementFromList(index) {
        cy.logger(`[info] ▶ click element from ${this.elementName}`);
        this.getElements()[index].click();
    } 

    getText() {
        cy.logger(`[info] ▶ get ${this.elementName} text:`);
        this.getElement().then(($el) => cy.logger(`[info]   text contains: "${$el.text()}"`));
        return this.getElement().then(($el) => $el.text());
    }    

    getElementsListText(attrName) {
        return this.getElements().then(($el) => Cypress._.map($el, attrName));
    }

    getAttributeValue(attrName) {
        cy.logger(`[info] ▶ get ${this.elementName} attribute value`);
        return this.getElement().attribute(attrName);
    }

    scrollElementToView() {
        cy.logger(`[info] ▶ scroll to ${this.elementName}`);
        this.getElement().scrollIntoView();
    }

    inputData(data) {
        cy.logger(`[info] ▶ input ${this.elementName}`);
        this.getElement().type(data);
    }

    forceInputData(data) {
        cy.logger(`[info] ▶ force input ${this.elementName}`);
        this.getElement().type(data, { force: true });
    }

    enterData(data) {
        cy.logger(`[info] ▶ enter ${this.elementName}`);
        this.getElement().type(`${data}{enter}`);
    }

    elementIsDisplayed() {
        cy.logger(`[info] ▶ check ${this.elementName} is present:`);
        cy.logger(this.getElement().isDisplayed() 
        ? `[info]   ${this.elementName} is present` 
        : `[info]   ${this.elementName} is not present`);
        return this.getElement().isDisplayed();
    }

    elementIsExisting() {
        cy.logger(`[info] ▶ check ${this.elementName} is exists:`);
        cy.logger(this.getElement().isExisting() 
        ? `[info]   ${this.elementName} is exists` 
        : `[info]   ${this.elementName} is not exists`);
        return this.getElement().isExisting();
    }

    elementIsEnabled() {
        cy.logger(`[info] ▶ check ${this.elementName} is enable:`);
        cy.logger(this.getElement().isEnabled() 
        ? `[info]   ${this.elementName} is enable` 
        : `[info]   ${this.elementName} is not enable`);
        return this.getElement().isEnabled();
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
            cy.logger(`[info] ▶ click ${dropdownElement.elementName}`);
            cy.xpath(dropdownElement.elementLocator).first().click()
            cy.logger(`[info] ▶ get random element from ${this.elementName}`);
            this.getElementsListText('innerText').then((elementsTextList) => {
                const randomElementText = randomizer.getRandomElementByText(elementsTextList, exceptionsTextList);
                exceptionsTextList.push(randomElementText);
                cy.logger(`[info] ▶ click ${randomElementText}`);
                cy.contains('span', randomElementText).click({ force: true });
            });
        }
    }

    // args contain exceptions elements array:
    clickCheckboxesByText(randomCount=true, ...args) {
        let exceptionsElements = args;
        this.getElementsListText('innerText').then((elementsTextList) => {
            let count = elementsTextList.length;
            if (randomCount) count = randomizer.getRandomInteger(elementsTextList.length);
            let exceptionsTextList =[];
            if (exceptionsElements.length !== 0) {
                exceptionsElements.forEach((element) => cy.xpath(element.elementLocator).first()
                .then(($el) => exceptionsTextList.push($el.text())));
            }
            
            for (let counter = 0; counter < count; counter++) {
                cy.logger(`[info] ▶ get random element from ${this.elementName}`);
                const randomElementText = randomizer.getRandomElementByText(elementsTextList, exceptionsTextList);
                exceptionsTextList.push(randomElementText);
                cy.logger(`[info] ▶ click ${randomElementText}`);
                cy.contains('div', randomElementText).find('input[type=checkbox]').click({ force: true });
            }
        });
    }

    flipCalendarIfNotContainsDate(rightArrowElement, monthIncrement) {        
        cy.logger(`[info] ▶ click ${this.elementName}`);
        this.getElement().clicks(3);
        for (let i = 0; i < monthIncrement; i++) {
            cy.logger(`[info] ▶ click ${rightArrowElement.elementName}`);
            cy.xpath(rightArrowElement.elementLocator).first().click();
        }
    }
}

module.exports = BaseElement;