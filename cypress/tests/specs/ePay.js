const epayPage = require('../pageObjects/epayPage');
const paymentChooseForm = require('../pageObjects/paymentChooseForm');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.ePay = (holder) => {
  it('Pay with Epay:', { scrollBehavior: false, retries: 0 }, () => {
    paymentChooseForm.pageIsDisplayed().should('be.true');
    paymentChooseForm.clickEpayButton();
    cy.getLocalStorage('sumToPay')
      .then((sum) => epayPage.getAmountToPay().should('be.equal', sum));
    epayPage.clickCardButton();
    epayPage.inputPaymentInfo(holder);
    epayPage.clickPayButton();
    epayPage.getPaymentStatus()
      .should('contain', JSONLoader.testData.responseSuccessful);
    epayPage.clickCloseButton();
    cy.url().should('satisfy', (url) => url === `${Cypress.config().baseUrl}/`
      || url === `${JSONLoader.testData.stagingURL}/`
      || url === `${JSONLoader.testData.devURL}/`);
    cy.clearLocalStorage();
  });
};
