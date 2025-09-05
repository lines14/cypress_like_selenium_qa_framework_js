const BaseForm = require('../../../../main/baseForm');
const XPATH = require('../../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../../main/elements/baseElementChildren/label');
const Button = require('../../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../../main/elements/baseElementChildren/textbox');
const Checkbox = require('../../../../main/elements/baseElementChildren/checkbox');
const Randomizer = require('../../../../main/utils/random/randomizer');
const JSONLoader = require('../../../../main/utils/data/JSONLoader');

class ClaimCreateStep3 extends BaseForm {
  #victimObjectFormLabel;

  #OGPOInsuranceEventTypeDropdown;

  #OGPOInsuranceEventTypeDropdownChosenElement;

  #OGPOInsuranceEventTypeDropdownElements;

  #insuredObjectDropdown;

  #insuredObjectDropdownElements;

  #searchVictimVehicleWithoutVerificationCheckbox;

  #searchVictimVehicleInputField;

  #searchVictimVehicleButton;

  #victimVehicleRegNumInputField;

  #victimVehicleTitleLabel;

  #victimVehicleYearLabel;

  #victimVehicleOwnerJuridicalPersonBoolCheckbox;

  #victimVehicleOwnerSearchInputField;

  #victimVehicleOwnerSearchButton;

  #victimVehicleOwnerFullNameLabel;

  #victimVehicleDriverSearchInputField;

  #victimVehicleDriverSearchButton;

  #victimVehicleDriverFullNameLabel;

  #lastVictimObjectRisksDropdown;

  #lastVictimObjectRisksDropdownElements;

  #lastVictimObjectDamageDescriptionInputField;

  #addVictimObjectButton;

  #lastVictimObjectTypeDropdown;

  #lastVictimObjectRisksDropdownChosenElement;

  #lastVictimObjectTypeDropdownElements;

  #victimClientSearchInputField;

  #victimClientSearchButton;

  #victimClientFullNameLabel;

  #deathBoolCheckbox;

  #invalidBoolCheckbox;

  #victimOtherTypeDropdown;

  #victimOtherTypeDropdownChosenElement;

  #victimOtherTypeDropdownElements;

  #victimOtherOwnerJuridicalPersonBoolCheckbox;

  #victimOtherOwnerSearchInputField;

  #victimOtherOwnerSearchButton;

  #victimOtherOwnerFullNameLabel;

  #victimOtherDescriptionInputField;

  #createClaimButton;

  constructor() {
    super(new XPATH('//div[contains(@class,"mb-flex-direction-column")]/child::h6'), 'claims create step 3 page');
    this.#OGPOInsuranceEventTypeDropdown = new Button(new XPATH('//label[text() = "Тип Страхового случая *"]/following-sibling::div//div[@class = "multiselect__select"]'), 'OGPO insurance event type dropdown');
    this.#OGPOInsuranceEventTypeDropdownChosenElement = new Button(new XPATH('//label[text() = "Тип Страхового случая *"]/following-sibling::div//span[@class = "multiselect__single"]'), 'OGPO insurance event type dropdown chosen element');
    this.#OGPOInsuranceEventTypeDropdownElements = new Button(new XPATH('//label[text() = "Тип Страхового случая *"]/following-sibling::div//li[@class = "multiselect__element"]'), 'OGPO insurance event type dropdown elements');
    this.#insuredObjectDropdown = new Button(new XPATH('(//label[@for = "vehicle_esbd_id"]/following-sibling::div//div[@class = "multiselect__select"])[last()]'), 'last victim object risks dropdown');
    this.#insuredObjectDropdownElements = new Button(new XPATH('//label[@for = "vehicle_esbd_id"]/following-sibling::div//li[@class = "multiselect__element"]'), 'last victim object risks dropdown elements');
    this.#victimObjectFormLabel = new Label(new XPATH('//div[contains(@class,"mb-flex-direction-column")]/h6'), 'victim object form label');
    this.#searchVictimVehicleWithoutVerificationCheckbox = new Checkbox(new XPATH('//input[@id = "is_tf_foreign"]'), 'non verification vehicle search checkbox');
    this.#searchVictimVehicleInputField = new Textbox(new XPATH('//input[@id = "vehicle_0"]'), 'search vehicle input field');
    this.#searchVictimVehicleButton = new Button(new XPATH('//input[@id = "vehicle_0"]/following-sibling::button'), 'search vehicle button');
    this.#victimVehicleRegNumInputField = new Textbox(new XPATH('//input[@id = "reg_number_0_0"]'), 'reg num input field');
    this.#victimVehicleTitleLabel = new Label(new XPATH('//input[@id = "reg_number_0_0"]/following::span[@class = "subtitle-16 -orange"]'), 'vehicle title label');
    this.#victimVehicleYearLabel = new Label(new XPATH('//input[@id = "reg_number_0_0"]/following::span[@class = "subtitle-16 -grey"]'), 'vehicle year label');
    this.#victimVehicleOwnerJuridicalPersonBoolCheckbox = new Checkbox(new XPATH('//input[@id = "juridical_bool_0_0"]/parent::div'), 'victim vehicle owner juridical person bool checkbox');
    this.#victimVehicleOwnerSearchInputField = new Textbox(new XPATH('//input[@id = "owner_0"]'), 'victim vehicle owner search input field');
    this.#victimVehicleOwnerSearchButton = new Button(new XPATH('//input[@id = "owner_0"]/following-sibling::button'), 'victim vehicle owner search button');
    this.#victimVehicleOwnerFullNameLabel = new Label(new XPATH('//input[@id = "owner_0"]/following::span[@class = "form-fio"]'), 'victim vehicle owner full name label');
    this.#victimVehicleDriverSearchInputField = new Textbox(new XPATH('//input[@id = "driver_0"]'), 'victim vehicle client search input field');
    this.#victimVehicleDriverSearchButton = new Button(new XPATH('//input[@id = "driver_0"]/following-sibling::button'), 'victim vehicle client search button');
    this.#victimVehicleDriverFullNameLabel = new Label(new XPATH('//input[@id = "driver_0"]/following::span[@class = "form-fio"]'), 'victim vehicle client full name label');
    this.#lastVictimObjectRisksDropdown = new Button(new XPATH('(//span[text() = "Тип риска договоров страхования *"]/following-sibling::div//div[@class = "multiselect__select"])[last()]'), 'last victim object risks dropdown');
    this.#lastVictimObjectRisksDropdownChosenElement = new Button(new XPATH('(//span[text() = "Тип риска договоров страхования *"]/following-sibling::div//div[@class = "multiselect__select"])[last()]/following::span[@class = "multiselect__single"]'), 'last victim object risks dropdown chosen element');
    this.#lastVictimObjectRisksDropdownElements = new Button(new XPATH('(//span[text() = "Тип риска договоров страхования *"]/following-sibling::div//div[@class = "multiselect__select"])[last()]/following-sibling::div//li[@class = "multiselect__element"]'), 'last victim object risks dropdown elements');
    this.#lastVictimObjectDamageDescriptionInputField = new Textbox(new XPATH('(//label[text() = "Описание повреждения *"]/following::textarea)[last()]'), 'last victim object damage description input field');
    this.#addVictimObjectButton = new Button(new XPATH('(//button[contains(text(), "Добавить объект")])[last()]'), 'add victim object button');
    this.#lastVictimObjectTypeDropdown = new Button(new XPATH('(//span[text() = "Вид пострадавшего объекта *"]/following-sibling::div//div[@class = "multiselect__select"])[last()]'), 'last victim object type dropdown');
    this.#lastVictimObjectTypeDropdownElements = new Button(new XPATH('(//span[text() = "Вид пострадавшего объекта *"]/following-sibling::div//div[@class = "multiselect__select"])[last()]/following-sibling::div//li[@class = "multiselect__element"]'), 'last victim object type dropdown elements');
    this.#victimClientSearchInputField = new Textbox(new XPATH('//input[@id = "client_1"]'), 'victim client search input field');
    this.#victimClientSearchButton = new Button(new XPATH('//input[@id = "client_1"]/following-sibling::button'), 'victim client search button');
    this.#victimClientFullNameLabel = new Label(new XPATH('//input[@id = "client_1"]/following::span[@class = "form-fio"]'), 'victim client full name label');
    this.#deathBoolCheckbox = new Checkbox(new XPATH('//input[@id = "death_bool_0_1"]'), 'death bool checkbox');
    this.#invalidBoolCheckbox = new Checkbox(new XPATH('//input[@id = "invalid_0_1"]'), 'invalid bool checkbox');
    this.#victimOtherTypeDropdown = new Button(new XPATH('//span[text() = "Иной тип пострадавшего объекта *"]/following-sibling::div//div[@class = "multiselect__select"]'), 'victim other type dropdown');
    this.#victimOtherTypeDropdownChosenElement = new Button(new XPATH('//span[text() = "Иной тип пострадавшего объекта *"]/following-sibling::div//span[@class = "multiselect__single"]'), 'victim other type dropdown chosen element');
    this.#victimOtherTypeDropdownElements = new Button(new XPATH('//span[text() = "Иной тип пострадавшего объекта *"]/following-sibling::div//li[@class = "multiselect__element"]'), 'victim other type dropdown elements');
    this.#victimOtherOwnerJuridicalPersonBoolCheckbox = new Checkbox(new XPATH('//input[@id = "juridical_bool_0_2"]/parent::div'), 'victim vehicle other juridical person bool checkbox');
    this.#victimOtherOwnerSearchInputField = new Textbox(new XPATH('//input[@id = "owner_2"]'), 'victim other owner search input field');
    this.#victimOtherOwnerSearchButton = new Button(new XPATH('//input[@id = "owner_2"]/following-sibling::button'), 'victim other owner search button');
    this.#victimOtherOwnerFullNameLabel = new Label(new XPATH('//input[@id = "owner_2"]/following::span[@class = "form-fio"]'), 'victim other owner full name label');
    this.#victimOtherDescriptionInputField = new Textbox(new XPATH('//input[@id = "description_0_2"]'), 'victim other description input field');
    this.#createClaimButton = new Button(new XPATH('//button[contains(text(), "Создать заявление")]'), 'create claim button');
  }

  getVictimObjectFormLabelText() {
    this.#victimObjectFormLabel.scrollElementToView();
    return this.#victimObjectFormLabel.getText();
  }

  /* Now OGPO testcase always includes victim vehicle, client and other.
  That's why IE type is always "health and property damaged". */
  chooseOGPOInsuranceEventType() {
    this.#OGPOInsuranceEventTypeDropdown.clickElement();
    this.#OGPOInsuranceEventTypeDropdownElements.chooseElementFromDropdown(
      JSONLoader.testData.OGPOInsuranceEventHealthAndPropertyDamagedType,
    );
  }

  randomlyChooseInsuredObject() {
    this.#insuredObjectDropdown
      .chooseRandomElementsFromDropdownByText(this.#insuredObjectDropdownElements);
  }

  randomlyClickSearchVehicleWithoutVerificationCheckbox() {
    if (Randomizer.getRandomInteger(1)) {
      this.#searchVictimVehicleWithoutVerificationCheckbox.clickElement();
    }
  }

  inputSearchVehicleVIN(VIN) {
    this.#searchVictimVehicleInputField.clearData();
    return this.#searchVictimVehicleInputField.inputData(VIN);
  }

  clickSearchVehicleButton() {
    this.#searchVictimVehicleButton.clickElement();
  }

  inputRegNum(regNum) {
    this.#victimVehicleRegNumInputField.clearData();
    return this.#victimVehicleRegNumInputField.inputData(regNum);
  }

  getVictimVehicleTitle() {
    return this.#victimVehicleTitleLabel.getText();
  }

  getVictimVehicleYear() {
    return this.#victimVehicleYearLabel.getText();
  }

  clickVictimVehicleOwnerJuridicalPersonBoolCheckbox() {
    this.#victimVehicleOwnerJuridicalPersonBoolCheckbox.clickElement();
  }

  inputVictimVehicleOwnerIIN(IIN) {
    this.#victimVehicleOwnerSearchInputField.clearData();
    return this.#victimVehicleOwnerSearchInputField.inputData(IIN);
  }

  clickVictimVehicleOwnerSearchButton() {
    this.#victimVehicleOwnerSearchButton.clickElement();
  }

  getVictimVehicleOwnerFullNameLabelText() {
    this.#victimVehicleOwnerFullNameLabel.scrollElementToView();
    return this.#victimVehicleOwnerFullNameLabel.getText();
  }

  inputVictimVehicleDriverIIN(IIN) {
    this.#victimVehicleDriverSearchInputField.clearData();
    return this.#victimVehicleDriverSearchInputField.inputData(IIN);
  }

  clickVictimVehicleDriverSearchButton() {
    this.#victimVehicleDriverSearchButton.clickElement();
  }

  getVictimVehicleDriverFullNameLabelText() {
    this.#victimVehicleDriverFullNameLabel.scrollElementToView();
    return this.#victimVehicleDriverFullNameLabel.getText();
  }

  randomlyChooseLastVictimObjectsRisk() {
    this.#lastVictimObjectRisksDropdown
      .chooseRandomElementsFromDropdownByText(this.#lastVictimObjectRisksDropdownElements);
  }

  inputLastVictimObjectDamageDescription(damageDescription) {
    this.#lastVictimObjectDamageDescriptionInputField.scrollElementToView();
    this.#lastVictimObjectDamageDescriptionInputField.clearData();
    return this.#lastVictimObjectDamageDescriptionInputField.inputData(damageDescription);
  }

  clickCreateClaimButton() {
    this.#createClaimButton.scrollElementToView();
    this.#createClaimButton.clickElement();
  }

  clickAddVictimObjectButton() {
    this.#addVictimObjectButton.scrollElementToView();
    this.#addVictimObjectButton.clickElement();
  }

  chooseLastVictimObjectType(type) {
    this.#lastVictimObjectTypeDropdown.scrollElementToView();
    this.#lastVictimObjectTypeDropdown.clickElement();

    switch (type) {
      case 'vehicle':
        this.#lastVictimObjectTypeDropdownElements
          .chooseElementFromDropdown(JSONLoader.testData.OGPOVictimObjectTypes.vehicle);
        break;
      case 'client':
        this.#lastVictimObjectTypeDropdownElements
          .chooseElementFromDropdown(JSONLoader.testData.OGPOVictimObjectTypes.client);
        break;
      case 'other':
        this.#lastVictimObjectTypeDropdownElements
          .chooseElementFromDropdown(JSONLoader.testData.OGPOVictimObjectTypes.other);
        break;
      default:
        throw new Error('[err]   can\'t choose last victim object\'s type!');
    }
  }

  inputVictimClientIIN(IIN) {
    this.#victimClientSearchInputField.clearData();
    return this.#victimClientSearchInputField.inputData(IIN);
  }

  clickVictimClientSearchButton() {
    this.#victimClientSearchButton.clickElement();
  }

  getVictimClientFullNameLabelText() {
    this.#victimClientFullNameLabel.scrollElementToView();
    return this.#victimClientFullNameLabel.getText();
  }

  randomlyClickDeathBoolCheckbox() {
    if (Randomizer.getRandomInteger(1)) this.#deathBoolCheckbox.clickElement();
  }

  randomlyClickInvalidBoolCheckbox() {
    if (Randomizer.getRandomInteger(1)) this.#invalidBoolCheckbox.clickElement();
  }

  randomlyChooseVictimOtherType() {
    this.#victimOtherTypeDropdown
      .chooseRandomElementsFromDropdownByText(this.#victimOtherTypeDropdownElements);
  }

  clickVictimOtherOwnerJuridicalPersonBoolCheckbox() {
    this.#victimOtherOwnerJuridicalPersonBoolCheckbox.clickElement();
  }

  inputVictimOtherOwnerIIN(IIN) {
    this.#victimOtherOwnerSearchInputField.clearData();
    return this.#victimOtherOwnerSearchInputField.inputData(IIN);
  }

  clickVictimOtherOwnerSearchButton() {
    this.#victimOtherOwnerSearchButton.clickElement();
  }

  getVictimOtherOwnerFullNameLabelText() {
    this.#victimOtherOwnerFullNameLabel.scrollElementToView();
    return this.#victimOtherOwnerFullNameLabel.getText();
  }

  inputVictimOtherDescription(victimOtherDescription) {
    this.#victimOtherDescriptionInputField.scrollElementToView();
    this.#victimOtherDescriptionInputField.clearData();
    return this.#victimOtherDescriptionInputField.inputData(victimOtherDescription);
  }

  getChosenOGPOInsuranceEventType() {
    return this.#OGPOInsuranceEventTypeDropdownChosenElement.getText();
  }

  getLastVictimObjectsChosenRisk() {
    return this.#lastVictimObjectRisksDropdownChosenElement.getText();
  }

  getChosenVictimOtherType() {
    return this.#victimOtherTypeDropdownChosenElement.getText();
  }
}

module.exports = new ClaimCreateStep3();
