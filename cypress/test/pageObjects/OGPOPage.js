const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');

class OGPOPage extends BaseForm {
    #purchaseButton;

    constructor() {
        super(new XPATH('//h1[contains(text(), "Обязательное автострахование")]'), 'OGPO page');
        this.#purchaseButton = new Label(new XPATH('//a[contains(text(), "Оформить")]'), 'purchase button');
    }

    clickPurchaseButton() {
        this.#purchaseButton.clickElement();
    }
}

module.exports = new OGPOPage();