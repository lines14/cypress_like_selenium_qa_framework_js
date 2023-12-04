const BaseForm = require('../../main/baseForm');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');

class EpayPage extends BaseForm {
    #amount;
    #cardNumberBox;
    #expireMonthBox;
    #expireYearBox;
    #CVCBox;
    #cardNameBox;
    #emailBox;
    #payButton;
    #status;
    #closeButton;

    constructor() {
        super(new XPATH('//td[contains(text(), "На проведение платежа выделяется")]'), 'Epay page');
        this.#amount = new Label(new XPATH('//div[@class="amount"]//span'), 'amount to pay');
        this.#cardNumberBox = new Textbox(new XPATH('//input[@name="cardnumber"]'), 'card number');
        this.#expireMonthBox = new Textbox(new XPATH('//input[@name="ccmonth"]'), 'expire month');
        this.#expireYearBox = new Textbox(new XPATH('//input[@name="ccyear"]'), 'expire year');
        this.#CVCBox = new Textbox(new XPATH('//input[@name="cvc"]'), 'CVC');
        this.#cardNameBox = new Textbox(new XPATH('//input[@name="ccname"]'), 'card name');
        this.#emailBox = new Textbox(new XPATH('//input[@name="email"]'), 'email');
        this.#payButton = new Button(new XPATH('//span[contains(text(), "Оплатить")]'), 'pay button');
        this.#status = new Label(new XPATH('//div[@class="status"]'), 'payment status');
        this.#closeButton = new Button(new XPATH('//a[contains(text(), "Закрыть")]'), 'close button');
    }

    getAmountToPay() {
        return this.#amount.getText();
    }

    inputPaymentInfo() {
        this.#cardNumberBox.inputData(JSONLoader.testData.clientCardNumber);
        this.#expireMonthBox.forceInputData(JSONLoader.testData.clientCardExpMonth);
        this.#expireYearBox.forceInputData(JSONLoader.testData.clientCardExpYear);
        this.#CVCBox.inputData(JSONLoader.testData.clientCardCVC);
        this.#cardNameBox.inputData(`${JSONLoader.testData.clientFirstNameLatin} ${JSONLoader.testData.clientSecondNameLatin}`);
        this.#emailBox.inputData(JSONLoader.testData.clientEmail);
    }

    clickPayButton() {
        this.#payButton.clickElement();
    }

    getPaymentStatus() {
        return this.#status.getElement();
    }

    clickCloseButton() {
        this.#closeButton.clickElement();
    }
}

module.exports = new EpayPage();