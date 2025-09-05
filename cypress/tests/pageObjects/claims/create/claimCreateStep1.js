const BaseForm = require('../../../../main/baseForm');
const XPATH = require('../../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../../main/elements/baseElementChildren/label');
const Button = require('../../../../main/elements/baseElementChildren/button');
const DataUtils = require('../../../../main/utils/data/dataUtils');
const FakeDataGenerator = require('../../../../main/utils/random/fakeDataGenerator');

class ClaimCreateStep1 extends BaseForm {
  #policyNumberBox;

  #ieDateCalendar;

  #ieDateCalendarIcon;

  #checkButton;

  #warningMessage;

  #warningMessageCloseButton;

  constructor() {
    super(new XPATH('//input[@id = "policy_number"]'), 'claims create step 1 page');
    this.#policyNumberBox = new Label(new XPATH('//input[@id = "policy_number"]'), 'policy number textbox');
    this.#ieDateCalendar = new Label(new XPATH('//input[@name="date"]'), 'insurance event date calendar');
    this.#ieDateCalendarIcon = new Label(new XPATH('//span[contains(text(), "Дата страхового случая")]/following::img/parent::div'), 'insurance event date calendar icon');
    this.#checkButton = new Button(new XPATH('//button[contains(text(), "Проверить")]'), 'check button');
    this.#warningMessage = new Button(new XPATH('//div[contains(@class, "toasted-container")]'), 'warning message');
    this.#warningMessageCloseButton = new Button(new XPATH('//a[contains(@class, "close-toast-btn")]'), 'warning message close button');
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

  clickWarningMessageCloseButton() {
    return this.#warningMessageCloseButton.clickElement();
  }

  inputContractNumberWithIEDateAndCheckWithRecursiveRetries() {
    const policyData = DataUtils.prepareRandomizedPolicyData();
    const IEDate = FakeDataGenerator.generateInsuranceEventDate(policyData.policyDateBegin);
    this.inputContractNumber(policyData.policyNumber);
    this.inputInsuranceEventDate(IEDate);
    this.clickCheckButton();
    this.waitLoaderDisappearing().should('be.true');

    return this.warningMessageIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) {
        this.clickWarningMessageCloseButton();
        return this.inputContractNumberWithIEDateAndCheckWithRecursiveRetries();
      }

      return cy.wrap({ policyData, IEDate });
    });
  }
}

module.exports = new ClaimCreateStep1();
