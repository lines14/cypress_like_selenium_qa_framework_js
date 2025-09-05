const mainPage = require('../pageObjects/mainPage');
const shanyrakPage = require('../pageObjects/shanyrak/shanyrakPage');
const SMSVerificationPage = require('../pageObjects/SMSVerificationPage');
const policyRequestFormShanyrak = require('../pageObjects/shanyrak/policyRequestFormShanyrak');
const NodeEvents = require('../../support/nodeEvents');

exports.userPathShanyrak = (holder) => {
  it('Shanyrak user path:', { scrollBehavior: false }, () => {
    NodeEvents.resetClient(holder).then((responses) => {
      responses.forEach((response) => cy.wrap(response.status).should('be.equal', 200));
    });

    cy.open('/');
    mainPage.pageIsDisplayed().should('be.true');
    mainPage.clickGetInsuredButton();
    mainPage.clickShanyrakLink();

    shanyrakPage.pageIsDisplayed().should('be.true');
    shanyrakPage.clickPurchaseButton();

    SMSVerificationPage.pageIsDisplayed().should('be.true');
    SMSVerificationPage.inputPhone(holder.phoneTrimmed.shanyrak);
    SMSVerificationPage.clickNextButton();

    SMSVerificationPage.getSMSCodeBoxElement().should('be.visible')
      .then(() => NodeEvents.getLastCodeFromDB(holder.phone.shanyrak))
      .then((code) => SMSVerificationPage.enterSMSCode(code));

    policyRequestFormShanyrak.inputIIN(holder.iin);
    policyRequestFormShanyrak.getSlicedSelectedClientName()
      .should('be.equal', `${holder.first_name} ${holder.last_name.split('').shift()}`);
    policyRequestFormShanyrak.inputEmail(holder.email);
    policyRequestFormShanyrak.selectRandomCity();
    policyRequestFormShanyrak.inputInsuranceObjectAddressStreet(holder.addressStreet);
    policyRequestFormShanyrak.randomClickPrivateHomeCheckbox();
    policyRequestFormShanyrak.inputInsuranceObjectAddressHouseNumber(holder.addressHouseNumber);
    policyRequestFormShanyrak
      .inputInsuranceObjectAddressApartmentNumber(holder.addressApartmentNumber);
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
