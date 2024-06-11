const BaseForm = require('../../../main/baseForm');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../main/elements/baseElementChildren/label');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');

class MutualOGPOStep3 extends BaseForm {
  #nextButton;

  #carNumberBox;

  #carRegistrationBox;

  #searchButton;

  #displayedCarNumber;

  #selectedCarModel;

  #selectedCarManufacturedYear;

  constructor() {
    super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'OGPO policy request page');
    this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
    this.#carNumberBox = new Textbox(new XPATH('//label[contains(text(), "Гос. номер")]//following-sibling::input'), 'car number');
    this.#carRegistrationBox = new Textbox(new XPATH('//label[contains(text(), "Номер техпаспорта")]//following-sibling::input'), 'car registration');
    this.#searchButton = new Button(new XPATH('//button[contains(text(), "Поиск")]'), 'search button');
    this.#displayedCarNumber = new Label(new XPATH('//span[contains(text(), "Транспорт:")]//following-sibling::div[@class="text-14"]//span'), 'displayed car number');
    this.#selectedCarModel = new Label(new XPATH('//span[@class="subtitle-16 -orange"]'), 'selected car model');
    this.#selectedCarManufacturedYear = new Label(new XPATH('//span[@class="subtitle-16 -grey"]'), 'selected car manufactured year');
  }

  clickNextButton() {
    this.#nextButton.clickElement();
  }

  inputCarNumber() {
    this.#carNumberBox.inputData(JSONLoader.testData.carNumber);
  }

  inputCarRegistration() {
    this.#carRegistrationBox.inputData(JSONLoader.testData.carRegistration);
  }

  clickSearchButton() {
    this.#searchButton.clickElement();
  }

  getTrimmedDisplayedCarNumber() {
    return this.#displayedCarNumber.getText().then((text) => text.trim());
  }

  getSelectedCarModel() {
    return this.#selectedCarModel.getText();
  }

  getSelectedCarManufacturedYearElement() {
    return this.#selectedCarManufacturedYear.getElement();
  }
}

module.exports = new MutualOGPOStep3();
