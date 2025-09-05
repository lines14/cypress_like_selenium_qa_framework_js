const BaseForm = require('../../../../main/baseForm');
const XPATH = require('../../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../../main/elements/baseElementChildren/button');
const Label = require('../../../../main/elements/baseElementChildren/label');

class ClaimPage extends BaseForm {
  #claimNumberLabel;

  #refuseButton;

  #moreDetailsButton;

  #insuranceTypeLabel;

  #claimantLabel;

  #IEDateLabel;

  #contractNumberLabel;

  #insurancePeriodLabel;

  #locationLabel;

  #preAppraisalDamageLabel;

  #insuranceEventTypeLabel;

  #claimStatusLabel;

  #victimObjectLabel;

  #victimObjectTypeLabel;

  #damageDescriptionLabel;

  #riskLabel;

  #backButton;

  constructor() {
    super(new XPATH('//h6[text() = "Этапы заполнения"]'), 'claim page');
    this.#claimNumberLabel = new Label(new XPATH('//h6[contains(text(), "Информация о заявлении")]'), 'claim number label');
    this.#refuseButton = new Button(new XPATH('//button[contains(text(), "Отказ от рассмотрения")]'), 'refuse button');
    this.#moreDetailsButton = new Button(new XPATH('//button[@class = "insurance__open_button"]'), 'more details button');
    this.#insuranceTypeLabel = new Label(new XPATH('//span[text() = "Класс страхования:"]/following-sibling::span'), 'insurance type label');
    this.#claimantLabel = new Label(new XPATH('//span[text() = "Заявитель:"]/following-sibling::span'), 'claimant label');
    this.#IEDateLabel = new Label(new XPATH('//span[text() = "Дата страхового случая:"]/following-sibling::span'), 'IE date label');
    this.#contractNumberLabel = new Label(new XPATH('//span[text() = "Номер договора:"]/following-sibling::span'), 'contract number label');
    this.#insurancePeriodLabel = new Label(new XPATH('//span[text() = "Период страхования:"]/following-sibling::span'), 'insurance period label label');
    this.#locationLabel = new Label(new XPATH('//span[text() = "Место происшествия:"]/following-sibling::span'), 'location label');
    this.#preAppraisalDamageLabel = new Label(new XPATH('//span[text() = "Заявленный убыток:"]/following-sibling::span'), 'pre appraisal damage label');
    this.#insuranceEventTypeLabel = new Label(new XPATH('//span[text() = "Тип страхового случая:"]/following-sibling::span'), 'insurance event type label');
    this.#claimStatusLabel = new Label(new XPATH('//span[text() = "Статус заявления:"]/following-sibling::span'), 'claim status label');
    this.#victimObjectLabel = new Label(new XPATH('//span[text() = "Пострадавший объект:"]/following-sibling::span'), 'victim object label');
    this.#victimObjectTypeLabel = new Label(new XPATH('//span[text() = "Вид пострадавшего объекта:"]/following-sibling::span'), 'victim object type label');
    this.#damageDescriptionLabel = new Label(new XPATH('//span[text() = "Описание:"]/following-sibling::span'), 'damage description label');
    this.#riskLabel = new Label(new XPATH('//span[text() = "Тип риска:"]/following-sibling::span'), 'riks label');
    this.#backButton = new Button(new XPATH('//button[contains(text(), "Назад")]'), 'back button');
  }

  getClaimNumberText() {
    this.#claimNumberLabel.scrollElementToView();
    return this.#claimNumberLabel.getText().then((claimNumber) => claimNumber.substring(claimNumber.indexOf('ЗУ')).trim());
  }

  isRefuseButtonPresent() {
    return this.#refuseButton.elementIsDisplayed();
  }

  clickMoreDetailsButton() {
    this.#moreDetailsButton.scrollElementToView();
    this.#moreDetailsButton.clickElement();
  }

  getInsuranceTypeText() {
    return this.#insuranceTypeLabel.getText();
  }

  getClaimantText() {
    return this.#claimantLabel.getText();
  }

  getIEDateText() {
    return this.#IEDateLabel.getText();
  }

  getContractNumberText() {
    return this.#contractNumberLabel.getText();
  }

  getInsurancePeriodText() {
    return this.#insurancePeriodLabel.getText();
  }

  getLocationsText() {
    return this.#locationLabel.getText().then((location) => location.trim().toUpperCase());
  }

  getPreAppraisalDamageText() {
    return this.#preAppraisalDamageLabel.getText().then((preAppraisalDamage) => preAppraisalDamage.replace(',00 тг', '').replace(' ', ''));
  }

  getOGPOInsuranceEventTypeText() {
    return this.#insuranceEventTypeLabel.getText();
  }

  getClaimStatusText() {
    return this.#claimStatusLabel.getText();
  }

  getVictimObjectText() {
    return this.#victimObjectLabel.getText();
  }

  getVictimObjectTypeText() {
    return this.#victimObjectTypeLabel.getText();
  }

  getDamageDescriptionText() {
    return this.#damageDescriptionLabel.getText().then((description) => description.trim());
  }

  getRiskText() {
    return this.#riskLabel.getText();
  }

  clickBackButton() {
    this.#backButton.clickElement();
  }
}

module.exports = new ClaimPage();
