const mainPage = require('../pageObjects/mainPage');
const policyRequestFormShanyrak = require('../pageObjects/policyRequestFormShanyrak');
const NodeEvents = require('../../support/nodeEvents');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const { userPathShanyrak } = require('./userPathShanyrak');

userPathShanyrak(function payTest() {
    it('Pay with Kaspi:', { scrollBehavior: false }, () => {
        let sumToPay;
        cy.getLocalStorage('sumToPay').then((sum) => sumToPay = sum);
        policyRequestFormShanyrak.clickKaspiPayButton();
        policyRequestFormShanyrak.getOrderPaymentElement().should('be.visible');
        policyRequestFormShanyrak.getPaymentNumber()
        .then((paymentNumber) => NodeEvents.payWithKaspi({ sumToPay, paymentNumber }))
        .then((response) => cy.wrap(response)
        .should('contain', JSONLoader.testData.responsePaid));
        policyRequestFormShanyrak.clickMainPageButton();
        mainPage.pageIsDisplayed().should('be.true');
    });
});