const BaseForm = require('../../main/baseForm');
const Label = require('../../main/elements/baseElementChildren/label');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');
const configManager = require('../../main/utils/data/configManager');

class EpayPage extends BaseForm {
    constructor() {
        super('//td[contains(text(), "На проведение платежа выделяется")]', 'epay page');
        this.amount = new Label('//div[@class="amount"]//span', 'amount to pay');
        this.cardNumberBox = new Textbox('//input[@name="cardnumber"]', 'card number');
        this.expireMonthBox = new Textbox('//input[@name="ccmonth"]', 'expire month');
        this.expireYearBox = new Textbox('//input[@name="ccyear"]', 'expire year');
        this.CVCBox = new Textbox('//input[@name="cvc"]', 'cvc');
        this.emailBox = new Textbox('//input[@name="email"]', 'email');
        this.payButton = new Button('//span[contains(text(), "Оплатить")]', 'pay button');
        this.status = new Label('//div[@class="status"]', 'payment status');
        this.closeButton = new Button('//a[contains(text(), "Закрыть")]', 'close button');
    }

    getAmountToPay() {
        return this.amount.getText();
    }

    inputPaymentInfo() {
        this.cardNumberBox.inputData(configManager.getTestData().clientCardNumber);
        this.expireMonthBox.forceInputData(configManager.getTestData().clientCardExpMonth);
        this.expireYearBox.forceInputData(configManager.getTestData().clientCardExpYear);
        this.CVCBox.inputData(configManager.getTestData().clientCardCVC);
        this.emailBox.inputData(configManager.getTestData().clientEmail);
    }

    clickPayButton() {
        this.payButton.clickElement();
    }

    getPaymentStatus() {
        return this.status.getElement();
    }

    clickCloseButton() {
        this.closeButton.clickElement();
    }
}

module.exports = new EpayPage();