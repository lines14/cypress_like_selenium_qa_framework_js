const mainPage = require('../pageObjects/mainPage');
const policyRequestFormMST = require('../pageObjects/policyRequestFormMST');
const NodeEvents = require('../../support/nodeEvents');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const { userPathMST } = require('./userPathMST');

userPathMST(function payTest() {
    it('Pay with Kaspi:', { scrollBehavior: false }, () => {
        let sumToPay;
        cy.getLocalStorage('sumToPay').then((sum) => sumToPay = sum);
        policyRequestFormMST.clickKaspiPayButton();
        policyRequestFormMST.getPaymentNumber()
        .then((paymentNumber) => NodeEvents.payWithKaspi({ sumToPay, paymentNumber }))
        .then((response) => cy.wrap(response)
        .should('contain', JSONLoader.testData.responsePaid));
        policyRequestFormMST.clickMainPageButton();
        mainPage.pageIsDisplayed().should('be.true');
    });
});