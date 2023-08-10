const BaseForm = require('../../main/baseForm.js');
const Button = require('../../main/elements/baseElementChildren/button.js');
const Label = require('../../main/elements/baseElementChildren/label.js');
const Textbox = require('../../main/elements/baseElementChildren/textbox.js');
const Checkbox = require('../../main/elements/baseElementChildren/checkbox.js');
const randomizer = require('../../main/utils/random/randomizer.js');
const configManager = require('../../main/utils/data/configManager.js');

class PolicyRequestFormMST extends BaseForm {
    constructor(startDate, finishDate) {
        super('//h3[contains(text(), "Оформление полиса")]', 'policy request page');
        this.countriesDropdownButton = new Button('//input[@placeholder="Выберите страну"]//parent::div[@class="multiselect__tags"]//preceding-sibling::div[@class="multiselect__select"]', 'countries dropdown button');
        this.countriesDropdownElements = new Button('//input[@placeholder="Выберите страну"]//parent::div[@class="multiselect__tags"]//following-sibling::div[@class="multiselect__content-wrapper"]//descendant::li[@class="multiselect__element"]//span[@class="multiselect__option" or @class="multiselect__option multiselect__option--highlight"]//span', 'countries dropdown element');
        this.dateStartButton = new Button(`//td[@title="${startDate}"]`, 'start date');
        this.dateFinishButton = new Button(`//td[@title="${finishDate}"]`, 'finish date');
        this.calendarTowardsButton = new Button('//span[contains(text(), "Туда")]//parent::div[@class="form-item"]//following-sibling::div[@class="form-item__icon"]', 'calendar towards button');
        this.calendarBackwardsButton = new Button('//span[contains(text(), "Обратно")]//parent::div[@class="form-item"]//following-sibling::div[@class="form-item__icon"]', 'calendar backwards button');
        this.calendarCells = new Label('//table[contains(@class, "mx-table-date")]//tbody//tr//td', 'calendar cells');
        this.calendarRightArrowButton = new Button('//button[contains(@class, "mx-btn-icon-right")]//i', 'right calendar arrow button');
        this.IINBox = new Textbox('//input[@id="iinInput"]', 'iin');
        this.clientName = new Label('//span[@class="subtitle-16"]', 'client name');
        this.insuranceLimitDropdownButton = new Button('//span[contains(text(), "Лимит страхования")]//parent::div[@placeholder="Выберите из списка"]//following-sibling::div[contains(@class, "multiselect")]//div[@class="multiselect__select"]', 'insurance limit dropdown');
        this.insuranceLimitDropdownElements = new Button('//span[contains(text(), "Лимит страхования")]//parent::div[@placeholder="Выберите из списка"]//following-sibling::div[@class="multiselect__content-wrapper"]//descendant::li[@class="multiselect__element"]//span[@class="multiselect__option" or @class="multiselect__option multiselect__option--highlight"]//span', 'insurance limit dropdown elements');
        this.purposeOfTheTripDropdownButton = new Button('//span[contains(text(), "Цель путешествия")]//parent::div[@class="form-item"]//following-sibling::div[contains(@class, "multiselect")]//div[@class="multiselect__select"]', 'purpose of the trip dropdown');
        this.purposeOfTheTripDropdownElements = new Button('//span[contains(text(), "Цель путешествия")]//parent::div[@class="form-item"]//following-sibling::div[@class="multiselect__content-wrapper"]//descendant::li[@class="multiselect__element"]//span[@class="multiselect__option" or @class="multiselect__option multiselect__option--highlight"]//span', 'purpose of the trip dropdown elements');
        this.additionalCheckboxes = new Checkbox('//div[contains(@class, "checkbox-parent")]//descendant::div[contains(@class, "item")]//label', 'additional checkboxes');
        this.calculateButton = new Button('//button[contains(text(), "Рассчитать")]', 'calculate button');
        this.nextButton = new Button('//button[contains(text(), "Далее")]', 'next button');
        this.secondNameBox = new Textbox('//label[contains(text(), "Фамилия на латинице")]//parent::div[@class="form-item"]//following-sibling::input[@type="text"]', 'second name in latin');
        this.firstNameBox = new Textbox('//label[contains(text(), "Имя на латинице")]//parent::div[@class="form-item"]//following-sibling::input[@type="text"]', 'first name in latin');
        this.calendarPassportGivenButton = new Button('//span[contains(text(), "Дата выдачи паспорта")]//parent::div[@class="form-item"]//following-sibling::div[@class="mx-datepicker"]', 'calendar passport given date button');
        this.passportNumberBox = new Textbox('//label[contains(text(), "Номер паспорта")]//parent::div[@class="form-item"]//following-sibling::input[@type="text"]', 'passport number');
        this.passportGivenDateBox = new Textbox('//input[@placeholder="дд.мм.гггг"]', 'passport given date');
        this.emailBox = new Textbox('//label[contains(text(), "Email")]//parent::div[@class="form-item"]//following-sibling::input[@type="text"]', 'email');
        this.phoneBox = new Textbox('//label[contains(text(), "Номер телефона")]//parent::div[@class="form-item"]//following-sibling::input[@type="tel"]', 'phone');
        this.SMSCodeBox = new Textbox('//label[contains(text(), "SMS-код")]//parent::div[@class="form-item"]//following-sibling::input[@type="text"]', 'sms-code box');
        this.acceptanceCheckbox = new Checkbox('//input[@type="checkbox" and @id="check1"]', 'acceptance checkbox');
        this.sumToPay = new Label('//h6[contains(text(), "Общая сумма")]//following-sibling::h6[contains(text(), "₸")]', 'sumToPay');
        this.kaspiPayButton = new Button('//button[contains(@class, "-red")]', 'kaspi pay button');
        this.paymentNumber = new Label('//li[contains(@class, "mb-2")]//span', 'paymentNumber');
    }

    selectThreeRandomCountries() {
        this.countriesDropdownElements.clickRandomElementsFromDropdownByText(this.countriesDropdownButton, configManager.getTestData().elementsCount);
    }

    inputRandomDates() {
        const datesInterval = randomizer.getRandomDatesIntervalFromTomorrow(configManager.getTestData().monthsCount);
        const newInstance = new PolicyRequestFormMST(datesInterval.startDate, datesInterval.finishDate);
        this.calendarCells.flipCalendarIfNotContainsDate(this.calendarTowardsButton, this.calendarRightArrowButton, datesInterval.startMonthDifference);
        newInstance.dateStartButton.clickElement();
        this.calendarCells.flipCalendarIfNotContainsDate(this.calendarBackwardsButton, this.calendarRightArrowButton, datesInterval.finishMonthDifference);
        newInstance.dateFinishButton.clickElement();
    }

    inputIIN() {
        this.IINBox.clickElement();
        this.IINBox.clickElement();
        this.IINBox.clickElement();
        this.IINBox.inputData(configManager.getTestData().clientIIN);
        this.clientName.waitForText(configManager.getTestData().clientName);
        cy.scrollTo('center');
    }

    selectRandomInsuranceLimit() {
        this.insuranceLimitDropdownElements.clickRandomElementsFromDropdownByText(this.insuranceLimitDropdownButton);
    }

    selectRandomPurposeOfTheTrip() {
        this.purposeOfTheTripDropdownElements.clickRandomElementsFromDropdownByText(this.purposeOfTheTripDropdownButton);
    }

    selectRandomAdditionalCheckboxesAndCalculate() {
        const checkboxesToClickCount = randomizer.getRandomInteger(configManager.getTestData().elementsCount);
        if (checkboxesToClickCount) {
            this.additionalCheckboxes.clickRandomCheckboxesByText(checkboxesToClickCount);
        } else {
            this.calculateButton.clickElement();
        }
    }

    clickNextButton() {
        this.nextButton.clickElement();
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

    inputEmail() {
        this.emailBox.inputData(configManager.getTestData().clientEmail);
    }

    inputPhone() {
        this.phoneBox.inputData(configManager.getTestData().clientPhone);
    }

    enterSMSCode(code) {
        this.SMSCodeBox.enterData(code);
    }

    payWithKaspi() {
        this.acceptanceCheckbox.clickElement();
        
        let sumToPay;
        let paymentNumber;
        this.sumToPay.getElement().then(sum => {
            sumToPay = sum.text();
        }).then(() => {
            this.kaspiPayButton.clickElement();
        }).then(() => {
            this.paymentNumber.getElement();
        }).then(number => {
            paymentNumber = (number.text()).slice(0, -1).replace(/₸| /g, '');
        }).then(() => {
            cy.task('payKaspi', { sumToPay, paymentNumber });
        });
    }
}

module.exports = new PolicyRequestFormMST();