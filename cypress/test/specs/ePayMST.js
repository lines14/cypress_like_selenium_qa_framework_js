const epayPage = require('../pageObjects/epayPage');
const mainPageMST = require('../pageObjects/mainPageMST');
const policyRequestFormMST = require('../pageObjects/policyRequestFormMST');
const { userPathMST } = require('./userPathMST');

userPathMST(function payTest() {
    it('Pay with epay:', { scrollBehavior: false }, () => {
        policyRequestFormMST.clickEpayButton();
        epayPage.pageIsDisplayed().should('be.true');
        epayPage.payWithEpay();
        mainPageMST.pageIsDisplayed().should('be.true');
    });
});