const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');

class ShanyrakPage extends BaseForm {
    #purchaseButton;

    constructor() {
        super(new XPATH('//h1[contains(text(), "Страхование квартиры или дома")]'), 'Shanyrak page');
        this.#purchaseButton = new Label(new XPATH('//a[contains(text(), "Купить онлайн")]'), 'purchase button');
    }

    clickPurchaseButton() {
        this.#purchaseButton.clickElement();
    }
}

module.exports = new ShanyrakPage();