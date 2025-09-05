const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Label = require('../../../main/elements/baseElementChildren/label');

class ClaimsListPage extends BaseForm {
  #createClaimButton;

  #claimCreatedMessage;

  #claimNumberLabelXPATH = ('(//span[contains(text(), "№ заявки:")])[claimIndex]');

  #IEContractNumberLabelXPATH = ('(//span[text() = "Договор:"]/following-sibling::span)[claimIndex]');

  #IEDateLabelXPATH = ('(//span[text() = "Дата страхового случая:"]/following-sibling::span)[claimIndex]');

  #claimDateLabelXPATH = ('(//span[text() = "Дата заявления:"]/parent::div)[claimIndex]');

  #claimStatusLabelXPATH = ('(//span[text() = "Статус:"]/parent::div)[claimIndex]');

  #moreDetailsButtonXPATH = '(//button[@class = "insurance__open_button"])[claimIndex]';

  #claimantLabel;

  #victimObjectLabel;

  #victimObjectTypeLabel;

  #openClaimButtonXPATH = '(//button[contains(text(), "Открыть")])[claimIndex]';

  #closeMessageButton;

  constructor() {
    super(new XPATH('//div[@class = "profile__insurance profile__claim"]'), 'claims list page');
    this.#createClaimButton = new Button(new XPATH('//button[contains(text(), "Создать заявление")]'), 'create claim button');
    this.#claimCreatedMessage = new Label(new XPATH('//div[contains(@class, "toasted-primary success")]'), 'claim created message');
    this.#closeMessageButton = new Button(new XPATH('//a[contains(@class, "close-toast-btn")]'), 'close message button');
    this.#claimantLabel = new Label(new XPATH('//span[text() = "Заявитель:"]/following-sibling::div'), 'claimant label');
    this.#victimObjectLabel = new Label(new XPATH('//span[text() = "Пострадавший объект:"]/following-sibling::div'), 'victim object label');
    this.#victimObjectTypeLabel = new Label(new XPATH('//span[text() = "Тип объекта:"]/following-sibling::div'), 'victim object type label');
  }

  clickCreateClaimButton() {
    return this.#createClaimButton.clickElement();
  }

  claimCreatedMessageIsDisplayed() {
    return this.#claimCreatedMessage.waitElementIsDisplayed();
  }

  claimCreatedMessageIsNotDisplayed() {
    return this.#claimCreatedMessage.waitElementIsNotDisplayed();
  }

  clickCloseMessageButton() {
    this.#closeMessageButton.clickElement();
  }

  getClaimNumberByIndex(i) {
    const claimNumberLabel = new Label(new XPATH(this.#claimNumberLabelXPATH.replace('claimIndex', i)), 'claim number label');
    return claimNumberLabel.getText().then((text) => text.replace('№ заявки: ', ''));
  }

  getIEContractNumberByIndex(i) {
    const IEContractNumberLabel = new Label(new XPATH(this.#IEContractNumberLabelXPATH.replace('claimIndex', i)), 'IE contract number label');
    return IEContractNumberLabel.getText();
  }

  getIEDateByIndex(i) {
    const IEDateLabel = new Label(new XPATH(this.#IEDateLabelXPATH.replace('claimIndex', i)), 'IE date label');
    return IEDateLabel.getText();
  }

  getClaimDateByIndex(i) {
    const claimDateLabel = new Label(new XPATH(this.#claimDateLabelXPATH.replace('claimIndex', i)), 'claim date label');
    return claimDateLabel.getText().then((date) => date.replace('Дата заявления:', '').replace('\n', '').trim());
  }

  getClaimStatusByIndex(i) {
    const claimStatusLabel = new Label(new XPATH(this.#claimStatusLabelXPATH.replace('claimIndex', i)), 'claim status label');
    return claimStatusLabel.getText().then((text) => text.replace('Статус:', '').trim());
  }

  clickMoreDetailsButtonByIndex(i) {
    const moreDetailsButton = new Button(new XPATH(this.#moreDetailsButtonXPATH.replace('claimIndex', i)), 'more details button');
    moreDetailsButton.scrollElementToView();
    moreDetailsButton.clickElement();
  }

  getClaimantText() {
    return this.#claimantLabel.getText().then((text) => text.trim());
  }

  getVictimObjectText() {
    return this.#victimObjectLabel.getText().then((text) => text.trim());
  }

  getVictimObjectTypeText() {
    return this.#victimObjectTypeLabel.getText().then((text) => text.trim());
  }

  clickOpenClaimButtonByIndex(i) {
    const openClaimButton = new Button(new XPATH(this.#openClaimButtonXPATH.replace('claimIndex', i)), 'open claim button');
    openClaimButton.clickElement();
  }
}

module.exports = new ClaimsListPage();
