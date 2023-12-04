const epayPage = require('../pageObjects/epayPage');
const policyRequestFormMutualOGPO = require('../pageObjects/policyRequestFormMutualOGPO');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const { userPathMutualOGPO } = require('./userPathMutualOGPO');

userPathMutualOGPO(function payTest() {
    it('Pay with Epay:', { scrollBehavior: false }, () => {
        policyRequestFormMutualOGPO.clickEpayButton();
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