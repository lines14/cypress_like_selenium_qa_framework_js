const epayPage = require('../pageObjects/epayPage');
const configManager = require('../../main/utils/data/configManager');
const policyRequestFormMST = require('../pageObjects/policyRequestFormMST');
const { userPathMST } = require('./userPathMST');

userPathMST(function payTest() {
    it('Pay with epay:', { scrollBehavior: false }, () => {
        policyRequestFormMST.clickEpayButton();
        epayPage.pageIsDisplayed().should('be.true');
        cy.getLocalStorage('sumToPay')
        .then((sum) => epayPage.getAmountToPay().should('be.equal', sum));
        epayPage.inputPaymentInfo();
        epayPage.clickPayButton();
        epayPage.getPaymentStatus().should('contain', 'успешно');
        epayPage.clickCloseButton();
        cy.url().should('be.equal', configManager.getTestData().link);
    });
});