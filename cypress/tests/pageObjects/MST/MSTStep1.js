const BaseForm = require('../../../main/baseForm');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const Randomizer = require('../../../main/utils/random/randomizer');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../main/elements/baseElementChildren/label');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');

class MSTStep1 extends BaseForm {
  #countriesDropdownButton;

  #countriesDropdownElements;

  #countriesDropdownElementSchengen;

  #selectedCountries;

  #displayedCountries;

  #calendarTowardsButton;

  #calendarBackwardsButton;

  #calendarLeftArrowButton;

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

  #additionalCheckboxesLabels;

  #calculateButton;

  #nextButton;

  constructor() {
    super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'MST policy request page');
    this.#countriesDropdownButton = new Button(new XPATH('//input[@placeholder="Выберите страну"]//parent::div[@class="multiselect__tags"]//preceding-sibling::div[@class="multiselect__select"]'), 'countries dropdown button');
    this.#countriesDropdownElements = new Button(new XPATH('//input[@placeholder="Выберите страну"]//parent::div[@class="multiselect__tags"]//following-sibling::div[@class="multiselect__content-wrapper"]//descendant::li[@class="multiselect__element"]//span[@class="multiselect__option" or @class="multiselect__option multiselect__option--highlight"]//span'), 'countries dropdown element');
    this.#countriesDropdownElementSchengen = new Button(new XPATH('//input[@placeholder="Выберите страну"]//parent::div[@class="multiselect__tags"]//following-sibling::div[@class="multiselect__content-wrapper"]//descendant::li[@class="multiselect__element"]//span[@class="multiselect__option" or @class="multiselect__option multiselect__option--highlight"]//span[contains(text(), "Шенген")]'), 'countries dropdown element "Schengen"');
    this.#selectedCountries = new Label(new XPATH('//div[@class="multiselect__tags-wrap"]//span[@class="multiselect__tag"]//span'), 'selected countries');
    this.#displayedCountries = new Label(new XPATH('//span[contains(text(), "Страна:")]//following-sibling::div[@class="text-14"]//span'), 'displayed countries');
    this.#calendarTowardsButton = new Button(new XPATH('//span[contains(text(), "Туда")]//following-sibling::div[@class="form-item__icon"]'), 'calendar towards button');
    this.#calendarBackwardsButton = new Button(new XPATH('//span[contains(text(), "Обратно")]//following-sibling::div[@class="form-item__icon"]'), 'calendar backwards button');
    this.#calendarLeftArrowButton = new Button(new XPATH('//button[contains(@class, "mx-btn-icon-left")]//i'), 'left calendar arrow button');
    this.#calendarRightArrowButton = new Button(new XPATH('//button[contains(@class, "mx-btn-icon-right")]//i'), 'right calendar arrow button');
    this.#selectedDates = new Button(new XPATH('//input[@name="date"]'), 'selected dates');
    this.#displayedDates = new Label(new XPATH('//span[contains(text(), "Срок действия:")]//following-sibling::div[@class="text-14"]//span'), 'displayed dates');
    this.#IINBox = new Textbox(new XPATH('//input[@id="iinInput"]'), 'IIN');
    this.#selectedClientName = new Label(new XPATH('//span[@class="subtitle-16"]'), 'selected client name');
    this.#displayedClientName = new Label(new XPATH('//span[contains(text(), "Туристы:")]//following-sibling::div[@class="text-14"]//span'), 'displayed client name');
    this.#insuranceLimitDropdownButton = new Button(new XPATH('//span[contains(text(), "Лимит страхования")]//following-sibling::div[contains(@class, "multiselect")]//div[@class="multiselect__select"]'), 'insurance limit dropdown');
    this.#insuranceLimitDropdownElements = new Button(new XPATH('//span[contains(text(), "Лимит страхования")]//parent::div[@placeholder="Выберите из списка"]//following-sibling::div[@class="multiselect__content-wrapper"]//descendant::li[@class="multiselect__element"]//span[@class="multiselect__option" or @class="multiselect__option multiselect__option--highlight"]//span'), 'insurance limit dropdown elements');
    this.#purposeOfTheTripDropdownButton = new Button(new XPATH('//span[contains(text(), "Цель путешествия")]//following-sibling::div[contains(@class, "multiselect")]//div[@class="multiselect__select"]'), 'purpose of the trip dropdown');
    this.#selectedPurposeOfTheTrip = new Button(new XPATH('//span[contains(text(), "Цель путешествия")]//following-sibling::div[contains(@class, "multiselect")]//div[@class="multiselect__tags"]//span[@class="multiselect__single"]'), 'selected purpose of the trip');
    this.#displayedPurposeOfTheTrip = new Label(new XPATH('//span[contains(text(), "Цель путешествия:")]//following-sibling::div[@class="text-14"]//span'), 'displayed purpose of the trip');
    this.#purposeOfTheTripDropdownElements = new Button(new XPATH('//span[contains(text(), "Цель путешествия")]//parent::div[@class="form-item"]//following-sibling::div[@class="multiselect__content-wrapper"]//descendant::li[@class="multiselect__element"]//span[@class="multiselect__option" or @class="multiselect__option multiselect__option--highlight"]//span'), 'purpose of the trip dropdown elements');
    this.#purposeOfTheTripEducation = new Button(new XPATH('//span[contains(text(), "Цель путешествия")]//parent::div[@class="form-item"]//following-sibling::div[@class="multiselect__content-wrapper"]//descendant::li[@class="multiselect__element"]//span[contains(@class, "multiselect__option")]//span[contains(text(), "Обучение")]'), 'purpose of the trip "education"');
    this.#additionalCheckboxesLabels = new Label(new XPATH('//div[contains(@class, "checkbox-parent")]//descendant::div[contains(@class, "item")]//label'), 'additional checkbox');
    this.#calculateButton = new Button(new XPATH('//button[contains(text(), "Рассчитать")]'), 'calculate button');
    this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
  }

  selectThreeRandomCountries() {
    this.#countriesDropdownButton.chooseRandomElementsFromDropdownByText(
      this.#countriesDropdownElements,
      {
        count: JSONLoader.testData.countriesCount,
        exceptionsElements: [this.#countriesDropdownElementSchengen],
      },
    );
  }

  getSelectedCountries() {
    return this.#selectedCountries.getElementsListText({ propertyName: 'innerText' });
  }

  getDisplayedCountries() {
    return this.#displayedCountries.getElementsListText({ propertyName: 'innerText' });
  }

  inputRandomDates() {
    const dates = Randomizer
      .getRandomDatesIntervalFromTomorrow(...JSONLoader.testData.timeIncrement);
    const startDateButton = new Button(new XPATH(`//td[@title="${dates.startDate}"]`), 'start date');
    this.#calendarTowardsButton.openCalendarAndFlipMonths(
      this.#calendarRightArrowButton,
      dates.startMonthDifference,
    );
    startDateButton.elementIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) {
        startDateButton.clickElement();
      } else {
        this.#calendarLeftArrowButton.clickElement();
        startDateButton.clickElement();
      }
    });

    const finishDateButton = new Button(new XPATH(`//td[@title="${dates.finishDate}"]`), 'finish date');
    this.#calendarBackwardsButton.openCalendarAndFlipMonths(
      this.#calendarRightArrowButton,
      dates.finishMonthDifference,
    );
    finishDateButton.elementIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) {
        finishDateButton.clickElement();
      } else {
        this.#calendarLeftArrowButton.clickElement();
        finishDateButton.clickElement();
      }
    });
  }

  getSelectedDates() {
    return this.#selectedDates.getElementsListText({ propertyName: 'value' });
  }

  getDisplayedDates() {
    return this.#displayedDates.getText().then((text) => text.match(new RegExp(JSONLoader.testData.datesRegexPattern, 'g')));
  }

  inputIIN(IIN) {
    this.#IINBox.multipleClickElement(3);
    this.#IINBox.inputData(IIN);
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
    this.#insuranceLimitDropdownButton
      .chooseRandomElementsFromDropdownByText(this.#insuranceLimitDropdownElements);
  }

  selectRandomPurposeOfTheTrip() {
    this.#purposeOfTheTripDropdownButton.chooseRandomElementsFromDropdownByText(
      this.#purposeOfTheTripDropdownElements,
      {
        exceptionElementsList: [this.#purposeOfTheTripEducation],
      },
    );
  }

  getSelectedPurposeOfTheTrip() {
    return this.#selectedPurposeOfTheTrip.getText().then((text) => text.trim());
  }

  getDisplayedPurposeOfTheTrip() {
    return this.#displayedPurposeOfTheTrip.getText().then((text) => text.trim());
  }

  clickRandomAdditionalCheckboxes() {
    this.#additionalCheckboxesLabels.clickCheckboxesByText({ checkboxParentTag: 'div' });
  }

  clickCalculateButton() {
    this.#calculateButton.clickElement();
  }

  clickNextButton() {
    this.#nextButton.clickElement();
  }
}

module.exports = new MSTStep1();
