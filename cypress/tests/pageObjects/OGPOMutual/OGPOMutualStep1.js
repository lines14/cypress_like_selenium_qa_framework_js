const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const Label = require('../../../main/elements/baseElementChildren/label');

class OGPOMutualStep1 extends BaseForm {
  #nextButton;

  #IINBox;

  #emailBox;

  #addressBox;

  #lastNameBox;

  #firstNameBox;

  #middleNameBox;

  #bornDateBox;

  #sexBox;

  #sexDropdownElements;

  #documentTypeBox;

  #documentTypeDropdownElements;

  #documentNumberBox;

  #documentGivedDateBox;

  #documentGivedByBox;

  #documentGivedByDropdownElements;

  #checkboxWillDriveCar;

  constructor() {
    super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'OGPO policy request page');
    this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
    this.#IINBox = new Textbox(new XPATH('//*[@id="iinOgpo"]//input[@type="number"]'), 'IIN');
    this.#emailBox = new Textbox(new XPATH('//*[@id="email"]//input[@type="text"]'), 'email');
    this.#addressBox = new Textbox(new XPATH('//*[@id="address"]//input[@type="text"]'), 'address');
    this.#lastNameBox = new Textbox(new XPATH('//*[@id="lastName"]//input[@type="text"]'), 'last name');
    this.#firstNameBox = new Textbox(new XPATH('//*[@id="firstName"]//input[@type="text"]'), 'first name');
    this.#middleNameBox = new Textbox(new XPATH('//*[@id="middleName"]//input[@type="text"]'), 'middle name');
    this.#bornDateBox = new Textbox(new XPATH('//*[@id="born"]//input[@type="text"]'), 'born date');
    this.#sexBox = new Button(new XPATH('//*[@id="sexId"]//div[@class="multiselect__tags"]'), 'sex');
    this.#sexDropdownElements = new Button(new XPATH('//*[@id="sexId"]//span[contains(@class, "multiselect__option")]/span', 'sex dropdown elements'));
    this.#documentTypeBox = new Button(new XPATH('//*[@id="documentTypeId"]//div[@class="multiselect__tags"]'), 'document type');
    this.#documentTypeDropdownElements = new Button(new XPATH('//*[@id="documentTypeId"]//span[contains(@class, "multiselect__option")]/span'), 'document type dropdown elements');
    this.#documentNumberBox = new Textbox(new XPATH('//*[@id="documentNumber"]//input[@type="text"]'), 'document number');
    this.#documentGivedDateBox = new Textbox(new XPATH('//*[@id="documentGivedDate"]//input[@type="text"]'), 'document gived date');
    this.#documentGivedByBox = new Button(new XPATH('//*[@id="documentGivedBy"]//div[@class="multiselect__tags"]'), 'document gived by');
    this.#documentGivedByDropdownElements = new Button(new XPATH('//*[@id="documentGivedBy"]//span[contains(@class, "multiselect__option")]/span'), 'document gived by dropdown elements');
    this.#checkboxWillDriveCar = new Label(new XPATH('//label[contains(text(), "Будет управлять авто")]'), 'will drive a car');
  }

  clickNextButton() {
    cy.scrollTo('top');
    this.#nextButton.clickElement();
  }

  clickCheckboxWillDriveCar() {
    this.#checkboxWillDriveCar.clickElement();
  }

  waitIINBoxIsDisplayed() {
    return this.#IINBox.waitElementIsDisplayed();
  }

  waitCheckboxWillDriveCarIsDisplayed() {
    return this.#checkboxWillDriveCar.waitElementIsDisplayed();
  }

  inputIIN(IIN) {
    this.#IINBox.inputData(IIN);
  }

  inputEmail(email) {
    this.#emailBox.elementIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) {
        this.#emailBox.clearData();
        this.#emailBox.inputData(email);
      }
    });
  }

  inputAddress(address) {
    this.#addressBox.elementIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) {
        this.#addressBox.clearData();
        this.#addressBox.inputData(address);
      }
    });
  }

  inputFirstName(firstName) {
    this.#firstNameBox.elementIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) this.#firstNameBox.inputData(firstName);
    });
  }

  inputLastName(lastName) {
    this.#lastNameBox.elementIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) this.#lastNameBox.inputData(lastName);
    });
  }

  inputMiddleName(middleName) {
    this.#middleNameBox.elementIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) this.#middleNameBox.inputData(middleName);
    });
  }

  inputBornDate(bornDate) {
    this.#bornDateBox.elementIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) this.#bornDateBox.inputData(bornDate);
    });
  }

  selectSex(sex) {
    this.#sexBox.elementIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) {
        this.#sexBox.clickElement();
        this.#sexDropdownElements.chooseElementFromDropdown(sex);
      }
    });
  }

  selectDocumentType(documentType) {
    this.#documentTypeBox.elementIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) {
        this.#documentTypeBox.clickElement();
        this.#documentTypeDropdownElements.chooseElementFromDropdown(documentType);
      }
    });
  }

  inputDocumentNumber(documentNumber) {
    cy.scrollTo('center');
    this.#documentNumberBox.elementIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) this.#documentNumberBox.inputData(documentNumber);
    });
  }

  inputDocumentGivedDate(documentGivedDate) {
    this.#documentGivedDateBox.elementIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) this.#documentGivedDateBox.inputData(documentGivedDate);
    });
  }

  selectRandomDocumentGivedBy() {
    this.#documentGivedByBox.elementIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) {
        this.#documentGivedByBox
          .chooseRandomElementsFromDropdownByText(this.#documentGivedByDropdownElements);
      }
    });
  }
}

module.exports = new OGPOMutualStep1();
