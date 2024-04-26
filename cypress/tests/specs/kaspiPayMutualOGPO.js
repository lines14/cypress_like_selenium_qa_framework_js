const OGPOPage = require('../pageObjects/OGPOPage');
const policyRequestFormMutualOGPO = require('../pageObjects/policyRequestFormMutualOGPO');
const NodeEvents = require('../../support/nodeEvents');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.kaspiPayMutualOGPO = () => {
  it('Pay with Kaspi:', { scrollBehavior: false }, () => {
    let sumToPay;
    cy.getLocalStorage('sumToPay').then((sum) => sumToPay = sum);
    policyRequestFormMutualOGPO.clickKaspiPayButton();
    policyRequestFormMutualOGPO.getPaymentCode()
      .then((paymentCode) => cy.getLocalStorage('sumToPay')
        .then((sumToPay) => NodeEvents.payWithKaspi({ sumToPay, paymentCode })))
      .then(async (responses) => {
        responses.forEach((response) => cy.wrap(response.status).should('be.equal', 200));
        const convertedResponse = await DataUtils.XMLToJSON(responses.pop().data);
        cy.wrap(convertedResponse.comment.pop())
          .should('contain', JSONLoader.testData.responsePaid);
      });
    policyRequestFormMutualOGPO.clickOGPOPageButton();
    OGPOPage.pageIsDisplayed().should('be.true');
  });
}