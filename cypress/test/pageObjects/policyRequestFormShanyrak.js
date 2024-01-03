const BaseForm = require('../../main/baseForm');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const Randomizer = require('../../main/utils/random/randomizer');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');
const Checkbox = require('../../main/elements/baseElementChildren/checkbox');

class PolicyRequestFormShanyrak extends BaseForm {
    #nextButton;
    #phoneBox;
    #SMSCodeBox;
    #IINBox;
    #selectedClientName;
    #emailBox;
    #citiesDropdownButton;
    #citiesDropdownElements;
    #insuranceObjectAddressStreetBox;
    #privateHomeCheckboxWrapper;
    #privateHomeCheckboxLabel;
    #insuranceObjectAddressHouseNumberBox;
    #insuranceObjectAddressApartmentNumberBox;
    #confirmationCheckbox;
    #calendarButton;
    #startDateButton;
    #calendarRightArrowButton;
    #saveButton;
    #acceptanceCheckbox;
    #kaspiPayButton;
    #orderPayment;
    #price;
    #sumToPay;
    #paymentNumber;
    #epayButton;
    #mainPageButton;

    constructor(startDate) {
        super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'Shanyrak policy request page');
        this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
        this.#phoneBox = new Textbox(new XPATH('//label[contains(text(), "Номер телефона")]//following-sibling::input[@type="tel"]'), 'phone');
        this.#SMSCodeBox = new Textbox(new XPATH('//label[contains(text(), "SMS-код")]//following-sibling::input[@type="number"]'), 'SMS code');
        this.#IINBox = new Textbox(new XPATH('//input[@id="iinHome"]'), 'IIN');
        this.#selectedClientName = new Label(new XPATH('//span[@class="subtitle-16 -green"]'), 'selected client name');
        this.#emailBox = new Textbox(new XPATH('//label[contains(text(), "Email")]//following-sibling::input[@type="text"]'), 'email');
        this.#citiesDropdownButton = new Button(new XPATH('//span[contains(text(), "Город")]//following-sibling::div[contains(@class, "multiselect")]//div[@class="multiselect__select"]'), 'cities dropdown');
        this.#citiesDropdownElements = new Button(new XPATH('//span[contains(text(), "Город")]//parent::div[@class="form-item"]//following-sibling::div[@class="multiselect__content-wrapper"]//descendant::li[@class="multiselect__element"]//span[contains(@class, "multiselect__option")]//span'), 'cities dropdown elements');
        this.#insuranceObjectAddressStreetBox = new Textbox(new XPATH('//label[contains(text(), "Улица / проспект / микрорайон")]//following-sibling::input'), 'insurance object address street');
        this.#privateHomeCheckboxWrapper = new Label(new XPATH('//label[contains(text(), "Частный дом")]//parent::div[contains(@class, "item")]'), 'private home checkbox wrapper');
        this.#privateHomeCheckboxLabel = new Label(new XPATH('//label[contains(text(), "Частный дом")]'), 'private home checkbox');
        this.#insuranceObjectAddressHouseNumberBox = new Textbox(new XPATH('//label[contains(text(), "Дом")]//following-sibling::input'), 'insurance object address house number');
        this.#insuranceObjectAddressApartmentNumberBox = new Textbox(new XPATH('//label[contains(text(), "Квартира")]//following-sibling::input'), 'insurance object address apartment number');
        this.#confirmationCheckbox = new Checkbox(new XPATH('//input[@type="checkbox" and @id="check2"]'), 'confirmation checkbox');
        this.#startDateButton = new Button(new XPATH(`//td[@title="${startDate}"]`), 'start date');
        this.#calendarRightArrowButton = new Button(new XPATH('//button[contains(@class, "mx-btn-icon-right")]//i'), 'right calendar arrow button');
        this.#calendarButton = new Button(new XPATH('//span[contains(text(), "Дата начала договора")]//following-sibling::div[@class="form-item__icon"]'), 'calendar button');
        this.#saveButton = new Button(new XPATH('//button[contains(text(), "Сохранить")]'), 'save button');
        this.#acceptanceCheckbox = new Checkbox(new XPATH('//input[@type="checkbox" and @id="familiarized"]'), 'acceptance checkbox');
        this.#kaspiPayButton = new Button(new XPATH('//button[contains(@class, "-red")]'), 'Kaspi pay button');
        this.#orderPayment = new Label(new XPATH('//p[contains(text(), "Оплата заказа")]'), 'order payment');
        this.#price = new Label(new XPATH('//div[@class="text" and contains(normalize-space(), "Фиксированная стоимость")]//preceding-sibling::div[@class="price"]'), 'price');
        this.#sumToPay = new Label(new XPATH('//h6[contains(text(), "Общая сумма")]//following-sibling::h6[contains(text(), "₸")]'), 'sum to pay');
        this.#paymentNumber = new Label(new XPATH('//div[contains(text(), "номер оплаты на Kaspi")]//b'), 'payment number');
        this.#epayButton = new Button(new XPATH('//button[contains(text(), "картой")]'), 'Epay button');
        this.#mainPageButton = new Button(new XPATH('//a[contains(text(), "На главную")]'), 'main page button');
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
        this.#IINBox.inputData(JSONLoader.testData.clientIIN);
    }

    getSlicedSelectedClientName() {
        return this.#selectedClientName.getText().then((text) => {
            const nameList = text.split(' ').reverse().slice(1);
            nameList.push(nameList.pop().slice(0, 1));
            return nameList.join(' ');
        });
    }

    inputEmail() {
        this.#emailBox.clearData();
        this.#emailBox.inputData(JSONLoader.testData.clientEmail);
    }

    selectRandomCity() {
        cy.scrollTo('center');
        this.#citiesDropdownElements.clickRandomElementsFromDropdownByText(this.#citiesDropdownButton);
    }

    inputInsuranceObjectAddressStreet() {
        this.#insuranceObjectAddressStreetBox.inputData(JSONLoader.testData.insuranceObjectAddressStreet);
    }

    randomClickPrivateHomeCheckbox() {
        this.#privateHomeCheckboxLabel.clickCheckboxesByText();
    }

    inputInsuranceObjectAddressHouseNumber() {
        this.#insuranceObjectAddressHouseNumberBox.inputData(JSONLoader.testData.insuranceObjectAddressHouseNumber);
    }

    inputInsuranceObjectAddressApartmentNumber() {
        this.#privateHomeCheckboxWrapper.getAttributeValue('value').then((value) => {
            this.#insuranceObjectAddressApartmentNumberBox.elementIsDisplayed().then((isDisplayed) => {
                if (!Boolean(value) && isDisplayed) {
                    this.#insuranceObjectAddressApartmentNumberBox.inputData(JSONLoader.testData.insuranceObjectAddressApartmentNumber);
                }
            });
        });
    }

    clickConfirmationCheckbox() {
        this.#confirmationCheckbox.clickElement();
    }

    inputRandomStartDate() {
        const dates = Randomizer.getRandomDatesIntervalFromTomorrow(...JSONLoader.testData.timeIncrement);
        const newInstance = new PolicyRequestFormShanyrak(dates.startDate);
        this.#calendarButton.flipCalendarIfNotContainsDate(this.#calendarRightArrowButton, dates.startMonthDifference);
        newInstance.#startDateButton.clickElement();
    }

    clickSaveButton() {
        this.#saveButton.clickElement();
    }

    clickAcceptanceCheckbox() {
        this.#acceptanceCheckbox.clickElement();
    }

    clickKaspiPayButton() {
        this.#kaspiPayButton.clickElement();
    }

    getOrderPaymentElement() {
        return this.#orderPayment.getElement();
    }

    getPrice() {
        return this.#price.getText().then((text) => text.slice(0, -1).replace(/₸| /g, ''));
    }

    getSumToPay() {
        return this.#sumToPay.getText().then((text) => text.slice(0, -1).replace(/₸| /g, ''));
    }

    getPaymentNumber() {
        this.#paymentNumber.getElement();
        return this.#paymentNumber.getText();
    }

    clickEpayButton() {
        this.#epayButton.clickElement();
    }

    clickMainPageButton() {
        this.#mainPageButton.clickElement();
    }
}

module.exports = new PolicyRequestFormShanyrak();