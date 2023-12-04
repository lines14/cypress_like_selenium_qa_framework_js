const OGPOPage = require('../pageObjects/OGPOPage');
const policyRequestFormMutualOGPO = require('../pageObjects/policyRequestFormMutualOGPO');
const NodeEvents = require('../../support/nodeEvents');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const { userPathMutualOGPO } = require('./userPathMutualOGPO');

userPathMutualOGPO(function payTest() {
    it('Pay with Kaspi:', { scrollBehavior: false }, () => {
        let sumToPay;
        cy.getLocalStorage('sumToPay').then((sum) => sumToPay = sum);
        policyRequestFormMutualOGPO.clickKaspiPayButton();
        policyRequestFormMutualOGPO.getPaymentNumber()
        .then((paymentNumber) => NodeEvents.payWithKaspi({ sumToPay, paymentNumber }))
        .then((response) => cy.wrap(response)
        .should('contain', JSONLoader.testData.responsePaid));
        policyRequestFormMutualOGPO.clickOGPOPageButton();
        OGPOPage.pageIsDisplayed().should('be.true');
    });
});