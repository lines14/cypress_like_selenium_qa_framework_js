const epayPage = require('../pageObjects/epayPage');
const paymentChooseForm = require('../pageObjects/paymentChooseForm');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.ePay = (holder) => {
  it('Pay with Epay:', { scrollBehavior: false }, () => {
    paymentChooseForm.pageIsDisplayed().should('be.true');
    paymentChooseForm.clickEpayButton();
    epayPage.pageIsDisplayed().should('be.true');
    cy.getLocalStorage('sumToPay')
      .then((sum) => epayPage.getAmountToPay().should('be.equal', sum));
    epayPage.inputPaymentInfo(holder);
    epayPage.clickPayButton();
    epayPage.getPaymentStatus()
      .should('contain', JSONLoader.testData.responseSuccessful);
    epayPage.clickCloseButton();
    cy.url().should('be.equal', JSONLoader.testData.mainPageLink);
  });
};
