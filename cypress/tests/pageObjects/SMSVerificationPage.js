const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');

class SMSVerificationPage extends BaseForm {
  #phoneBox;

  #nextButton;

  #SMSCodeBox;

  constructor() {
    super(new XPATH('//div[contains(text(), "код по SMS для входа")]'), 'SMS verification page');
    this.#phoneBox = new Textbox(new XPATH('//label[contains(text(), "Номер телефона")]//following-sibling::input[@type="tel"]'), 'phone');
    this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
    this.#SMSCodeBox = new Textbox(new XPATH('//label[contains(text(), "SMS-код")]//following-sibling::input[@type="number"]'), 'SMS code');
  }

  inputPhone(phone) {
    this.#phoneBox.inputData(phone);
  }

  clickNextButton() {
    this.#nextButton.clickElement();
  }

  getSMSCodeBoxElement() {
    return this.#SMSCodeBox.getElement();
  }

  enterSMSCode(code) {
    this.#SMSCodeBox.enterData(code);
  }
}

module.exports = new SMSVerificationPage();
