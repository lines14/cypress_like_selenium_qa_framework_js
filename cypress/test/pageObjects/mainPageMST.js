const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');
const Button = require('../../main/elements/baseElementChildren/button');

class MainPageMST extends BaseForm {
    #tourismLink;
    #getInsuredButton;

    constructor() {
        super(new XPATH('//button[contains(text(), "Застраховаться")]'), 'main page');
        this.#tourismLink = new Label(new XPATH('//a[contains(text(), "Подробнее") and @href="/mst"]'), 'tourism link');
        this.#getInsuredButton = new Button(new XPATH('//button[contains(text(), "Застраховаться")]'), 'get insured button');
    }

    clickGetInsuredButton() {
        this.#getInsuredButton.clickElement();
    }

    clickTourismLink() {
        this.#tourismLink.clickElement();
    }
}

module.exports = new MainPageMST();