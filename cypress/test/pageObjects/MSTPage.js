const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');

class MSTPage extends BaseForm {
    #purchaseButton;

    constructor() {
        super(new XPATH('//h1[contains(text(), "Медицинское страхование туристов")]'), 'MST page');
        this.#purchaseButton = new Label(new XPATH('//a[contains(text(), "Купить")]'), 'purchase button');
    }

    clickPurchaseButton() {
        this.#purchaseButton.clickElement();
    }
}

module.exports = new MSTPage();