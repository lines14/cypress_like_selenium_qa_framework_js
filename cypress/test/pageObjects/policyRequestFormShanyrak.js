const BaseForm = require('../../main/baseForm');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');
const Checkbox = require('../../main/elements/baseElementChildren/checkbox');

class PolicyRequestFormShanyrak extends BaseForm {
    #nextButton;
    #phoneBox;
    #SMSCodeBox;
    #IINBox;
    #emailBox;
    #citiesDropdownButton;
    #citiesDropdownElements;
    #insuranceObjectAddressStreetBox;
    #privateHomeCheckbox;
    #insuranceObjectAddressHouseNumberBox;
    #insuranceObjectAddressApartmentNumberBox;

    constructor() {
        super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'shanyrak policy request page');
        this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
        this.#phoneBox = new Textbox(new XPATH('//label[contains(text(), "Номер телефона")]//parent::div[@class="form-item"]//following-sibling::input[@type="tel"]'), 'phone');
        this.#SMSCodeBox = new Textbox(new XPATH('//label[contains(text(), "SMS-код")]//parent::div[@class="form-item"]//following-sibling::input[@type="number"]'), 'sms code box');
        this.#IINBox = new Textbox(new XPATH('//input[@id="iinHome"]'), 'iin');
        this.#emailBox = new Textbox(new XPATH('//label[contains(text(), "Email")]//parent::div[@class="form-item"]//following-sibling::input[@type="text"]'), 'email');
        this.#citiesDropdownButton = new Button(new XPATH('//span[contains(text(), "Город")]//parent::div[@class="form-item"]//following-sibling::div[contains(@class, "multiselect")]//div[@class="multiselect__select"]'), 'cities dropdown');
        this.#citiesDropdownElements = new Button(new XPATH('//span[contains(text(), "Город")]//parent::div[@class="form-item"]//following-sibling::div[@class="multiselect__content-wrapper"]//descendant::li[@class="multiselect__element"]//span[contains(@class, "multiselect__option")]//span'), 'cities dropdown elements');
        this.#insuranceObjectAddressStreetBox = new Textbox(new XPATH('//label[contains(text(), "Улица / проспект / микрорайон")]//parent::div[@class="form-item"]//following-sibling::input'), 'insurance object address street');
        this.#privateHomeCheckbox = new Checkbox(new XPATH('//label[contains(text(), "Частный дом")]'), 'private home checkbox');
        this.#insuranceObjectAddressHouseNumberBox = new Textbox(new XPATH('//label[contains(text(), "Дом")]//parent::div[@class="form-item"]//following-sibling::input'), 'insurance object address house number');
        this.#insuranceObjectAddressApartmentNumberBox = new Textbox(new XPATH('//label[contains(text(), "Квартира")]//parent::div[@class="form-item"]//following-sibling::input'), 'insurance object address apartment number');
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

    selectRandomCity() {
        cy.scrollTo('center');
        this.#citiesDropdownElements.clickRandomElementsFromDropdownByText(this.#citiesDropdownButton);
    }

    inputInsuranceObjectAddressStreet() {
        this.#insuranceObjectAddressStreetBox.multipleClickElement(3);
        this.#insuranceObjectAddressStreetBox.inputData(JSONLoader.testData.insuranceObjectAddressStreet);
    }

    randomClickPrivateHomeCheckbox() {
        this.#privateHomeCheckbox.clickCheckboxesByText();
    }

    inputInsuranceObjectAddressHouseNumber() {
        this.#insuranceObjectAddressHouseNumberBox.multipleClickElement(3);
        this.#insuranceObjectAddressHouseNumberBox.inputData(JSONLoader.testData.insuranceObjectAddressHouseNumber);
    }

    inputInsuranceObjectAddressApartmentNumber() {
        this.#insuranceObjectAddressApartmentNumberBox.elementIsDisplayed().then((isDisplayed) => {
            if (isDisplayed) {
                this.#insuranceObjectAddressApartmentNumberBox.multipleClickElement(3);
                this.#insuranceObjectAddressApartmentNumberBox.inputData(JSONLoader.testData.insuranceObjectAddressApartmentNumber);
            }
        });
    }
}

module.exports = new PolicyRequestFormShanyrak();