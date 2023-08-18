const BaseForm = require('../../main/baseForm');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');
const configManager = require('../../main/utils/data/configManager');

class EpayPage extends BaseForm {
    constructor() {
        super('//td[contains(text(), "На проведение платежа выделяется")]', 'epay page');
        this.cardNumberBox = new Textbox('//input[@name="cardnumber"]', 'card number');
        this.expireMonthBox = new Textbox('//input[@name="ccmonth"]', 'expire month');
        this.expireYearBox = new Textbox('//input[@name="ccyear"]', 'expire year');
        this.CVCBox = new Textbox('//input[@name="cvc"]', 'cvc');
        this.emailBox = new Textbox('//input[@name="email"]', 'email');
        this.payButton = new Button('//span[contains(text(), "Оплатить")]', 'pay button');
    }

    payWithEpay() {
        this.cardNumberBox.inputData(configManager.getTestData().clientCardNumber);
        this.expireMonthBox.inputData(configManager.getTestData().clientCardExpMonth);
        this.expireYearBox.inputData(configManager.getTestData().clientCardExpYear);
        this.CVCBox.inputData(configManager.getTestData().clientCardCVC);
        this.emailBox.inputData(configManager.getTestData().clientEmail);
        this.payButton.clickElement();
    }
}

module.exports = new EpayPage();