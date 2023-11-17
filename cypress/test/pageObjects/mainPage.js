const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');
const Button = require('../../main/elements/baseElementChildren/button');

class MainPage extends BaseForm {
    #MSTLink;
    #shanyrakLink;
    #transportButton;
    #OGPOLink;
    #getInsuredButton;

    constructor() {
        super(new XPATH('//button[contains(text(), "Застраховаться")]'), 'main page');
        this.#MSTLink = new Label(new XPATH('//a[contains(text(), "Подробнее") and @href="/mst"]'), 'MST link');
        this.#shanyrakLink = new Label(new XPATH('//a[contains(text(), "Подробнее") and @href="/home"]'), 'Shanyrak link');
        this.#transportButton = new Button(new XPATH('//button[contains(text(), "Подробнее")]'), 'transport button');
        this.#OGPOLink = new Label(new XPATH('//a[contains(text(), "ОГПО ВТС")]'), 'OGPO link');
        this.#getInsuredButton = new Button(new XPATH('//button[contains(text(), "Застраховаться")]'), 'get insured button');
    }

    clickGetInsuredButton() {
        this.#getInsuredButton.clickElement();
    }

    clickMSTLink() {
        this.#MSTLink.clickElement();
    }

    clickShanyrakLink() {
        this.#shanyrakLink.clickElement();
    }

    clickTransportButton() {
        this.#transportButton.clickElement();
    }

    clickOGPOLink() {
        return this.#OGPOLink.clickElement();
    }
}

module.exports = new MainPage();