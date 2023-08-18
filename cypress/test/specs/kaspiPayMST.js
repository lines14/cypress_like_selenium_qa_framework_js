const nodeEvents = require('../../support/nodeEvents');
const policyRequestFormMST = require('../pageObjects/policyRequestFormMST');
const { userPathMST } = require('./userPathMST');

userPathMST(function payTest() {
    it('Pay with Kaspi:', { scrollBehavior: false }, () => {
        let sumToPay;
        cy.getSharedData('sumToPay').then((sum) => sumToPay = sum);
        policyRequestFormMST.clickKaspiPayButton();
        policyRequestFormMST.getPaymentNumber()
        .then((paymentNumber) => nodeEvents.payWithKaspi({ sumToPay, paymentNumber }))
        .then((response) => cy.wrap(response)
        .should('contain', 'оплачен'));
    });
});