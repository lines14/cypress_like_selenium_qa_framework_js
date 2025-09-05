const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../main/elements/baseElementChildren/label');
const Button = require('../../../main/elements/baseElementChildren/button');
const Checkbox = require('../../../main/elements/baseElementChildren/checkbox');

class OGPOMutualStep5 extends BaseForm {
  #moreLink;

  #SMSNotifyCheckboxLabel;

  #calculateButton;

  #familiarizedCheckbox;

  #mutualStateCheckbox;

  #mutualInfoAgreedCheckbox;

  #selectedOGPOCost;

  #selectedMutualCost;

  #sumToPay;

  constructor() {
    super(new XPATH('//h3[contains(text(), "Оформление полиса")]'), 'OGPO policy request page');
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

  clickMoreLink() {
    this.#moreLink.clickElement();
  }

  randomClickSMSNotifyCheckbox() {
    this.#SMSNotifyCheckboxLabel.clickRandomRadiobuttonsOrCheckboxesByText({ inputElementType: 'checkbox', parentOfLabelTag: 'div' });
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
    return this.#selectedOGPOCost.getText()
      .then((OGPOCost) => this.#selectedMutualCost.getText()
        .then((mutualCost) => Number(OGPOCost.slice(0, -1).replace(/₸| /g, '')) + Number(mutualCost.slice(0, -1).replace(/₸| /g, ''))));
  }

  getSumToPay() {
    return this.#sumToPay.getText().then((text) => text.slice(0, -1).replace(/₸| /g, ''));
  }
}

module.exports = new OGPOMutualStep5();
