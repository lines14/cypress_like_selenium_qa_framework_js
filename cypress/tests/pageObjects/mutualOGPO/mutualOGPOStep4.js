const BaseForm = require('../../../main/baseForm');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const Randomizer = require('../../../main/utils/random/randomizer');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../main/elements/baseElementChildren/label');
const Button = require('../../../main/elements/baseElementChildren/button');

class MutualOGPOStep4 extends BaseForm {
  #nextButton;

  #calendarButton;

  #calendarLeftArrowButton;

  #calendarRightArrowButton;

  #startDateButton;

  #selectedDate;

  #displayedDate;

  constructor(startDate) {
    super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'OGPO policy request page');
    this.#nextButton = new Button(new XPATH('//button[contains(text(), "Далее")]'), 'next button');
    this.#calendarButton = new Button(new XPATH('//span[contains(text(), "Дата начала договора")]//following-sibling::div[@class="mx-datepicker"]'), 'calendar button');
    this.#calendarLeftArrowButton = new Button(new XPATH('//button[contains(@class, "mx-btn-icon-left")]//i'), 'left calendar arrow button');
    this.#calendarRightArrowButton = new Button(new XPATH('//button[contains(@class, "mx-btn-icon-right")]//i'), 'right calendar arrow button');
    this.#startDateButton = new Button(new XPATH(`//td[@title="${startDate}"]`), 'start date');
    this.#selectedDate = new Button(new XPATH('//input[@name="date"]'), 'selected date');
    this.#displayedDate = new Label(new XPATH('//span[contains(text(), "Дата начала:")]//following-sibling::div[@class="text-14"]//span'), 'displayed date');
  }

  clickNextButton() {
    this.#nextButton.clickElement();
  }

  inputRandomStartDate() {
    const dates = Randomizer
      .getRandomDatesIntervalFromTomorrow(...JSONLoader.testData.timeIncrement);
    const newInstance = new MutualOGPOStep4(dates.startDate);
    this.#calendarButton.flipCalendarMonth(
      this.#calendarRightArrowButton,
      dates.startMonthDifference,
    );
    newInstance.#startDateButton.elementIsDisplayed().then((isDisplayed) => {
      if (isDisplayed) {
        newInstance.#startDateButton.clickElement();
      } else {
        newInstance.#calendarLeftArrowButton.clickElement();
        newInstance.#startDateButton.clickElement();
      }
    });
  }

  getDisplayedDate() {
    return this.#displayedDate.getText();
  }

  getSelectedDate() {
    return this.#selectedDate.getElementsListText({ propertyName: 'value' }).then((list) => list.pop());
  }
}

module.exports = new MutualOGPOStep4();
