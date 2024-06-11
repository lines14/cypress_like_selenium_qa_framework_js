const mainPage = require('../pageObjects/mainPage');
const shanyrakPage = require('../pageObjects/shanyrak/shanyrakPage');
const SMSVerificationPage = require('../pageObjects/SMSVerificationPage');
const policyRequestFormShanyrak = require('../pageObjects/shanyrak/policyRequestFormShanyrak');
const NodeEvents = require('../../support/nodeEvents');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.userPathShanyrak = () => {
  it('Shanyrak user path:', { scrollBehavior: false }, () => {
    cy.open('/');
    mainPage.pageIsDisplayed().should('be.true');
    mainPage.clickGetInsuredButton();
    mainPage.clickShanyrakLink();

    shanyrakPage.pageIsDisplayed().should('be.true');
    shanyrakPage.clickPurchaseButton();

    SMSVerificationPage.pageIsDisplayed().should('be.true');
    SMSVerificationPage.inputPhone(JSONLoader.testData.clientPhoneShanyrak.slice(1));
    SMSVerificationPage.clickNextButton();

    SMSVerificationPage.getSMSCodeBoxElement().should('be.visible')
      .then(() => NodeEvents.getLastCodeFromDB(JSONLoader.testData.clientPhoneShanyrak))
      .then((code) => SMSVerificationPage.enterSMSCode(code));

    policyRequestFormShanyrak.inputIIN();
    policyRequestFormShanyrak.getSlicedSelectedClientName()
      .should('be.equal', JSONLoader.testData.clientName);
    policyRequestFormShanyrak.inputEmail();
    policyRequestFormShanyrak.selectRandomCity();
    policyRequestFormShanyrak.inputInsuranceObjectAddressStreet();
    policyRequestFormShanyrak.randomClickPrivateHomeCheckbox();
    policyRequestFormShanyrak.inputInsuranceObjectAddressHouseNumber();
    policyRequestFormShanyrak.inputInsuranceObjectAddressApartmentNumber();
    policyRequestFormShanyrak.clickConfirmationCheckbox();
    policyRequestFormShanyrak.inputRandomStartDate();
    policyRequestFormShanyrak.clickSaveButton();
    policyRequestFormShanyrak.clickAcceptanceCheckbox();
    policyRequestFormShanyrak.getSumToPay().then((sum) => {
      policyRequestFormShanyrak.getPrice()
        .should('be.equal', sum);
      cy.setLocalStorage('sumToPay', sum);
    });
  });
};
