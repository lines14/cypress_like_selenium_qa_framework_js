const BaseForm = require('../../../main/baseForm');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');

class MutualOGPOStep1 extends BaseForm {
  #nextButton;

  #IINBox;

  #emailBox;

  constructor() {
    super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'OGPO policy request page');
    this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
    this.#IINBox = new Textbox(new XPATH('//input[@id="iinOgpo"]'), 'IIN');
    this.#emailBox = new Textbox(new XPATH('//label[contains(text(), "Email")]//following-sibling::input[@type="text"]'), 'email');
  }

  clickNextButton() {
    this.#nextButton.clickElement();
  }

  inputIIN() {
    this.#IINBox.inputData(JSONLoader.testData.clientIIN);
  }

  inputEmail() {
    this.#emailBox.clearData();
    this.#emailBox.inputData(JSONLoader.testData.clientEmail);
  }
}

module.exports = new MutualOGPOStep1();
