const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');

class MutualOGPOStep1 extends BaseForm {
  #nextButton;

  #IINBox;

  #emailBox;

  #addressBox;

  constructor() {
    super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'OGPO policy request page');
    this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
    this.#IINBox = new Textbox(new XPATH('//input[@id="iinOgpo"]'), 'IIN');
    this.#emailBox = new Textbox(new XPATH('//label[contains(text(), "Email")]//following-sibling::input[@type="text"]'), 'email');
    this.#addressBox = new Textbox(new XPATH('//label[contains(text(), "Адрес")]//following-sibling::input[@type="text"]'), 'address');
  }

  clickNextButton() {
    this.#nextButton.clickElement();
  }

  waitIINBoxIsDisplayed() {
    return this.#IINBox.waitElementIsDisplayed();
  }

  inputIIN(IIN) {
    this.#IINBox.inputData(IIN);
  }

  inputEmail(email) {
    this.#emailBox.clearData();
    this.#emailBox.inputData(email);
  }

  inputAddress(address) {
    this.#addressBox.elementIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) {
        cy.scrollTo('center');
        this.#addressBox.clearData();
        this.#addressBox.inputData(address);
        cy.scrollTo('top');
      }
    });
  }
}

module.exports = new MutualOGPOStep1();
