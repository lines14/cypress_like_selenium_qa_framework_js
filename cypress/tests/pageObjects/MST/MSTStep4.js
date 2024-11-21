const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../main/elements/baseElementChildren/label');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const Checkbox = require('../../../main/elements/baseElementChildren/checkbox');

class MSTStep4 extends BaseForm {
  #displayedPolicyCost;

  #displayedPolicyDiscount;

  #nextButton;

  #phoneBox;

  #SMSCodeBox;

  #acceptanceCheckbox;

  #sumToPay;

  constructor() {
    super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'MST policy request page');
    this.#displayedPolicyCost = new Label(new XPATH('//span[contains(text(), "Стоимость полиса")]//following-sibling::span'), 'displayed policy cost');
    this.#displayedPolicyDiscount = new Label(new XPATH('//span[contains(text(), "Ваша скидка")]//following-sibling::span'), 'displayed policy discount');
    this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
    this.#phoneBox = new Textbox(new XPATH('//label[contains(text(), "Номер телефона")]//following-sibling::input[@type="tel"]'), 'phone');
    this.#SMSCodeBox = new Textbox(new XPATH('//label[contains(text(), "SMS-код")]//following-sibling::input[@type="text"]'), 'SMS code');
    this.#acceptanceCheckbox = new Checkbox(new XPATH('//input[@type="checkbox" and @id="check1"]'), 'acceptance checkbox');
    this.#sumToPay = new Label(new XPATH('//h6[contains(text(), "Общая сумма")]//following-sibling::h6[contains(text(), "₸")]'), 'sum to pay');
  }

  getTotalCostFromDisplayedValues() {
    return this.#displayedPolicyCost.getText()
      .then((cost) => this.#displayedPolicyDiscount.getText()
        .then((discount) => Number(cost.slice(0, -1).replace(/₸| /g, '')) + Number(discount.slice(0, -1).replace(/₸| /g, ''))));
  }

  clickNextButton() {
    this.#nextButton.clickElement();
  }

  inputPhone(phone) {
    this.#phoneBox.inputData(phone);
  }

  getSMSCodeBoxElement() {
    return this.#SMSCodeBox.getElement();
  }

  enterSMSCode(code) {
    this.#SMSCodeBox.enterData(code);
  }

  clickAcceptanceCheckbox() {
    this.#acceptanceCheckbox.clickElement();
  }

  getSumToPay() {
    return this.#sumToPay.getText().then((text) => text.slice(0, -1).replace(/₸| /g, ''));
  }
}

module.exports = new MSTStep4();
