const BaseForm = require('../../main/baseForm.js');
const Label = require('../../main/elements/baseElementChildren/label.js');

class TourismPageMST extends BaseForm {
    constructor() {
        super('//h1[contains(text(), "Медицинское страхование туристов")]', 'tourism page');
        this.purchaseButton = new Label('//a[contains(text(), "Купить")]', 'purchase button');
    }

    clickPurchaseButton() {
        this.purchaseButton.clickElement();
    }
}

module.exports = new TourismPageMST();