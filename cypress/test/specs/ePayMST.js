const epayPage = require('../pageObjects/epayPage');
const mainPageMST = require('../pageObjects/mainPageMST');
const policyRequestFormMST = require('../pageObjects/policyRequestFormMST');
const { userPathMST } = require('./userPathMST');

userPathMST(function payTest() {
    it('Pay with epay:', { scrollBehavior: false }, () => {
        policyRequestFormMST.clickEpayButton();
        epayPage.pageIsDisplayed().should('be.true');
        cy.getSharedData('sumToPay')
        .then((sum) => epayPage.getAmountToPay()
        .should('be.equal', sum));
        epayPage.payWithEpay();
        mainPageMST.pageIsDisplayed().should('be.true');
    });
});