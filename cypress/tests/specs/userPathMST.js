const mainPage = require('../pageObjects/mainPage');
const MSTPage = require('../pageObjects/MST/MSTPage');
const MSTStep1 = require('../pageObjects/MST/MSTStep1');
const MSTStep2 = require('../pageObjects/MST/MSTStep2');
const MSTStep3 = require('../pageObjects/MST/MSTStep3');
const MSTStep4 = require('../pageObjects/MST/MSTStep4');
const NodeEvents = require('../../support/nodeEvents');

exports.userPathMST = (holder) => {
  it('MST user path:', { scrollBehavior: false }, () => {
    NodeEvents.resetClient(holder)
      .then(async (response) => cy.wrap(response.status).should('be.equal', 200));

    cy.open('/');
    mainPage.pageIsDisplayed().should('be.true');
    mainPage.clickGetInsuredButton();
    mainPage.clickMSTLink();

    MSTPage.pageIsDisplayed().should('be.true');
    MSTPage.clickPurchaseButton();

    MSTStep1.pageIsDisplayed().should('be.true');
    MSTStep1.selectThreeRandomCountries();
    MSTStep1.getDisplayedCountries()
      .then((displayedCountries) => MSTStep1.getSelectedCountries()
        .should('be.deep.equal', displayedCountries));
    MSTStep1.inputRandomDates();
    MSTStep1.getDisplayedDates()
      .then((displayedDates) => MSTStep1.getSelectedDates()
        .should('be.deep.equal', displayedDates));
    MSTStep1.inputIIN(holder.iin);
    MSTStep1.getSelectedClientNameElement()
      .should('contain', `${holder.first_name} ${holder.last_name.split('').shift()}`);
    MSTStep1.getSlicedDisplayedClientName()
      .then((slicedName) => MSTStep1.getSelectedClientNameElement()
        .should('contain', slicedName));
    MSTStep1.selectRandomInsuranceLimit();
    MSTStep1.selectRandomPurposeOfTheTrip();
    MSTStep1.getDisplayedPurposeOfTheTrip()
      .then((displayedPurpose) => MSTStep1.getSelectedPurposeOfTheTrip()
        .should('be.equal', displayedPurpose));
    MSTStep1.clickRandomAdditionalCheckboxes();
    MSTStep1.clickCalculateButton();
    MSTStep1.clickNextButton();

    MSTStep2.getOrSetDocumentNumber(holder.document_number);
    MSTStep2.inputAddress(holder.address);
    MSTStep2.clickNextButton();

    MSTStep3.inputEmail(holder.email);
    MSTStep3.clickNextButton();

    MSTStep4.inputPhone(holder.phoneTrimmed.MST);
    MSTStep4.clickNextButton();

    MSTStep4.getSMSCodeBoxElement().should('be.visible')
      .then(() => NodeEvents.getLastCodeFromDB(holder.phone.MST))
      .then((code) => MSTStep4.enterSMSCode(code));

    // NodeEvents.toggleVerification()
    // .then(() => NodeEvents.getVerifyBool()
    //   .then(() => MSTStep4.clickAcceptanceCheckbox()));
    MSTStep4.clickAcceptanceCheckbox();
    MSTStep4.getSumToPay().then((sum) => {
      cy.setLocalStorage('sumToPay', sum);
      MSTStep4.getTotalCostFromDisplayedValues()
        .should('be.equal', Number(sum));
    });
  });
};
