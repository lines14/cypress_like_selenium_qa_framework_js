const mainPage = require('../pageObjects/mainPage');
const policyRequestFormMST = require('../pageObjects/policyRequestFormMST');
const NodeEvents = require('../../support/nodeEvents');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

describe('MST payment', () => {
    it('Pay with Kaspi:', { scrollBehavior: false }, () => {
        let sumToPay;
        cy.getLocalStorage('sumToPay').then((sum) => sumToPay = sum);
        policyRequestFormMST.clickKaspiPayButton();
        policyRequestFormMST.getPaymentCode()
        .then((paymentCode) => NodeEvents.payWithKaspi({ sumToPay, paymentCode }))
        .then((responses) => {
            responses.forEach((response) => cy.wrap(response.status).should('be.equal', 200));
            DataUtils.XMLToJSON(responses.pop().data).then((convertedResponse) => {
                cy.wrap(convertedResponse.comment.pop())
                .should('contain', JSONLoader.testData.responsePaid);
            });
        });
        policyRequestFormMST.clickMainPageButton();
        mainPage.pageIsDisplayed().should('be.true');
    });
});