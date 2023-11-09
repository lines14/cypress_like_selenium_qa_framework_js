const BaseForm = require('../../main/baseForm');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');

class PolicyRequestFormOGPO extends BaseForm {
    #phoneBox;
    #nextButton;
    #SMSCodeBox;
    #IINBox;
    #emailBox;
    #saveButton;
    
    constructor(startDate) {
        super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'OGPO policy request page');
        this.#phoneBox = new Textbox(new XPATH('//label[contains(text(), "Номер телефона")]//parent::div[@class="form-item"]//following-sibling::input[@type="tel"]'), 'phone');
        this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
        this.#SMSCodeBox = new Textbox(new XPATH('//label[contains(text(), "SMS-код")]//parent::div[@class="form-item"]//following-sibling::input[@type="number"]'), 'SMS code box');
        this.#IINBox = new Textbox(new XPATH('//input[@id="iinOgpo"]'), 'IIN');
        this.#emailBox = new Textbox(new XPATH('//label[contains(text(), "Email")]//parent::div[@class="form-item"]//following-sibling::input[@type="text"]'), 'email');
        this.#saveButton = new Button(new XPATH('//button[contains(text(), "Сохранить")]'), 'save button');
    }

    inputPhone() {
        this.#phoneBox.inputData(JSONLoader.testData.clientPhone);
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

    clickSaveButton() {
        this.#saveButton.clickElement();
    }
}

module.exports = new PolicyRequestFormOGPO();