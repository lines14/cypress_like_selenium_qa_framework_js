const BaseForm = require('../../main/baseForm.js');
const Label = require('../../main/elements/baseElementChildren/label.js');
const Button = require('../../main/elements/baseElementChildren/button.js');

class MainPageMST extends BaseForm {
    constructor() {
        super('//button[contains(text(), "Застраховаться")]', 'main page');
        this.tourismLink = new Label('//a[contains(text(), "Подробнее") and @href="/mst"]', 'tourism link');
        this.getInsuredButton = new Button('//button[contains(text(), "Застраховаться")]', 'get insured button');
    }

    clickGetInsuredButton() {
        this.getInsuredButton.clickElement();
    }

    clickTourismLink() {
        this.tourismLink.clickElement();
    }
}

module.exports = new MainPageMST();