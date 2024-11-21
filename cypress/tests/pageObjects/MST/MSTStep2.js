const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');

class MSTStep2 extends BaseForm {
  #nextButton;

  #addressBox;

  #documentNumberBox;

  constructor() {
    super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'MST policy request page');
    this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
    this.#addressBox = new Textbox(new XPATH('//label[contains(text(), "Адрес проживания")]//following-sibling::input[@type="text"]'), 'address');
    this.#documentNumberBox = new Textbox(new XPATH('//label[contains(text(), "Номер паспорта")]//following-sibling::input[@type="text"]'), 'document number');
  }

  clickNextButton() {
    this.#nextButton.clickElement();
  }

  inputAddress(address) {
    this.#addressBox.elementIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) {
        this.#addressBox.clearData();
        this.#addressBox.inputData(address);
      }
    });
  }

  getOrSetDocumentNumber(documentNumber) {
    return this.#documentNumberBox.getText().then((value) => {
      if (value === documentNumber) {
        return cy.wrap(value);
      }

      this.#documentNumberBox.clearData();
      this.#documentNumberBox.inputData(documentNumber);
      return this.getOrSetDocumentIssuedByElement(documentNumber);
    });
  }
}

module.exports = new MSTStep2();
