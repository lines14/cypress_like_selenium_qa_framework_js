const BaseForm = require('../../../main/baseForm');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');

class MSTStep2 extends BaseForm {
  #nextButton;

  #addressBox;

  constructor() {
    super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'MST policy request page');
    this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
    this.#addressBox = new Textbox(new XPATH('//label[contains(text(), "Адрес проживания")]//following-sibling::input[@type="text"]'), 'address');
  }

  clickNextButton() {
    this.#nextButton.clickElement();
  }

  inputAddress() {
    this.#addressBox.elementIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) {
        this.#addressBox.clearData();
        this.#addressBox.inputData(JSONLoader.testData.clientAddress);
      }
    });
  }
}

module.exports = new MSTStep2();
