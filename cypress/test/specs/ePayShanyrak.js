const epayPage = require('../pageObjects/epayPage');
const policyRequestFormShanyrak = require('../pageObjects/policyRequestFormShanyrak');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const { userPathShanyrak } = require('./userPathShanyrak');

userPathShanyrak(function payTest() {
    it('Pay with Epay:', { scrollBehavior: false }, () => {
        policyRequestFormShanyrak.clickEpayButton();
        epayPage.pageIsDisplayed().should('be.true');
        cy.getLocalStorage('sumToPay')
        .then((sum) => epayPage.getAmountToPay().should('be.equal', sum));
        epayPage.inputPaymentInfo();
        epayPage.clickPayButton();
        epayPage.getPaymentStatus()
        .should('contain', JSONLoader.testData.responseSuccessful);
        epayPage.clickCloseButton();
        cy.url().should('be.equal', JSONLoader.testData.link);
    });
});