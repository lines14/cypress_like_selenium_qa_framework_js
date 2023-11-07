const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');
const Button = require('../../main/elements/baseElementChildren/button');

class MainPage extends BaseForm {
    #tourismLink;
    #shanyrakLink;
    #summaryTransportButton;
    #obligatoryTransportLink;
    #getInsuredButton;

    constructor() {
        super(new XPATH('//button[contains(text(), "Застраховаться")]'), 'main page');
        this.#tourismLink = new Label(new XPATH('//a[contains(text(), "Подробнее") and @href="/mst"]'), 'tourism link');
        this.#shanyrakLink = new Label(new XPATH('//a[contains(text(), "Подробнее") and @href="/home"]'), 'shanyrak link');
        this.#summaryTransportButton = new Button(new XPATH('//button[contains(text(), "Подробнее")]'), 'summary transport button');
        this.#obligatoryTransportLink = new Label(new XPATH('//a[contains(text(), "ОГПО ВТС")]'), 'obligatory transport link');
        this.#getInsuredButton = new Button(new XPATH('//button[contains(text(), "Застраховаться")]'), 'get insured button');
    }

    clickGetInsuredButton() {
        this.#getInsuredButton.clickElement();
    }

    clickTourismLink() {
        this.#tourismLink.clickElement();
    }

    clickShanyrakLink() {
        this.#shanyrakLink.clickElement();
    }

    clickSummaryTransportButton() {
        this.#summaryTransportButton.clickElement();
    }

    clickObligatoryTransportLink() {
        this.#obligatoryTransportLink.clickElement();
    }
}

module.exports = new MainPage();