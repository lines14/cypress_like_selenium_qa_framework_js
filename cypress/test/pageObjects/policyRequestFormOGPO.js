const BaseForm = require('../../main/baseForm');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const Randomizer = require('../../main/utils/random/randomizer');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');
const Checkbox = require('../../main/elements/baseElementChildren/checkbox');

class PolicyRequestFormOGPO extends BaseForm {
    #phoneBox;
    #nextButton;
    #SMSCodeBox;
    #IINBox;
    #emailBox;
    #saveButton;
    #carNumberBox;
    #carRegistrationBox;
    #searchButton;
    #selectedCarModel;
    #calendarButton;
    #calendarRightArrowButton;
    #startDateButton;
    #moreLink;
    #SMSNotifyCheckboxLabel;
    #calculateButton;
    #familiarizedCheckbox;
    #mutualStateCheckbox;
    #mutualInfoAgreedCheckbox;
    #selectedOGPOCost;
    #selectedMutualCost;
    #sumToPay;
    
    constructor(startDate) {
        super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'OGPO policy request page');
        this.#phoneBox = new Textbox(new XPATH('//label[contains(text(), "Номер телефона")]//parent::div[@class="form-item"]//following-sibling::input[@type="tel"]'), 'phone');
        this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
        this.#SMSCodeBox = new Textbox(new XPATH('//label[contains(text(), "SMS-код")]//parent::div[@class="form-item"]//following-sibling::input[@type="number"]'), 'SMS code');
        this.#IINBox = new Textbox(new XPATH('//input[@id="iinOgpo"]'), 'IIN');
        this.#emailBox = new Textbox(new XPATH('//label[contains(text(), "Email")]//parent::div[@class="form-item"]//following-sibling::input[@type="text"]'), 'email');
        this.#saveButton = new Button(new XPATH('//button[contains(text(), "Сохранить")]'), 'save button');
        this.#carNumberBox = new Textbox(new XPATH('//label[contains(text(), "Гос. номер")]//parent::div[@class="form-item"]//following-sibling::input'), 'car number');
        this.#carRegistrationBox = new Textbox(new XPATH('//label[contains(text(), "Номер техпаспорта")]//parent::div[@class="form-item"]//following-sibling::input'), 'car registration');
        this.#searchButton = new Button(new XPATH('//button[contains(text(), "Поиск")]'), 'search button');
        this.#selectedCarModel = new Label(new XPATH('//span[@class="subtitle-16 -orange"]'), 'selected car model');
        this.#calendarButton = new Button(new XPATH('//span[contains(text(), "Дата начала договора")]//parent::div[@class="form-item"]//following-sibling::div[@class="mx-datepicker"]'), 'calendar button');
        this.#calendarRightArrowButton = new Button(new XPATH('//button[contains(@class, "mx-btn-icon-right")]//i'), 'right calendar arrow button');
        this.#startDateButton = new Button(new XPATH(`//td[@title="${startDate}"]`), 'start date');
        this.#moreLink = new Button(new XPATH('//span[contains(text(), "Еще")]'), 'more link');
        this.#SMSNotifyCheckboxLabel = new Label(new XPATH('//label[contains(text(), "Получить уведомление через СМС")]'), 'SMS notify checkbox');
        this.#calculateButton = new Button(new XPATH('//button[@class="button -green right dt"]'), 'calculate button');
        this.#familiarizedCheckbox = new Checkbox(new XPATH('//input[@type="checkbox" and @id="familiarized"]'), 'familiarized checkbox');
        this.#mutualStateCheckbox = new Checkbox(new XPATH('//input[@type="checkbox" and @id="mutual_state"]'), 'mutual state checkbox');
        this.#mutualInfoAgreedCheckbox = new Checkbox(new XPATH('//input[@type="checkbox" and @id="mutual_info_agreed"]'), 'mutual info agreed checkbox');
        this.#selectedOGPOCost = new Label(new XPATH('//span[contains(text(), "Стоимость полиса ОС ГПО ВТС")]//following-sibling::span'), 'selected OGPO cost');
        this.#selectedMutualCost = new Label(new XPATH('//span[contains(text(), "Стоимость Обоюдки")]//following-sibling::span'), 'selected Mutual cost');
        this.#sumToPay = new Label(new XPATH('//h6[contains(text(), "Общая сумма")]//following-sibling::h6[contains(text(), "₸")]'), 'sum to pay');
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

    clearPreviousEmail() {
        this.#emailBox.clearData();
    }

    inputEmail() {
        this.#emailBox.inputData(JSONLoader.testData.clientEmail);
    }

    clickSaveButton() {
        this.#saveButton.clickElement();
    }

    inputCarNumber() {
        this.#carNumberBox.inputData(JSONLoader.testData.carNumber);
    }

    inputCarRegistration() {
        this.#carRegistrationBox.inputData(JSONLoader.testData.carRegistration);
    }

    clickSearchButton() {
        this.#searchButton.clickElement();
    }

    getDisplayedCarModelElement() {
        return this.#selectedCarModel.getElement();
    }

    inputRandomStartDate() {
        const dates = Randomizer.getRandomDatesIntervalFromTomorrow();
        const newInstance = new PolicyRequestFormOGPO(dates.startDate);
        this.#calendarButton.flipCalendarIfNotContainsDate(this.#calendarRightArrowButton, dates.startMonthDifference);
        newInstance.#startDateButton.clickElement();
    }

    clickMoreLink() {
        this.#moreLink.clickElement();
    }

    randomClickSMSNotifyCheckbox() {
        this.#SMSNotifyCheckboxLabel.clickCheckboxesByText();
    }

    clickCalculateButton() {
        this.#calculateButton.clickElement();
    }

    clickFamiliarizedCheckbox() {
        this.#familiarizedCheckbox.clickElement();
    }

    clickMutualCheckboxes() {
        this.#mutualStateCheckbox.clickElement();
        this.#mutualInfoAgreedCheckbox.clickElement();
    }

    getTotalCostWithMutual() {
        let OGPOCost;
        return this.#selectedOGPOCost.getText()
        .then((cost) => OGPOCost = cost)
        .then(() => this.#selectedMutualCost.getText())
        .then((mutualCost) => {
            return Number(OGPOCost.slice(0, -1).replace(/₸| /g, '')) 
            + Number(mutualCost.slice(0, -1).replace(/₸| /g, ''));
        });
    }

    getSumToPay() {
        return this.#sumToPay.getText().then((text) => text.slice(0, -1).replace(/₸| /g, ''));
    }
}

module.exports = new PolicyRequestFormOGPO();