const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');

class MSTStep3 extends BaseForm {
  #nextButton;

  #emailBox;

  constructor() {
    super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'MST policy request page');
    this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
    this.#emailBox = new Textbox(new XPATH('//label[contains(text(), "Email")]//following-sibling::input[@type="text"]'), 'email');
  }

  clickNextButton() {
    this.#nextButton.clickElement();
  }

  inputEmail(email) {
    this.#emailBox.inputData(email);
  }
}

module.exports = new MSTStep3();
