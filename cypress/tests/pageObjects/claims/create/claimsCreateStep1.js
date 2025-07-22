const BaseForm = require('../../../../main/baseForm');
const XPATH = require('../../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../../main/elements/baseElementChildren/label');
const Button = require('../../../../main/elements/baseElementChildren/button');
const DataUtils = require('../../../../main/utils/data/dataUtils');
const FakeDataGenerator = require('../../../../main/utils/random/fakeDataGenerator');

class ClaimsCreateStep1 extends BaseForm {
  #policyNumberBox;

  #ieDateCalendar;

  #ieDateCalendarIcon;

  #checkButton;

  #warningMessage;

  constructor() {
    super(new XPATH('//input[@id = "policy_number"]'), 'claims create step 1 page');
    this.#policyNumberBox = new Label(new XPATH('//input[@id = "policy_number"]'), 'policy number textbox');
    this.#ieDateCalendar = new Label(new XPATH('//input[@name="date"]'), 'insurance event date calendar');
    this.#ieDateCalendarIcon = new Label(new XPATH('//span[contains(text(), "Дата страхового случая")]/following::img/parent::div'), 'insurance event date calendar icon');
    this.#checkButton = new Button(new XPATH('//button[contains(text(), "Проверить")]'), 'check button');
    this.#warningMessage = new Button(new XPATH('//div[contains(@class, "toasted-container")]'), 'warning message');
  }

  inputContractNumber(contractNumber) {
    this.#policyNumberBox.clearData();
    this.#policyNumberBox.inputData(contractNumber);
  }

  inputInsuranceEventDate(IEDate) {
    this.#ieDateCalendar.clearData();
    this.#ieDateCalendar.inputData(IEDate);
    this.#ieDateCalendarIcon.clickElement();
  }

  clickCheckButton() {
    this.#checkButton.clickElement();
  }

  warningMessageIsDisplayed() {
    return this.#warningMessage.elementIsDisplayed();
  }

  inputContractNumberWithIEDateAndCheckWithRecursiveRetries() {
    const policyData = DataUtils.prepareRandomizedPolicyData();
    const IEDate = FakeDataGenerator.generateInsuranceEventDate(policyData.policyDateBegin);
    this.inputContractNumber(policyData.policyNumber);
    this.inputInsuranceEventDate(IEDate);
    this.clickCheckButton();
    cy.setLocalStorage('policyData', JSON.stringify(policyData));
    cy.setLocalStorage('IEDate', IEDate);
    this.waitLoaderDisappearing().should('be.true');
    this.warningMessageIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) {
        this.inputContractNumberWithIEDateAndCheckWithRecursiveRetries();
      }
    });
  }
}

module.exports = new ClaimsCreateStep1();
