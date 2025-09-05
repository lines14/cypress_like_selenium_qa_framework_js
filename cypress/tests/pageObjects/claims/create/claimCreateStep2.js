const BaseForm = require('../../../../main/baseForm');
const XPATH = require('../../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../../main/elements/baseElementChildren/label');
const Button = require('../../../../main/elements/baseElementChildren/button');
const Checkbox = require('../../../../main/elements/baseElementChildren/checkbox');
const Textbox = require('../../../../main/elements/baseElementChildren/textbox');
const JSONLoader = require('../../../../main/utils/data/JSONLoader');
const Randomizer = require('../../../../main/utils/random/randomizer');

class ClaimCreateStep2 extends BaseForm {
  #applicantFullNameLabel;

  #policyNumberLabel;

  #policyInsurancePeriodLabel;

  #applicantTypeDropdownButton;

  #applicantTypeDropdownElement;

  #applicantTypeDropdownChosenElement;

  #PDLCheckbox;

  #PDLDocumentFrontUploadButton;

  #PDLDocumentBackUploadButton;

  #territoryDropdownButton;

  #territoryDropdownButtonXPATH = '(//label[contains(text(), "Территория страхового случая")]/following::div[@class = "multiselect__select"])[last()]';

  #territoryDropdownElement;

  #territoryDropdownElementXPATH = '(//label[contains(text(), "Выберите") or contains(text(), "Территория")])[last()]/following::span[contains(@class, "multiselect__option")]/span';

  #territoryDropdownChosenElement;

  #territoryDropdownChosenElementXPATH = '(//label[contains(text(), "Выберите") or contains(text(), "Территория")]/following::span[@class = "multiselect__single"])[last()]';

  #directClaimCheckbox;

  #nextButton;

  #locationDescriptionTextbox;

  #IEDescriptionTextbox;

  /**
   * Used to distinguish different requests with same url (arTerritory).
   * Prevents the use of cached request interception.
   * @type {number}
   */
  #interceptCounter = 0;

  constructor() {
    super(new XPATH('//label[contains(text(), "Заявитель")]'), 'claims create step 2 page');
    this.#applicantFullNameLabel = new Label(new XPATH('//span[text() = "Заявитель:"]/following::span'), 'applicant full name label');
    this.#policyNumberLabel = new Label(new XPATH('//span[text() = "Номер договора:"]/following::span'), 'policy number label');
    this.#policyInsurancePeriodLabel = new Label(new XPATH('//span[text() = "Период страхования:"]/following::span'), 'policy insurance period label');
    this.#applicantTypeDropdownButton = new Label(new XPATH('//label[contains(text(), "Заявитель")]/..//div[@class = "multiselect__tags"]'), 'applicant type dropdown button');
    this.#applicantTypeDropdownElement = new Label(new XPATH('//label[contains(text(), "Заявитель")]/../div//span[contains(@class, "multiselect__option")]/span'), 'applicant type dropdown element');
    this.#applicantTypeDropdownChosenElement = new Label(new XPATH('//label[contains(text(), "Заявитель")]/../div//span[contains(@class, "multiselect__single")]'), 'applicant type dropdown chosen element');
    this.#PDLCheckbox = new Checkbox(new XPATH('//input[@id = "IsPdl"]'), 'PDL checkbox');
    this.#PDLDocumentFrontUploadButton = new Button(new XPATH('//div[contains(text(), "Лицевая сторона")]/../../input[@type = "file"]'), 'PDL document front upload button');
    this.#PDLDocumentBackUploadButton = new Button(new XPATH('//div[contains(text(), "Обратная сторона")]/../../input[@type = "file"]'), 'PDL document back upload button');
    this.#directClaimCheckbox = new Checkbox(new XPATH('//input[@id = "direct_bool"]'), 'direct claim checkbox');
    this.#locationDescriptionTextbox = new Textbox(new XPATH('//label[@for = "location_description"]/following-sibling::textarea'), 'location description textbox');
    this.#IEDescriptionTextbox = new Textbox(new XPATH('//label[@for = "description"]/following-sibling::textarea'), 'IE description textbox');
    this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
  }

  getApplicantFullName() {
    return this.#applicantFullNameLabel.getText();
  }

  getPolicyNumberLabelText() {
    return this.#policyNumberLabel.getText();
  }

  getPolicyInsurancePeriodLabelText() {
    return this.#policyInsurancePeriodLabel.getText();
  }

  chooseRandomApplicantType() {
    this.#applicantTypeDropdownButton.chooseRandomElementsFromDropdownByText(
      this.#applicantTypeDropdownElement,
    );
  }

  getChosenApplicantType() {
    return this.#applicantTypeDropdownChosenElement.getText();
  }

  clickPDLCheckbox() {
    this.#PDLCheckbox.clickElement();
  }

  uploadPDLDocumentFront() {
    this.#PDLDocumentFrontUploadButton.uploadFile(JSONLoader.testData.PDLDocumentFrontFilePath);
  }

  uploadPDLDocumentBack() {
    this.#PDLDocumentBackUploadButton.uploadFile(JSONLoader.testData.PDLDocumentBackFilePath);
  }

  chooseRandomTerritory() {
    this.#territoryDropdownButton = new Label(new XPATH(this.#territoryDropdownButtonXPATH), 'territory dropdown button');
    this.#territoryDropdownElement = new Label(new XPATH(this.#territoryDropdownElementXPATH), 'territory dropdown element');
    this.#territoryDropdownButton.scrollElementToView();
    this.#territoryDropdownButton.chooseRandomElementsFromDropdownByText(
      this.#territoryDropdownElement,
    );
  }

  /* eslint-disable no-plusplus */
  recursivelyChooseTerritories() {
    const requestAlias = `arTerritories${this.#interceptCounter++}`;

    cy.intercept(JSONLoader.testData.getArTerritoriesRequest).as(requestAlias);

    this.chooseRandomTerritory();

    return this.getTerritoryDropdownChosenElement()
      .then((territory) => cy.wait(`@${requestAlias}`)
        .then((interception) => {
          const territoryHasChildElements = (
            Array.isArray(interception.response.body.data)
            && interception.response.body.data.length > 0
          );

          if (territoryHasChildElements) {
            return this.recursivelyChooseTerritories()
              .then((territoryFromPromise) => `${territory}, ${territoryFromPromise}`);
          }

          return territory;
        }));
  }

  randomlyClickDirectClaimCheckbox() {
    this.#directClaimCheckbox.scrollElementToView();
    if (Randomizer.getRandomInteger(1)) this.#directClaimCheckbox.clickElement();
  }

  inputLocationDescription(text) {
    this.#locationDescriptionTextbox.scrollElementToView();
    this.#locationDescriptionTextbox.inputData(text);
  }

  inputIEDescription(text) {
    this.#IEDescriptionTextbox.scrollElementToView();
    this.#IEDescriptionTextbox.inputData(text);
  }

  clickNextButton() {
    this.#nextButton.scrollElementToView();
    this.#nextButton.clickElement();
  }

  getTerritoryDropdownChosenElement() {
    this.#territoryDropdownChosenElement = new Label(new XPATH(this.#territoryDropdownChosenElementXPATH), 'territory dropdown chosen element label');
    return this.#territoryDropdownChosenElement.getText();
  }
}

module.exports = new ClaimCreateStep2();
