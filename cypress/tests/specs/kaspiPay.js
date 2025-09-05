const paymentChooseForm = require('../pageObjects/paymentChooseForm');
const NodeEvents = require('../../support/nodeEvents');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.kaspiPay = () => {
  it('Pay with Kaspi:', { scrollBehavior: false, retries: 0 }, () => {
    paymentChooseForm.pageIsDisplayed().should('be.true');
    paymentChooseForm.clickKaspiPayButton();
    paymentChooseForm.getPaymentCode()
      .then((paymentCode) => cy.getLocalStorage('sumToPay')
        .then((sumToPay) => NodeEvents.payWithKaspi({ sumToPay, paymentCode })))
      .then(async (responses) => {
        responses.forEach((response) => cy.wrap(response.status).should('be.equal', 200));
        const convertedResponse = await DataUtils.XMLToJSON(responses.pop().data);
        cy.wrap(convertedResponse.comment.pop())
          .should('contain', JSONLoader.testData.responsePaid);
      });

    cy.url().should('satisfy', (url) => url === `${Cypress.config().baseUrl}/buy-mst`
      || url === `${Cypress.config().baseUrl}/ru/buy-ogpo`);
    cy.clearLocalStorage();
  });
};
