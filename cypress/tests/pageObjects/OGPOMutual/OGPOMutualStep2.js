const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../main/elements/baseElementChildren/label');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');

class OGPOMutualStep2 extends BaseForm {
  #nextButton;

  #selectedClientName;

  #displayedClientName;

  #saveButton;

  #IINBox;

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

  #drivingLicenseBox;

  #issueLicenseDateBox;

  #addressBox;

  constructor() {
    super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'OGPO policy request page');
    this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
    this.#selectedClientName = new Label(new XPATH('//span[@class="form-fio"]'), 'selected client name');
    this.#displayedClientName = new Label(new XPATH('//span[contains(text(), "Водители:")]//following-sibling::div[@class="text-14"]//span'), 'displayed client name');
    this.#saveButton = new Button(new XPATH('//button[contains(text(), "Сохранить")]'), 'save button');
    this.#IINBox = new Textbox(new XPATH('//*[@id="iin"]//input[@type="number"]'), 'IIN');
    this.#lastNameBox = new Textbox(new XPATH('//*[@id="lastName"]//input[@type="text"]'), 'last name');
    this.#firstNameBox = new Textbox(new XPATH('//*[@id="firstName"]//input[@type="text"]'), 'first name');
    this.#middleNameBox = new Textbox(new XPATH('//*[@id="middleName"]//input[@type="text"]'), 'middle name');
    this.#bornDateBox = new Textbox(new XPATH('//*[@id="born"]//input[@type="text"]'), 'born date');
    this.#sexBox = new Button(new XPATH('//*[@id="sex"]//div[@class="multiselect__tags"]'), 'sex');
    this.#sexDropdownElements = new Button(new XPATH('//*[@id="sex"]//span[contains(@class, "multiselect__option")]/span'), 'sex dropdown elements');
    this.#documentTypeBox = new Button(new XPATH('//*[@id="documentType"]//div[@class="multiselect__tags"]'), 'document type');
    this.#documentTypeDropdownElements = new Button(new XPATH('//*[@id="documentType"]//span[contains(@class, "multiselect__option")]/span'), 'document type dropdown elements');
    this.#documentNumberBox = new Textbox(new XPATH('//*[@id="documentNumber"]//input[@type="text"]'), 'document number');
    this.#documentGivedDateBox = new Textbox(new XPATH('//*[@id="documentGivedDate"]//input[@type="text"]'), 'document gived date');
    this.#documentGivedByBox = new Button(new XPATH('//*[@id="documentGivedBy"]//div[@class="multiselect__tags"]'), 'document gived by');
    this.#documentGivedByDropdownElements = new Button(new XPATH('//*[@id="documentGivedBy"]//span[contains(@class, "multiselect__option")]/span'), 'document gived by dropdown elements');
    this.#drivingLicenseBox = new Textbox(new XPATH('//*[@id="driverCertificate"]//input[@type="text"]'), 'driving license');
    this.#issueLicenseDateBox = new Textbox(new XPATH('//*[@id="driverCertificateDate"]//input[@type="text"]'), 'date issue license');
    this.#addressBox = new Textbox(new XPATH('//*[@id="address"]//input[@type="text"]'), 'address');
  }

  clickNextButton() {
    cy.scrollTo('top');
    this.#nextButton.clickElement();
  }

  getTrimmedDisplayedClientName() {
    return this.#displayedClientName.getText().then((text) => text.trim());
  }

  getSelectedClientName() {
    return this.#selectedClientName.getText();
  }

  clickSaveButton() {
    this.#saveButton.clickElement();
  }

  inputIIN(IIN) {
    this.#IINBox.inputData(IIN);
  }

  waitSaveButtonIsDisplayed() {
    return this.#saveButton.waitElementIsDisplayed();
  }

  getOrSetLastName(lastName) {
    this.#lastNameBox.getValue().then((currentLastName) => {
      if (currentLastName !== lastName) {
        cy.logger(`[inf] ▶ updating last name to: "${lastName}"`);
        this.#lastNameBox.clearData();
        this.#lastNameBox.inputData(lastName);
      } else {
        cy.logger(`[inf] ▶ last name is already set to: "${lastName}"`);
      }
    });
  }

  getOrSetFirstName(firstName) {
    this.#firstNameBox.getValue().then((currentFirstName) => {
      if (currentFirstName !== firstName) {
        cy.logger(`[inf] ▶ updating last name to: "${firstName}"`);
        this.#firstNameBox.clearData();
        this.#firstNameBox.inputData(firstName);
      } else {
        cy.logger(`[inf] ▶ last name is already set to: "${firstName}"`);
      }
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

  getOrSelectDocumentType(documentType) {
    this.#documentTypeBox.getText().then((currentDocumentType) => {
      if (currentDocumentType.trim() !== documentType) {
        cy.logger(`[inf] ▶ updating document type to: "${documentType}"`);
        this.#documentTypeBox.clickElement();
        this.#documentTypeDropdownElements.chooseElementFromDropdown(documentType);
      } else {
        cy.logger(`[inf] ▶ document type is already set to: "${documentType}"`);
      }
    });
  }

  getOrSetDocumentNumber(documentNumber) {
    this.#documentNumberBox.getValue().then((currentDocumentNumber) => {
      if (currentDocumentNumber !== documentNumber) {
        cy.logger(`[inf] ▶ updating document number to: "${documentNumber}"`);
        this.#documentNumberBox.clearData();
        this.#documentNumberBox.inputData(documentNumber);
      } else {
        cy.logger(`[inf] ▶ document number is already set to: "${documentNumber}"`);
      }
    });
  }

  getOrSetDocumentGivedDate(documentGivedDate) {
    this.#documentGivedDateBox.getValue().then((currentDocumentGivedDate) => {
      if (currentDocumentGivedDate !== documentGivedDate) {
        cy.logger(`[inf] ▶ updating document gived date to: "${documentGivedDate}"`);
        this.#documentGivedDateBox.clearData();
        this.#documentGivedDateBox.inputData(documentGivedDate);
      } else {
        cy.logger(`[inf] ▶ document gived date is already set to: "${documentGivedDate}"`);
      }
    });
  }

  getOrSelectRandomDocumentGivedBy() {
    this.#documentGivedByBox.getText().then((currentDocumentGivedBy) => {
      if (currentDocumentGivedBy.trim() === 'Выберите из списка') {
        cy.logger('[inf] ▶ selecting random document gived by');
        this.#documentGivedByBox
          .chooseRandomElementsFromDropdownByText(this.#documentGivedByDropdownElements);
      } else {
        cy.logger(`[inf] ▶ document gived by already set to: "${currentDocumentGivedBy.trim()}"`);
      }
    });
  }

  getOrSetDrivingLicense(drivingLicense) {
    cy.scrollTo('center');
    this.#drivingLicenseBox.getValue().then((currentDrivingLicense) => {
      if (currentDrivingLicense !== drivingLicense) {
        cy.logger(`[inf] ▶ updating driving license to: "${drivingLicense}"`);
        this.#drivingLicenseBox.clearData();
        this.#drivingLicenseBox.inputData(drivingLicense);
      } else {
        cy.logger(`[inf] ▶ driving license is already set to: "${drivingLicense}"`);
      }
    });
  }

  getOrSetIssueLicenseDate(issueLicenseDate) {
    this.#issueLicenseDateBox.getValue().then((currentIssueLicenseDate) => {
      if (currentIssueLicenseDate !== issueLicenseDate) {
        cy.logger(`[inf] ▶ updating issue license date to: "${issueLicenseDate}"`);
        this.#issueLicenseDateBox.clearData();
        this.#issueLicenseDateBox.inputData(issueLicenseDate);
      } else {
        cy.logger(`[inf] ▶ issue license date is already set to: "${issueLicenseDate}"`);
      }
    });
  }

  inputAddress(address) {
    this.#addressBox.clearData();
    this.#addressBox.inputData(address);
  }
}

module.exports = new OGPOMutualStep2();
