const epayPage = require('../pageObjects/epayPage');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.ePay = () => {
  it('Pay with Epay:', { scrollBehavior: false }, () => {
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
};
