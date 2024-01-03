const BaseForm = require('../../main/baseForm');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const Randomizer = require('../../main/utils/random/randomizer');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');
const Checkbox = require('../../main/elements/baseElementChildren/checkbox');

class policyRequestFormMutualOGPO extends BaseForm {
    #phoneBox;
    #nextButton;
    #SMSCodeBox;
    #IINBox;
    #selectedClientName;
    #displayedClientName;
    #emailBox;
    #addressBox;
    #saveButton;
    #carNumberBox;
    #carRegistrationBox;
    #searchButton;
    #displayedCarNumber;
    #selectedCarModel;
    #selectedCarManufacturedYear;
    #calendarButton;
    #calendarRightArrowButton;
    #startDateButton;
    #selectedDate;
    #displayedDate;
    #moreLink;
    #SMSNotifyCheckboxLabel;
    #calculateButton;
    #familiarizedCheckbox;
    #mutualStateCheckbox;
    #mutualInfoAgreedCheckbox;
    #selectedOGPOCost;
    #selectedMutualCost;
    #sumToPay;
    #kaspiPayButton;
    #epayButton;
    #paymentNumber;
    #OGPOPageButton;
    
    constructor(startDate) {
        super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'OGPO policy request page');
        this.#phoneBox = new Textbox(new XPATH('//label[contains(text(), "Номер телефона")]//following-sibling::input[@type="tel"]'), 'phone');
        this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
        this.#SMSCodeBox = new Textbox(new XPATH('//label[contains(text(), "SMS-код")]//following-sibling::input[@type="number"]'), 'SMS code');
        this.#IINBox = new Textbox(new XPATH('//input[@id="iinOgpo"]'), 'IIN');
        this.#selectedClientName = new Label(new XPATH('//span[@class="form-fio"]'), 'selected client name');
        this.#displayedClientName = new Label(new XPATH('//span[contains(text(), "Водители:")]//following-sibling::div[@class="text-14"]//span'), 'displayed client name');
        this.#emailBox = new Textbox(new XPATH('//label[contains(text(), "Email")]//following-sibling::input[@type="text"]'), 'email');
        this.#addressBox = new Textbox(new XPATH('//label[contains(text(), "Адрес")]//following-sibling::input[@type="text"]'), 'address');
        this.#saveButton = new Button(new XPATH('//button[contains(text(), "Сохранить")]'), 'save button');
        this.#carNumberBox = new Textbox(new XPATH('//label[contains(text(), "Гос. номер")]//following-sibling::input'), 'car number');
        this.#carRegistrationBox = new Textbox(new XPATH('//label[contains(text(), "Номер техпаспорта")]//following-sibling::input'), 'car registration');
        this.#searchButton = new Button(new XPATH('//button[contains(text(), "Поиск")]'), 'search button');
        this.#displayedCarNumber = new Label(new XPATH('//span[contains(text(), "Транспорт:")]//following-sibling::div[@class="text-14"]//span'), 'displayed car number');
        this.#selectedCarModel = new Label(new XPATH('//span[@class="subtitle-16 -orange"]'), 'selected car model');
        this.#selectedCarManufacturedYear = new Label(new XPATH('//span[@class="subtitle-16 -grey"]'), 'selected car manufactured year');
        this.#calendarButton = new Button(new XPATH('//span[contains(text(), "Дата начала договора")]//following-sibling::div[@class="mx-datepicker"]'), 'calendar button');
        this.#calendarRightArrowButton = new Button(new XPATH('//button[contains(@class, "mx-btn-icon-right")]//i'), 'right calendar arrow button');
        this.#startDateButton = new Button(new XPATH(`//td[@title="${startDate}"]`), 'start date');
        this.#selectedDate = new Button(new XPATH('//input[@name="date"]'), 'selected date');
        this.#displayedDate = new Label(new XPATH('//span[contains(text(), "Дата начала:")]//following-sibling::div[@class="text-14"]//span'), 'displayed date');
        this.#moreLink = new Button(new XPATH('//span[contains(text(), "Еще")]'), 'more link');
        this.#SMSNotifyCheckboxLabel = new Label(new XPATH('//label[contains(text(), "Получить уведомление через СМС")]'), 'SMS notify checkbox');
        this.#calculateButton = new Button(new XPATH('//button[@class="button -green right dt"]'), 'calculate button');
        this.#familiarizedCheckbox = new Checkbox(new XPATH('//input[@type="checkbox" and @id="familiarized"]'), 'familiarized checkbox');
        this.#mutualStateCheckbox = new Checkbox(new XPATH('//input[@type="checkbox" and @id="mutual_state"]'), 'mutual state checkbox');
        this.#mutualInfoAgreedCheckbox = new Checkbox(new XPATH('//input[@type="checkbox" and @id="mutual_info_agreed"]'), 'mutual info agreed checkbox');
        this.#selectedOGPOCost = new Label(new XPATH('//span[contains(text(), "Стоимость полиса ОС ГПО ВТС")]//following-sibling::span'), 'selected OGPO cost');
        this.#selectedMutualCost = new Label(new XPATH('//span[contains(text(), "Стоимость Обоюдки")]//following-sibling::span'), 'selected Mutual cost');
        this.#sumToPay = new Label(new XPATH('//h6[contains(text(), "Общая сумма")]//following-sibling::h6[contains(text(), "₸")]'), 'sum to pay');
        this.#kaspiPayButton = new Button(new XPATH('//button[contains(@class, "-red")]'), 'Kaspi pay button');
        this.#epayButton = new Button(new XPATH('//button[contains(text(), "Оплатить картой")]'), 'Epay button');
        this.#paymentNumber = new Label(new XPATH('//div[contains(@class, "success__subtitle")]//span'), 'payment number');
        this.#OGPOPageButton = new Button(new XPATH('//span[contains(text(), "Вернуться в магазин")]'), 'OGPO page button');
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

    getTrimmedDisplayedClientName() {
        return this.#displayedClientName.getText().then((text) => text.trim());
    }

    getSelectedClientName() {
        return this.#selectedClientName.getText();
    }

    inputEmail() {
        this.#emailBox.clearData();
        this.#emailBox.inputData(JSONLoader.testData.clientEmail);
    }

    inputAddress() {
        this.#addressBox.elementIsDisplayed().then((isDisplayed) => {
            if (isDisplayed) {
                this.#addressBox.clearData();
                this.#addressBox.inputData(JSONLoader.testData.clientAddress);
            }
        });
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

    getTrimmedDisplayedCarNumber() {
        return this.#displayedCarNumber.getText().then((text) => text.trim());
    }

    getSelectedCarModel() {
        return this.#selectedCarModel.getText();
    }

    getSelectedCarManufacturedYearElement() {
        return this.#selectedCarManufacturedYear.getElement();
    }

    inputRandomStartDate() {
        const dates = Randomizer.getRandomDatesIntervalFromTomorrow(...JSONLoader.testData.timeIncrement);
        const newInstance = new policyRequestFormMutualOGPO(dates.startDate);
        this.#calendarButton.flipCalendarIfNotContainsDate(this.#calendarRightArrowButton, dates.startMonthDifference);
        newInstance.#startDateButton.clickElement();
    }

    getDisplayedDate() {
        return this.#displayedDate.getText();
    }

    getSelectedDate() {
        return this.#selectedDate.getElementsListText('value').then((list) => list.pop());
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

    clickKaspiPayButton() {
        this.#kaspiPayButton.clickElement();
    }

    clickEpayButton() {
        this.#epayButton.clickElement();
    }

    getPaymentNumber() {
        this.#paymentNumber.getElement();
        return this.#paymentNumber.getText();
    }

    clickOGPOPageButton() {
        this.#OGPOPageButton.clickElement();
    }
}

module.exports = new policyRequestFormMutualOGPO();