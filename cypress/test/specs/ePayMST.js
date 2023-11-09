const epayPage = require('../pageObjects/epayPage');
const policyRequestFormMST = require('../pageObjects/policyRequestFormMST');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const { userPathMST } = require('./userPathMST');

userPathMST(function payTest() {
    it('Pay with Epay:', { scrollBehavior: false }, () => {
        policyRequestFormMST.clickEpayButton();
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