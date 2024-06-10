const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');
const Button = require('../../main/elements/baseElementChildren/button');

class PaymentChooseForm extends BaseForm {
  #kaspiPayButton;

  #paymentCode;

  #mainPageButton;

  #epayButton;

  constructor() {
    super(new XPATH('//button[contains(text(), "Kaspi")]'), 'payment choose form');
    this.#kaspiPayButton = new Button(new XPATH('//button[contains(@class, "-red")]'), 'Kaspi pay button');
    this.#paymentCode = new Label(new XPATH('//div[contains(@class, "success__subtitle")]//descendant-or-self::node()[span]//span'), 'payment code');
    this.#mainPageButton = new Button(new XPATH('//a[contains(@class, "-green") and not(contains(@href, "kaspi")) and not(contains(text(), "Скопировать"))]'), 'main page button');
    this.#epayButton = new Button(new XPATH('//button[contains(translate(text(), "КАРТОЙ", "картой"), "картой")]'), 'Epay button');
  }

  clickKaspiPayButton() {
    this.#kaspiPayButton.clickElement();
  }

  getPaymentCode() {
    return this.#paymentCode.getText();
  }

  clickMainPageButton() {
    this.#mainPageButton.clickElement();
  }

  clickEpayButton() {
    this.#epayButton.clickElement();
  }
}

module.exports = new PaymentChooseForm();
