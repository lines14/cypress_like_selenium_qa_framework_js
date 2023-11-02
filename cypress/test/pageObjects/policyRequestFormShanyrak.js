const BaseForm = require('../../main/baseForm');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');

class PolicyRequestFormShanyrak extends BaseForm {
    #nextButton;
    #phoneBox;
    #SMSCodeBox;
    #IINBox;
    #emailBox;

    constructor() {
        super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'shanyrak policy request page');
        this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
        this.#phoneBox = new Textbox(new XPATH('//label[contains(text(), "Номер телефона")]//parent::div[@class="form-item"]//following-sibling::input[@type="tel"]'), 'phone');
        this.#SMSCodeBox = new Textbox(new XPATH('//label[contains(text(), "SMS-код")]//parent::div[@class="form-item"]//following-sibling::input[@type="number"]'), 'sms code box');
        this.#IINBox = new Textbox(new XPATH('//input[@id="iinHome"]'), 'iin');
        this.#emailBox = new Textbox(new XPATH('//label[contains(text(), "Email")]//parent::div[@class="form-item"]//following-sibling::input[@type="text"]'), 'email');
    }

    clickNextButton() {
        this.#nextButton.clickElement();
    }

    inputPhone() {
        this.#phoneBox.inputData(JSONLoader.testData.clientPhone);
    }

    getSMSCodeBoxElement() {
        return this.#SMSCodeBox.getElement();
    }

    enterSMSCode(code) {
        this.#SMSCodeBox.enterData(code);
    }

    inputIIN() {
        this.#IINBox.multipleClickElement(3);
        this.#IINBox.inputData(JSONLoader.testData.clientIIN);
    }

    clearPreviousEmail() {
        this.#emailBox.clearData();
    }

    inputEmail() {
        this.#emailBox.inputData(JSONLoader.testData.clientEmail);
    }
}

module.exports = new PolicyRequestFormShanyrak();