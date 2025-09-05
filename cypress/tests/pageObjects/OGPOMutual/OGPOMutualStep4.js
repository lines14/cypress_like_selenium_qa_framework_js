const BaseForm = require('../../../main/baseForm');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const Randomizer = require('../../../main/utils/random/randomizer');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../main/elements/baseElementChildren/label');
const Button = require('../../../main/elements/baseElementChildren/button');

class OGPOMutualStep4 extends BaseForm {
  #nextButton;

  #calendarButton;

  #calendarLeftArrowButton;

  #calendarRightArrowButton;

  #selectedDate;

  #displayedDate;

  constructor() {
    super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'OGPO policy request page');
    this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
    this.#calendarButton = new Button(new XPATH('//span[contains(text(), "Дата начала договора")]//following-sibling::div[@class="mx-datepicker"]'), 'calendar button');
    this.#calendarLeftArrowButton = new Button(new XPATH('//button[contains(@class, "mx-btn-icon-left")]//i'), 'left calendar arrow button');
    this.#calendarRightArrowButton = new Button(new XPATH('//button[contains(@class, "mx-btn-icon-right")]//i'), 'right calendar arrow button');
    this.#selectedDate = new Button(new XPATH('//input[@name="date"]'), 'selected date');
    this.#displayedDate = new Label(new XPATH('//span[contains(text(), "Дата начала:")]//following-sibling::div[@class="text-14"]//span'), 'displayed date');
  }

  clickNextButton() {
    this.#nextButton.clickElement();
  }

  inputRandomStartDate() {
    const dates = Randomizer
      .getRandomDatesIntervalFromTomorrow(...JSONLoader.testData.timeIncrement);
    const startDateButton = new Button(new XPATH(`//td[@title="${dates.startDate}"]`), 'start date');
    this.#calendarButton.openCalendarAndFlipMonths(
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
  }

  getDisplayedDate() {
    return this.#displayedDate.getText();
  }

  getSelectedDate() {
    return this.#selectedDate.getValue();
  }
}

module.exports = new OGPOMutualStep4();
