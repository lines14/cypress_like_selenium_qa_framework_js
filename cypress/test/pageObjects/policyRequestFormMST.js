const BaseForm = require('../../main/baseForm');
const Button = require('../../main/elements/baseElementChildren/button');
const Label = require('../../main/elements/baseElementChildren/label');
const Textbox = require('../../main/elements/baseElementChildren/textbox');
const Checkbox = require('../../main/elements/baseElementChildren/checkbox');
const randomizer = require('../../main/utils/random/randomizer');
const configManager = require('../../main/utils/data/configManager');

class PolicyRequestFormMST extends BaseForm {
    constructor(startDate, finishDate) {
        super('//h3[contains(text(), "Оформление полиса")]', 'policy request page');
        this.countriesDropdownButton = new Button('//input[@placeholder="Выберите страну"]//parent::div[@class="multiselect__tags"]//preceding-sibling::div[@class="multiselect__select"]', 'countries dropdown button');
        this.countriesDropdownElements = new Button('//input[@placeholder="Выберите страну"]//parent::div[@class="multiselect__tags"]//following-sibling::div[@class="multiselect__content-wrapper"]//descendant::li[@class="multiselect__element"]//span[@class="multiselect__option" or @class="multiselect__option multiselect__option--highlight"]//span', 'countries dropdown element');
        this.selectedCountries = new Label('//div[@class="multiselect__tags-wrap"]//span[@class="multiselect__tag"]//span', 'selected countries');
        this.displayedCountries = new Label('//span[contains(text(), "Страна:")]//parent::div[@class="item"]//following-sibling::div[@class="text-14"]//span', 'displayed countries');
        this.dateStartButton = new Button(`//td[@title="${startDate}"]`, 'start date');
        this.dateFinishButton = new Button(`//td[@title="${finishDate}"]`, 'finish date');
        this.calendarTowardsButton = new Button('//span[contains(text(), "Туда")]//parent::div[@class="form-item"]//following-sibling::div[@class="form-item__icon"]', 'calendar towards button');
        this.calendarBackwardsButton = new Button('//span[contains(text(), "Обратно")]//parent::div[@class="form-item"]//following-sibling::div[@class="form-item__icon"]', 'calendar backwards button');
        this.calendarCells = new Label('//table[contains(@class, "mx-table-date")]//tbody//tr//td', 'calendar cells');
        this.calendarRightArrowButton = new Button('//button[contains(@class, "mx-btn-icon-right")]//i', 'right calendar arrow button');
        this.selectedDates = new Button('//input[@name="date"]', 'selected dates');
        this.displayedDates = new Label('//span[contains(text(), "Срок действия:")]//parent::div[@class="item"]//following-sibling::div[@class="text-14"]//span', 'displayed dates');
        this.IINBox = new Textbox('//input[@id="iinInput"]', 'iin');
        this.selectedClientName = new Label('//span[@class="subtitle-16"]', 'selected client name');
        this.displayedClientName = new Label('//span[contains(text(), "Туристы:")]//parent::div[@class="item"]//following-sibling::div[@class="text-14"]//span', 'displayed client name');
        this.insuranceLimitDropdownButton = new Button('//span[contains(text(), "Лимит страхования")]//parent::div[@placeholder="Выберите из списка"]//following-sibling::div[contains(@class, "multiselect")]//div[@class="multiselect__select"]', 'insurance limit dropdown');
        this.insuranceLimitDropdownElements = new Button('//span[contains(text(), "Лимит страхования")]//parent::div[@placeholder="Выберите из списка"]//following-sibling::div[@class="multiselect__content-wrapper"]//descendant::li[@class="multiselect__element"]//span[@class="multiselect__option" or @class="multiselect__option multiselect__option--highlight"]//span', 'insurance limit dropdown elements');
        this.purposeOfTheTripDropdownButton = new Button('//span[contains(text(), "Цель путешествия")]//parent::div[@class="form-item"]//following-sibling::div[contains(@class, "multiselect")]//div[@class="multiselect__select"]', 'purpose of the trip dropdown');
        this.selectedPurposeOfTheTrip = new Button('//span[contains(text(), "Цель путешествия")]//parent::div[@class="form-item"]//following-sibling::div[contains(@class, "multiselect")]//div[@class="multiselect__tags"]//span[@class="multiselect__single"]', 'selected purpose of the trip');
        this.displayedPurposeOfTheTrip = new Label('//span[contains(text(), "Цель путешествия:")]//parent::div[@class="item"]//following-sibling::div[@class="text-14"]//span', 'displayed purpose of the trip');
        this.purposeOfTheTripDropdownElements = new Button('//span[contains(text(), "Цель путешествия")]//parent::div[@class="form-item"]//following-sibling::div[@class="multiselect__content-wrapper"]//descendant::li[@class="multiselect__element"]//span[@class="multiselect__option" or @class="multiselect__option multiselect__option--highlight"]//span', 'purpose of the trip dropdown elements');
        this.additionalCheckboxes = new Checkbox('//div[contains(@class, "checkbox-parent")]//descendant::div[contains(@class, "item")]//label', 'additional checkboxes');
        this.calculateButton = new Button('//button[contains(text(), "Рассчитать")]', 'calculate button');
        this.displayedPolicyCost = new Label('//span[contains(text(), "Стоимость полиса")]//following-sibling::span', 'displayed policy cost');
        this.displayedPolicyDiscount = new Label('//span[contains(text(), "Ваша скидка")]//following-sibling::span', 'displayed policy discount');
        this.calculations = new Label('//h6[contains(text(), "Предварительный расчёт")]//following-sibling::div', 'calculations');
        this.nextButton = new Button('//button[contains(text(), "Далее")]', 'next button');
        this.secondNameBox = new Textbox('//label[contains(text(), "Фамилия на латинице")]//parent::div[@class="form-item"]//following-sibling::input[@type="text"]', 'second name in latin');
        this.firstNameBox = new Textbox('//label[contains(text(), "Имя на латинице")]//parent::div[@class="form-item"]//following-sibling::input[@type="text"]', 'first name in latin');
        this.calendarPassportGivenButton = new Button('//span[contains(text(), "Дата выдачи паспорта")]//parent::div[@class="form-item"]//following-sibling::div[@class="mx-datepicker"]', 'calendar passport given date button');
        this.passportNumberBox = new Textbox('//label[contains(text(), "Номер паспорта")]//parent::div[@class="form-item"]//following-sibling::input[@type="text"]', 'passport number');
        this.passportGivenDateBox = new Textbox('//input[@placeholder="дд.мм.гггг"]', 'passport given date');
        this.emailBox = new Textbox('//label[contains(text(), "Email")]//parent::div[@class="form-item"]//following-sibling::input[@type="text"]', 'email');
        this.phoneBox = new Textbox('//label[contains(text(), "Номер телефона")]//parent::div[@class="form-item"]//following-sibling::input[@type="tel"]', 'phone');
        this.SMSCodeBox = new Textbox('//label[contains(text(), "SMS-код")]//parent::div[@class="form-item"]//following-sibling::input[@type="text"]', 'sms code box');
        this.acceptanceCheckbox = new Checkbox('//input[@type="checkbox" and @id="check1"]', 'acceptance checkbox');
        this.sumToPay = new Label('//h6[contains(text(), "Общая сумма")]//following-sibling::h6[contains(text(), "₸")]', 'sum to pay');
        this.kaspiPayButton = new Button('//button[contains(@class, "-red")]', 'kaspi pay button');
        this.epayButton = new Button('//button[contains(text(), "Картой")]', 'epay button');
        this.paymentNumber = new Label('//li[contains(@class, "mb-2")]//span', 'payment number');
    }

    selectThreeRandomCountries() {
        this.countriesDropdownElements.clickRandomElementsFromDropdownByText(this.countriesDropdownButton, configManager.getTestData().elementsCount);
    }

    getSelectedCountries() {
        return this.selectedCountries.getElementsListText('innerText');
    }

    getDisplayedCountries() {
        return this.displayedCountries.getElementsListText('innerText');
    }

    inputRandomDates() {
        const datesInterval = randomizer.getRandomDatesIntervalFromTomorrow(configManager.getTestData().monthsCount);
        const newInstance = new PolicyRequestFormMST(datesInterval.startDate, datesInterval.finishDate);
        this.calendarTowardsButton.flipCalendarIfNotContainsDate(this.calendarRightArrowButton, datesInterval.startMonthDifference);
        newInstance.dateStartButton.clickElement();
        this.calendarBackwardsButton.flipCalendarIfNotContainsDate(this.calendarRightArrowButton, datesInterval.finishMonthDifference);
        newInstance.dateFinishButton.clickElement();
    }

    getSelectedDates() {
        return this.selectedDates.getElementsListText('value');
    }

    getDisplayedDates() {
        return this.displayedDates.getText().then((text) => text.match(new RegExp(configManager.getTestData().regexPattern, 'g')));
    }

    inputIIN() {
        this.IINBox.clickElement();
        this.IINBox.clickElement();
        this.IINBox.clickElement();
        this.IINBox.inputData(configManager.getTestData().clientIIN);
        this.selectedClientName.waitForText(configManager.getTestData().clientName);
        cy.scrollTo('center');
    }

    getSelectedClientName() {
        return this.selectedClientName.getText();
    }

    getDisplayedClientName() {
        return this.displayedClientName.getText().then((text) => {
            const nameList = text.split(' ');
            nameList.push(`${nameList.pop().slice(0, 1)}.`);
            return nameList.join(' ');
        });
    }

    selectRandomInsuranceLimit() {
        this.insuranceLimitDropdownElements.clickRandomElementsFromDropdownByText(this.insuranceLimitDropdownButton);
    }

    selectRandomPurposeOfTheTrip() {
        this.purposeOfTheTripDropdownElements.clickRandomElementsFromDropdownByText(this.purposeOfTheTripDropdownButton);
    }

    getSelectedPurposeOfTheTrip() {
        return this.selectedPurposeOfTheTrip.getText();
    }

    getDisplayedPurposeOfTheTrip() {
        return this.displayedPurposeOfTheTrip.getText();
    }

    clickRandomAdditionalCheckboxesAndCalculate() {
        const checkboxesToClickCount = randomizer.getRandomInteger(configManager.getTestData().elementsCount);
        checkboxesToClickCount 
        ? this.additionalCheckboxes.clickRandomCheckboxesByText(checkboxesToClickCount) 
        : this.calculateButton.clickElement();
        this.calculations.waitElementHasNotProperty('display', 'none');
    }

    getPolicyCostDiscountDelta() {
        let policyCost;
        return this.displayedPolicyCost.getText()
        .then((cost) => policyCost = cost)
        .then(() => this.displayedPolicyDiscount.getText())
        .then((discount) => {
            return Number(policyCost.slice(0, -1).replace(/₸| /g, '')) + Number(discount.slice(0, -1).replace(/₸| /g, ''));
        });
    }

    clickNextButton() {
        this.nextButton.clickElement();
    }

    inputEmail() {
        this.emailBox.inputData(configManager.getTestData().clientEmail);
    }

    inputPhone() {
        this.phoneBox.inputData(configManager.getTestData().clientPhone);
    }

    enterSMSCode(code) {
        this.SMSCodeBox.enterData(code);
    }

    clickAcceptanceCheckbox() {
        this.acceptanceCheckbox.clickElement();
    }

    getSumToPay() {
        return this.sumToPay.getText().then((text) => text.slice(0, -1).replace(/₸| /g, ''));
    }

    clickKaspiPayButton() {
        this.kaspiPayButton.clickElement();
    }

    clickEpayButton() {
        this.epayButton.clickElement();
    }

    getPaymentNumber() {
        return this.paymentNumber.getText();
    }

    // inputPassportGivenDate() {
    //     this.calendarPassportGivenButton.clickElement();
    //     this.passportGivenDateBox.inputData(configManager.getTestData().clientPassportGivenDate);
    // }

    // inputPassportData() {
    //     this.secondNameBox.inputData(configManager.getTestData().clientSecondNameLatin);
    //     this.firstNameBox.inputData(configManager.getTestData().clientFirstNameLatin);
    //     this.passportNumberBox.inputData(configManager.getTestData().clientPassportNumber);
    // }
}

module.exports = new PolicyRequestFormMST();