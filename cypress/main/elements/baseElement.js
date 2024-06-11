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

  getElement(locator) {
    let elementLocator = locator;
    if (!elementLocator) elementLocator = this.#elementLocator;
    return elementLocator instanceof XPATH
      ? cy.xpath(elementLocator.value).first()
      : cy.get(elementLocator.value).first();
  }

  getElements() {
    return this.#elementLocator instanceof XPATH
      ? cy.xpath(this.#elementLocator.value)
      : cy.get(this.#elementLocator.value);
  }

  clickElement() {
    cy.logger(`[inf] ▶ click ${this.#elementName}`);
    return this.getElement().click();
  }

  focusOnElement() {
    cy.logger(`[inf] ▶ focus on ${this.#elementName}`);
    return this.getElement().focus();
  }

  forceClickElement() {
    cy.logger(`[inf] ▶ force click ${this.#elementName}`);
    return this.getElement().click({ force: true });
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

  getValue() {
    cy.logger(`[inf] ▶ get ${this.#elementName} value:`);
    this.getElement().then(($el) => cy.logger(`[inf]   value is: "${$el.val()}"`));
    return this.getElement().then(($el) => $el.val());
  }

  getElementsListText({ propertyName }) {
    return this.getElements().then(($el) => Cypress._.map($el, propertyName));
  }

  getAttributeValue({ attrName }) {
    cy.logger(`[inf] ▶ get ${this.#elementName} attribute "${attrName}" value:`);
    return this.getElement().invoke('attr', attrName).then((value) => {
      cy.logger(`[inf]   attribute value contains: "${value}"`);
      return cy.wrap(value);
    });
  }

  scrollElementToView() {
    cy.logger(`[inf] ▶ scroll to ${this.#elementName}`);
    this.getElement().scrollIntoView({ offset: { top: -150, left: 0 } });
  }

  clearData() {
    cy.logger(`[inf] ▶ clear ${this.#elementName}`);
    this.getElement().clear();
  }

  inputData(data, useCypressRealEvents = false) {
    cy.logger(`[inf] ▶ input ${this.#elementName}`);
    if (useCypressRealEvents === true) {
      this.getElement().click();
      cy.realType(data);
    } else {
      this.getElement().type(data);
    }
  }

  forceInputData(data) {
    cy.logger(`[inf] ▶ force input ${this.#elementName}`);
    this.getElement().type(data, { force: true });
  }

  fillInputField(data) {
    cy.logger(`[inf] ▶ fill input data into ${this.#elementName}`);
    this.getElement().fill(data, { overwrite: false, prepend: true });
  }

  enterData(data) {
    cy.logger(`[inf] ▶ input ${this.#elementName} and submit`);
    this.getElement().type(`${data}{enter}`);
  }

  elementIsVisible() {
    return this.getElement().isVisible();
  }

  elementIsExisting() {
    return cy.isExisting(this.#elementLocator.value);
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
      }

      cy.logger(notDisplayedLog);
      return cy.wrap(isExisting);
    });
  }

  elementIsEnabled() {
    cy.logger(`[inf] ▶ check ${this.#elementName} is enabled:`);
    return this.getElement().isEnabled().then((isEnabled) => {
      cy.logger(
        isEnabled
          ? `[inf]   ${this.#elementName} is enabled`
          : `[inf]   ${this.#elementName} is not enabled`,
      );
      return cy.wrap(isEnabled);
    });
  }

  /**
   * requires one mandatory argument: dropdownElement.
   * options contain optional parameters:
   * list of values to choose from,
   * count of elements to choose,
   * boolean toggler for typing and pressing Enter key
   * and exceptions elements sequence:
   * @param {BaseElement} dropdownElement
   * @param {Object} options
   * @param {Promise} options.valuesListPromise
   * @param {int} options.count
   * @param {boolean} options.typeAndEnter
   * @param {BaseElement[]} options.exceptionElementsList
   */
  chooseRandomElementsFromDropdownByText(dropdownElement, options = {}) {
    let valuesListPromise = options.valuesListPromise ?? null;
    const count = options.count ?? 1;
    const typeAndEnter = options.typeAndEnter ?? false;
    const exceptionElementsList = options.exceptionElementsList ?? [];

    this.getElement(this.#elementLocator).click();

    const exceptionsTextList = [];
    if (exceptionElementsList.length !== 0) {
      exceptionElementsList.forEach((element) => this.getElement(element.#elementLocator)
        .then(($el) => exceptionsTextList.push($el.text())));
    }

    if (!valuesListPromise) {
      valuesListPromise = dropdownElement.getElementsListText({ propertyName: 'innerText' });
    }

    valuesListPromise.then((elementsTextList) => {
      for (let counter = 0; counter < count; counter += 1) {
        cy.logger(`[inf] ▶ click ${dropdownElement.#elementName}`);
        cy.logger(`[inf] ▶ get random element from ${this.#elementName}`);
        const randomElementText = Randomizer.getRandomElementByText(
          elementsTextList,
          exceptionsTextList,
        );
        exceptionsTextList.push(randomElementText);
        dropdownElement.chooseElementFromDropdown(randomElementText, typeAndEnter);
      }
    });
  }

  // requires one mandatory argument:
  // checkboxParent - is a tagname of an element on the upper node that nesting checkbox title text
  clickCheckboxesByText({ checkboxParentTag, randomCount = true }, ...exceptionsElements) {
    this.getElementsListText({ propertyName: 'innerText' }).then((elementsTextList) => {
      let count = elementsTextList.length;
      if (randomCount) count = Randomizer.getRandomInteger(elementsTextList.length);
      const exceptionsTextList = [];
      if (exceptionsElements.length !== 0) {
        exceptionsElements.forEach((element) => this.getElement(element.#elementLocator)
          .then(($el) => exceptionsTextList.push($el.text())));
      }

      for (let counter = 0; counter < count; counter += 1) {
        cy.logger(`[inf] ▶ get random element from ${this.#elementName}`);
        const randomElementText = Randomizer.getRandomElementByText(
          elementsTextList,
          exceptionsTextList,
        );
        exceptionsTextList.push(randomElementText);
        cy.logger(`[inf] ▶ click ${randomElementText}`);
        cy.contains(checkboxParentTag, randomElementText).find('input[type=checkbox]').click({ force: true });
      }
    });
  }

  openCalendarAndFlipMonths(rightArrowElement, monthIncrement) {
    cy.logger(`[inf] ▶ click ${this.#elementName}`);
    this.getElement().clicks(3);
    for (let i = 0; i < monthIncrement; i += 1) {
      cy.logger(`[inf] ▶ click ${rightArrowElement.#elementName}`);
      this.getElement(rightArrowElement.#elementLocator).click();
    }
  }

  clickArrowButtonRandomNumberOfTimes(direction, numberOfElements) {
    this.elementIsVisible();
    const directionLowerCase = direction.toLowerCase();
    const numberOfClicksOnArrowButton = Randomizer.getRandomInteger(numberOfElements - 1);
    cy.logger(`[inf] ▶ direction: ${directionLowerCase}, numberOfClicks: ${numberOfClicksOnArrowButton}`);
    for (let i = numberOfClicksOnArrowButton; i > 0; i -= 1) {
      cy.logger(`[inf] ▶ press ${directionLowerCase} arrow button`);
      cy.realPress(`{${directionLowerCase}arrow}`);
    }
    cy.logger('[inf] ▶ press Enter button');
    cy.realPress('Enter');
  }

  createListOfElements(dropdownElement) {
    const elements = [];
    this.getElement(dropdownElement.#elementLocator).click();

    return this.getElement().then((element) => {
      elements.push(element.text());

      return this.iterateOverList(elements);
    });
  }

  iterateOverList(elements) {
    this.getElement();
    cy.realPress('{downarrow}');

    return this.getElement().then((element) => {
      if (element.text() === elements[0]) {
        cy.logger(`Number of countries is ${elements.length}`);

        return cy.wrap(elements);
      }
      elements.push(element.text());

      return this.iterateOverList(elements);
    });
  }

  chooseElementFromDropdown(text, typeAndEnter) {
    if (typeAndEnter) {
      cy.logger(`[inf] ▶ type and enter ${text}`);
      this.enterData(text);
      cy.realPress('{esc}');
    } else {
      cy.logger(`[inf] ▶ click ${text}`);
      this.getElements().contains(new RegExp(`${text}`, 'g')).click({ force: true });
    }
  }
}

module.exports = BaseElement;
