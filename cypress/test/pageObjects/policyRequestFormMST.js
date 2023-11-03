const BaseForm = require('../../main/baseForm');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const Randomizer = require('../../main/utils/random/randomizer');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');
const Checkbox = require('../../main/elements/baseElementChildren/checkbox');

class PolicyRequestFormMST extends BaseForm {
    #countriesDropdownButton;
    #countriesDropdownElements;
    #selectedCountries;
    #displayedCountries;
    #startDateButton;
    #finishDateButton;
    #calendarTowardsButton;
    #calendarBackwardsButton;
    #calendarRightArrowButton;
    #selectedDates;
    #displayedDates;
    #IINBox;
    #selectedClientName;
    #displayedClientName;
    #insuranceLimitDropdownButton;
    #insuranceLimitDropdownElements;
    #purposeOfTheTripDropdownButton;
    #selectedPurposeOfTheTrip;
    #displayedPurposeOfTheTrip;
    #purposeOfTheTripDropdownElements;
    #purposeOfTheTripEducation;
    #additionalCheckboxes;
    #calculateButton;
    #displayedPolicyCost;
    #displayedPolicyDiscount;
    #nextButton;
    #emailBox;
    #phoneBox;
    #SMSCodeBox;
    #acceptanceCheckbox;
    #sumToPay;
    #kaspiPayButton;
    #epayButton;
    #paymentNumber;
    #mainPageButton;

    constructor(startDate, finishDate) {
        super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'tourism policy request page');
        this.#countriesDropdownButton = new Button(new XPATH('//input[@placeholder="Выберите страну"]//parent::div[@class="multiselect__tags"]//preceding-sibling::div[@class="multiselect__select"]'), 'countries dropdown button');
        this.#countriesDropdownElements = new Button(new XPATH('//input[@placeholder="Выберите страну"]//parent::div[@class="multiselect__tags"]//following-sibling::div[@class="multiselect__content-wrapper"]//descendant::li[@class="multiselect__element"]//span[@class="multiselect__option" or @class="multiselect__option multiselect__option--highlight"]//span'), 'countries dropdown element');
        this.#selectedCountries = new Label(new XPATH('//div[@class="multiselect__tags-wrap"]//span[@class="multiselect__tag"]//span'), 'selected countries');
        this.#displayedCountries = new Label(new XPATH('//span[contains(text(), "Страна:")]//parent::div[@class="item"]//following-sibling::div[@class="text-14"]//span'), 'displayed countries');
        this.#startDateButton = new Button(new XPATH(`//td[@title="${startDate}"]`), 'start date');
        this.#finishDateButton = new Button(new XPATH(`//td[@title="${finishDate}"]`), 'finish date');
        this.#calendarTowardsButton = new Button(new XPATH('//span[contains(text(), "Туда")]//parent::div[@class="form-item"]//following-sibling::div[@class="form-item__icon"]'), 'calendar towards button');
        this.#calendarBackwardsButton = new Button(new XPATH('//span[contains(text(), "Обратно")]//parent::div[@class="form-item"]//following-sibling::div[@class="form-item__icon"]'), 'calendar backwards button');
        this.#calendarRightArrowButton = new Button(new XPATH('//button[contains(@class, "mx-btn-icon-right")]//i'), 'right calendar arrow button');
        this.#selectedDates = new Button(new XPATH('//input[@name="date"]'), 'selected dates');
        this.#displayedDates = new Label(new XPATH('//span[contains(text(), "Срок действия:")]//parent::div[@class="item"]//following-sibling::div[@class="text-14"]//span'), 'displayed dates');
        this.#IINBox = new Textbox(new XPATH('//input[@id="iinInput"]'), 'iin');
        this.#selectedClientName = new Label(new XPATH('//span[@class="subtitle-16"]'), 'selected client name');
        this.#displayedClientName = new Label(new XPATH('//span[contains(text(), "Туристы:")]//parent::div[@class="item"]//following-sibling::div[@class="text-14"]//span'), 'displayed client name');
        this.#insuranceLimitDropdownButton = new Button(new XPATH('//span[contains(text(), "Лимит страхования")]//parent::div[@placeholder="Выберите из списка"]//following-sibling::div[contains(@class, "multiselect")]//div[@class="multiselect__select"]'), 'insurance limit dropdown');
        this.#insuranceLimitDropdownElements = new Button(new XPATH('//span[contains(text(), "Лимит страхования")]//parent::div[@placeholder="Выберите из списка"]//following-sibling::div[@class="multiselect__content-wrapper"]//descendant::li[@class="multiselect__element"]//span[@class="multiselect__option" or @class="multiselect__option multiselect__option--highlight"]//span'), 'insurance limit dropdown elements');
        this.#purposeOfTheTripDropdownButton = new Button(new XPATH('//span[contains(text(), "Цель путешествия")]//parent::div[@class="form-item"]//following-sibling::div[contains(@class, "multiselect")]//div[@class="multiselect__select"]'), 'purpose of the trip dropdown');
        this.#selectedPurposeOfTheTrip = new Button(new XPATH('//span[contains(text(), "Цель путешествия")]//parent::div[@class="form-item"]//following-sibling::div[contains(@class, "multiselect")]//div[@class="multiselect__tags"]//span[@class="multiselect__single"]'), 'selected purpose of the trip');
        this.#displayedPurposeOfTheTrip = new Label(new XPATH('//span[contains(text(), "Цель путешествия:")]//parent::div[@class="item"]//following-sibling::div[@class="text-14"]//span'), 'displayed purpose of the trip');
        this.#purposeOfTheTripDropdownElements = new Button(new XPATH('//span[contains(text(), "Цель путешествия")]//parent::div[@class="form-item"]//following-sibling::div[@class="multiselect__content-wrapper"]//descendant::li[@class="multiselect__element"]//span[@class="multiselect__option" or @class="multiselect__option multiselect__option--highlight"]//span'), 'purpose of the trip dropdown elements');
        this.#purposeOfTheTripEducation = new Button(new XPATH('//span[contains(text(), "Цель путешествия")]//parent::div[@class="form-item"]//following-sibling::div[@class="multiselect__content-wrapper"]//descendant::li[@class="multiselect__element"]//span[contains(@class, "multiselect__option")]//span[contains(text(), "Обучение")]'), 'purpose of the trip "education"');
        this.#additionalCheckboxes = new Checkbox(new XPATH('//div[contains(@class, "checkbox-parent")]//descendant::div[contains(@class, "item")]//label'), 'additional checkboxes');
        this.#calculateButton = new Button(new XPATH('//button[contains(text(), "Рассчитать")]'), 'calculate button');
        this.#displayedPolicyCost = new Label(new XPATH('//span[contains(text(), "Стоимость полиса")]//following-sibling::span'), 'displayed policy cost');
        this.#displayedPolicyDiscount = new Label(new XPATH('//span[contains(text(), "Ваша скидка")]//following-sibling::span'), 'displayed policy discount');
        this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
        this.#emailBox = new Textbox(new XPATH('//label[contains(text(), "Email")]//parent::div[@class="form-item"]//following-sibling::input[@type="text"]'), 'email');
        this.#phoneBox = new Textbox(new XPATH('//label[contains(text(), "Номер телефона")]//parent::div[@class="form-item"]//following-sibling::input[@type="tel"]'), 'phone');
        this.#SMSCodeBox = new Textbox(new XPATH('//label[contains(text(), "SMS-код")]//parent::div[@class="form-item"]//following-sibling::input[@type="text"]'), 'sms code box');
        this.#acceptanceCheckbox = new Checkbox(new XPATH('//input[@type="checkbox" and @id="check1"]'), 'acceptance checkbox');
        this.#sumToPay = new Label(new XPATH('//h6[contains(text(), "Общая сумма")]//following-sibling::h6[contains(text(), "₸")]'), 'sum to pay');
        this.#kaspiPayButton = new Button(new XPATH('//button[contains(@class, "-red")]'), 'kaspi pay button');
        this.#epayButton = new Button(new XPATH('//button[contains(text(), "Картой")]'), 'epay button');
        this.#paymentNumber = new Label(new XPATH('//li[contains(@class, "mb-2")]//span'), 'payment number');
        this.#mainPageButton = new Button(new XPATH('//span[contains(text(), "На главную")]'), 'main page button');
    }

    selectThreeRandomCountries() {
        this.#countriesDropdownElements.clickRandomElementsFromDropdownByText(this.#countriesDropdownButton, JSONLoader.testData.countriesCount);
    }

    getSelectedCountries() {
        return this.#selectedCountries.getElementsListText('innerText');
    }

    getDisplayedCountries() {
        return this.#displayedCountries.getElementsListText('innerText');
    }

    inputRandomDates() {
        const dates = Randomizer.getRandomDatesIntervalFromTomorrow(JSONLoader.testData.monthsCount);
        const newInstance = new PolicyRequestFormMST(dates.startDate, dates.finishDate);
        this.#calendarTowardsButton.flipCalendarIfNotContainsDate(this.#calendarRightArrowButton, dates.startMonthDifference);
        newInstance.#startDateButton.clickElement();
        this.#calendarBackwardsButton.flipCalendarIfNotContainsDate(this.#calendarRightArrowButton, dates.finishMonthDifference);
        newInstance.#finishDateButton.clickElement();
    }

    getSelectedDates() {
        return this.#selectedDates.getElementsListText('value');
    }

    getDisplayedDates() {
        return this.#displayedDates.getText().then((text) => text.match(new RegExp(JSONLoader.testData.datesRegexPattern, 'g')));
    }

    inputIIN() {
        this.#IINBox.multipleClickElement(3);
        this.#IINBox.inputData(JSONLoader.testData.clientIIN);
    }

    getSelectedClientNameElement() {
        return this.#selectedClientName.getElement();
    }

    getSlicedDisplayedClientName() {
        return this.#displayedClientName.getText().then((text) => {
            const nameList = text.split(' ');
            nameList.push(nameList.pop().slice(0, 1));
            return nameList.join(' ');
        });
    }

    selectRandomInsuranceLimit() {
        cy.scrollTo('center');
        this.#insuranceLimitDropdownElements.clickRandomElementsFromDropdownByText(this.#insuranceLimitDropdownButton);
    }

    selectRandomPurposeOfTheTrip() {
        this.#purposeOfTheTripDropdownElements.clickRandomElementsFromDropdownByText(this.#purposeOfTheTripDropdownButton, this.#purposeOfTheTripEducation);
    }

    getSelectedPurposeOfTheTrip() {
        return this.#selectedPurposeOfTheTrip.getText();
    }

    getDisplayedPurposeOfTheTrip() {
        return this.#displayedPurposeOfTheTrip.getText();
    }

    clickRandomAdditionalCheckboxes() {
        this.#additionalCheckboxes.clickCheckboxesByText();
    }

    clickCalculateButton() {
        this.#calculateButton.clickElement();
    }

    getPolicyCostDiscountDelta() {
        let policyCost;
        return this.#displayedPolicyCost.getText()
        .then((cost) => policyCost = cost)
        .then(() => this.#displayedPolicyDiscount.getText())
        .then((discount) => {
            return Number(policyCost.slice(0, -1).replace(/₸| /g, '')) + Number(discount.slice(0, -1).replace(/₸| /g, ''));
        });
    }

    clickNextButton() {
        this.#nextButton.clickElement();
    }

    inputEmail() {
        this.#emailBox.inputData(JSONLoader.testData.clientEmail);
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

    clickAcceptanceCheckbox() {
        this.#acceptanceCheckbox.clickElement();
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
        return this.#paymentNumber.getText();
    }

    clickMainPageButton() {
        this.#mainPageButton.clickElement();
    }
}

module.exports = new PolicyRequestFormMST();