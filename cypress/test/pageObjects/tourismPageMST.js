const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');

class TourismPageMST extends BaseForm {
    #purchaseButton;

    constructor() {
        super(new XPATH('//h1[contains(text(), "Медицинское страхование туристов")]'), 'tourism page');
        this.#purchaseButton = new Label(new XPATH('//a[contains(text(), "Купить")]'), 'purchase button');
    }

    clickPurchaseButton() {
        this.#purchaseButton.clickElement();
    }
}

module.exports = new TourismPageMST();