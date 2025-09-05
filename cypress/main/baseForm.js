require('cypress-xpath');
const XPATH = require('./locators/baseLocatorChildren/XPATH');
const Label = require('./elements/baseElementChildren/label');

class BaseForm {
  #pageName;

  #pageLocator;

  #loader;

  constructor(pageLocator, pageName) {
    this.#pageLocator = pageLocator;
    this.#pageName = pageName;
    this.#loader = new Label(new XPATH('//div[@class = "loader"]'), 'loader');
  }

  getUniqueElement() {
    return this.#pageLocator instanceof XPATH
      ? cy.xpath(this.#pageLocator.value).first()
      : cy.get(this.#pageLocator.value).first();
  }

  pageIsVisible() {
    return this.getUniqueElement().isVisible();
  }

  waitPageIsExisting() {
    return cy.waitIsExisting(this.#pageLocator.value);
  }

  pageIsDisplayed() {
    cy.logger(`[inf] ▶ check ${this.#pageName} is displayed:`);
    return this.waitPageIsExisting().then((isExisting) => {
      const notDisplayedLog = `[inf]   ${this.#pageName} is not displayed`;
      if (isExisting) {
        return this.pageIsVisible().then((isVisible) => {
          cy.logger(isVisible ? `[inf]   ${this.#pageName} is displayed` : notDisplayedLog);
          return cy.wrap(isVisible);
        });
      }

      cy.logger(notDisplayedLog);
      return cy.wrap(isExisting);
    });
  }

  pageIsEnabled() {
    cy.logger(`[inf] ▶ check ${this.#pageName} is enabled:`);
    return this.getUniqueElement().waitIsEnabled().then((isEnabled) => {
      cy.logger(
        isEnabled
          ? `[inf]   ${this.#pageName} is enabled`
          : `[inf]   ${this.#pageName} is not enabled`,
      );
      return cy.wrap(isEnabled);
    });
  }

  waitLoaderDisappearing() {
    if (this.#loader.elementIsVisible()) return this.#loader.waitElementIsNotDisplayed();
    return false;
  }
}

module.exports = BaseForm;
