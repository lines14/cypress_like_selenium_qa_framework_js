const BaseForm = require('../../../main/baseForm');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../main/elements/baseElementChildren/label');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');

class MutualOGPOStep2 extends BaseForm {
  #nextButton;

  #selectedClientName;

  #displayedClientName;

  #addressBox;

  #saveButton;

  constructor() {
    super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'OGPO policy request page');
    this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
    this.#selectedClientName = new Label(new XPATH('//span[@class="form-fio"]'), 'selected client name');
    this.#displayedClientName = new Label(new XPATH('//span[contains(text(), "Водители:")]//following-sibling::div[@class="text-14"]//span'), 'displayed client name');
    this.#addressBox = new Textbox(new XPATH('//label[contains(text(), "Адрес")]//following-sibling::input[@type="text"]'), 'address');
    this.#saveButton = new Button(new XPATH('//button[contains(text(), "Сохранить")]'), 'save button');
  }

  clickNextButton() {
    this.#nextButton.clickElement();
  }

  getTrimmedDisplayedClientName() {
    return this.#displayedClientName.getText().then((text) => text.trim());
  }

  getSelectedClientName() {
    return this.#selectedClientName.getText();
  }

  inputAddress() {
    this.#addressBox.elementIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) {
        this.#addressBox.clearData();
        this.#addressBox.inputData(JSONLoader.testData.clientAddress);
      }
    });
  }

  clickSaveButton() {
    this.#saveButton.clickElement();
  }
}

module.exports = new MutualOGPOStep2();
