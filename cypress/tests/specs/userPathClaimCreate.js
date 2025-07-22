const moment = require('moment');
const mainPage = require('../pageObjects/mainPage');
const header = require('../pageObjects/header');
const loginPage = require('../pageObjects/login');
const claimsListPage = require('../pageObjects/claims/claimsListPage');
const claimsCreateStep1 = require('../pageObjects/claims/create/claimsCreateStep1');
const claimsCreateStep2 = require('../pageObjects/claims/create/claimsCreateStep2');
const claimsCreateStep3 = require('../pageObjects/claims/create/claimsCreateStep3');
const claimPage = require('../pageObjects/claims/claim/claimPage');
const Randomizer = require('../../main/utils/random/randomizer');
const JSONLoader = require('../../main/utils/data/JSONLoader');

/* eslint-disable no-loop-func */
exports.userPathClaimCreate = (
  claimant,
  victimVehicleOwner,
  victimVehicleDriver,
  victimClient,
  victimOtherOwner,
  car,
  fakeData,
) => {
  it('claim create user path:', { scrollBehavior: false }, () => {
    let OGPOInsuranceEventType;
    let victimOtherType;
    let authorizedUserName;
    let chosenApplicantType;
    let claimNumber;
    let victimObjectType;
    let policyData;
    let IEDate;
    const victimObjectsRisks = {};

    const currentDate = moment().format(JSONLoader.testData.datesFormatDMY);
    const { OGPOVictimObjectsCount } = JSONLoader.testData;
    const averageRBNS = JSONLoader.averageRBNS
      .filter((elem) => elem.insurance_type_id_esbd === JSONLoader.testData.insTypesIDESBD.OGPO)
      .pop().amount;

    cy.open('/');
    mainPage.pageIsDisplayed().should('be.true');

    header.pageIsDisplayed().should('be.true');
    header.loginButtonExists().then((loginButtonExists) => {
      if (loginButtonExists) {
        header.clickLoginButton();
        loginPage.pageIsDisplayed().should('be.true');
        loginPage.login(claimant.iin, JSONLoader.testData.password);
      }
    });

    header.clickProfileMenuDropdownButton();
    header.clickClaimsButton();

    claimsListPage.pageIsDisplayed().should('be.true');
    claimsListPage.clickCreateClaimButton();

    claimsCreateStep1.pageIsDisplayed().should('be.true');
    claimsCreateStep1.inputContractNumberWithIEDateAndCheckWithRecursiveRetries();
    cy.getLocalStorage('policyData').then((policyDataString) => {
      policyData = JSON.parse(policyDataString);
    });
    cy.getLocalStorage('IEDate').then((IEDateString) => {
      IEDate = IEDateString;
    });

    claimsCreateStep2.pageIsDisplayed().should('be.true');
    header.clickProfileMenuDropdownButton();
    header.getAuthorizedUserName().then((name) => {
      authorizedUserName = name.toUpperCase();
      claimsCreateStep2.getApplicantFullName().should('include', authorizedUserName);
    });
    header.clickProfileMenuDropdownButton();
    cy.then(() => {
      claimsCreateStep2.getPolicyNumberLabelText().should('be.equal', policyData.policyNumber);
      claimsCreateStep2.getPolicyInsurancePeriodLabelText()
        .should('be.equal', policyData.insurancePeriod);
    });
    claimsCreateStep2.chooseRandomApplicantType();
    claimsCreateStep2.getChosenApplicantType()
      .then((applicantType) => { chosenApplicantType = applicantType; });
    if (Randomizer.getRandomInteger(1)) {
      claimsCreateStep2.clickPDLCheckbox();
      claimsCreateStep2.uploadPDLDocumentFront();
      claimsCreateStep2.uploadPDLDocumentBack();
    }

    cy.clearLocalStorage('accumulatedTerritory');
    claimsCreateStep2.recursivelyChooseTerritories();
    claimsCreateStep2.randomlyClickDirectClaimCheckbox();
    claimsCreateStep2.inputLocationDescription(fakeData.locationDescription);
    claimsCreateStep2.inputIEDescription(fakeData.IEDescription);
    claimsCreateStep2.clickNextButton();

    claimsCreateStep3.pageIsDisplayed().should('be.true');
    claimsCreateStep3.getVictimObjectFormLabelText()
      .should('be.equal', JSONLoader.testData.insProductTitles.OGPO);
    claimsCreateStep3.chooseOGPOInsuranceEventType();
    claimsCreateStep3.getChosenOGPOInsuranceEventType()
      .then((type) => { OGPOInsuranceEventType = type; });
    claimsCreateStep3.randomlyChooseInsuredObject();
    claimsCreateStep3.randomlyClickSearchVehicleWithoutVerificationCheckbox();
    claimsCreateStep3.inputSearchVehicleVIN(car.vin);
    claimsCreateStep3.clickSearchVehicleButton();
    claimsCreateStep3.getVictimVehicleTitle().should('include', `${car.mark} ${car.model}`);
    claimsCreateStep3.getVictimVehicleYear().should('include', `${car.year}`);
    claimsCreateStep3.inputRegNum(car.reg_num);
    if (Randomizer.getRandomInteger(1)) {
      if (!victimVehicleOwner.natural_person_bool) {
        claimsCreateStep3.clickVictimVehicleOwnerJuridicalPersonBoolCheckbox();
      }

      claimsCreateStep3.inputVictimVehicleOwnerIIN(victimVehicleOwner.iin);
      claimsCreateStep3.clickVictimVehicleOwnerSearchButton();
      claimsCreateStep3.waitLoaderDisappearing().should('be.true');
      if (victimVehicleOwner.natural_person_bool) {
        claimsCreateStep3.getVictimVehicleOwnerFullNameLabelText()
          .should('include', `${victimVehicleOwner.last_name} ${victimVehicleOwner.first_name}`);
      } else {
        claimsCreateStep3.getVictimVehicleOwnerFullNameLabelText()
          .should('include', `${victimVehicleOwner.juridical_person_name}`);
      }
    }

    if (Randomizer.getRandomInteger(1)) {
      claimsCreateStep3.inputVictimVehicleDriverIIN(victimVehicleDriver.iin);
      claimsCreateStep3.clickVictimVehicleDriverSearchButton();
      claimsCreateStep3.waitLoaderDisappearing().should('be.true');
      claimsCreateStep3.getVictimVehicleDriverFullNameLabelText()
        .should('include', `${victimVehicleDriver.last_name} ${victimVehicleDriver.first_name}`);
    }

    claimsCreateStep3.randomlyChooseLastVictimObjectsRisk();
    claimsCreateStep3.getLastVictimObjectsChosenRisk()
      .then((risk) => { victimObjectsRisks.vehicle = risk; });
    claimsCreateStep3
      .inputLastVictimObjectDamageDescription(fakeData.victimVehicleDamageDescription);

    claimsCreateStep3.clickAddVictimObjectButton();

    claimsCreateStep3.chooseLastVictimObjectType('client');
    claimsCreateStep3.inputVictimClientIIN(victimClient.iin);
    claimsCreateStep3.clickVictimClientSearchButton();
    claimsCreateStep3.waitLoaderDisappearing().should('be.true');
    claimsCreateStep3.getVictimClientFullNameLabelText()
      .should('include', `${victimClient.last_name} ${victimClient.first_name}`);
    claimsCreateStep3.randomlyClickDeathBoolCheckbox();
    claimsCreateStep3.randomlyClickInvalidBoolCheckbox();
    claimsCreateStep3.randomlyChooseLastVictimObjectsRisk();
    claimsCreateStep3.getLastVictimObjectsChosenRisk()
      .then((risk) => { victimObjectsRisks.client = risk; });
    claimsCreateStep3
      .inputLastVictimObjectDamageDescription(fakeData.victimClientDamageDescription);

    claimsCreateStep3.clickAddVictimObjectButton();

    claimsCreateStep3.chooseLastVictimObjectType('other');
    claimsCreateStep3.randomlyChooseVictimOtherType();
    claimsCreateStep3.getChosenVictimOtherType().then((type) => {
      victimOtherType = type;
    });
    if (Randomizer.getRandomInteger(1)) {
      if (!victimOtherOwner.natural_person_bool) {
        claimsCreateStep3.clickVictimOtherOwnerJuridicalPersonBoolCheckbox();
      }

      claimsCreateStep3.inputVictimOtherOwnerIIN(victimOtherOwner.iin);
      claimsCreateStep3.clickVictimOtherOwnerSearchButton();
      claimsCreateStep3.waitLoaderDisappearing().should('be.true');
      if (victimOtherOwner.natural_person_bool) {
        claimsCreateStep3.getVictimOtherOwnerFullNameLabelText()
          .should('include', `${victimOtherOwner.last_name} ${victimOtherOwner.first_name}`);
      } else {
        claimsCreateStep3.getVictimOtherOwnerFullNameLabelText()
          .should('include', `${victimOtherOwner.juridical_person_name}`);
      }
    }

    claimsCreateStep3.randomlyChooseLastVictimObjectsRisk();
    claimsCreateStep3.getLastVictimObjectsChosenRisk()
      .then((risk) => { victimObjectsRisks.other = risk; });
    const inputVictimOtherDescriptionBool = Randomizer.getRandomInteger(1);
    if (inputVictimOtherDescriptionBool) {
      claimsCreateStep3
        .inputVictimOtherDescription(fakeData.victimOtherDescription);
    }

    claimsCreateStep3
      .inputLastVictimObjectDamageDescription(fakeData.victimOtherDamageDescription);
    claimsCreateStep3.clickCreateClaimButton();
    claimsCreateStep3.waitLoaderDisappearing().should('be.true');

    claimsListPage.claimCreatedMessageIsDisplayed().should('be.true');
    claimsListPage.clickCloseMessageButton();
    claimsListPage.claimCreatedMessageIsNotDisplayed().should('be.true');
    for (let i = 1; i <= OGPOVictimObjectsCount; i += 1) {
      cy.then(() => {
        claimsListPage.getIEContractNumberByIndex(i).should('be.equal', policyData.policyNumber);
        claimsListPage.getIEDateByIndex(i).should('be.equal', IEDate);
      });
      claimsListPage.getClaimDateByIndex(i).should('be.equal', currentDate);
      claimsListPage.getClaimStatusByIndex(i).should('be.equal', JSONLoader.testData.claimStatuses.new);
      claimsListPage.clickMoreDetailsButtonByIndex(i);
      claimsListPage.getClaimNumberByIndex(i).then((number) => { claimNumber = number; });
      claimsListPage.getVictimObjectTypeText().then((type) => { victimObjectType = type; });
      claimsListPage.getVictimObjectText().then((victimObject) => {
        if (victimObjectType === JSONLoader.testData.OGPOVictimObjectType.vehicle) {
          cy.wrap(victimObject).should('include', `${car.mark} ${car.model}`)
            .should('include', `${car.year}`);
        } else if (victimObjectType === JSONLoader.testData.OGPOVictimObjectType.client) {
          cy.wrap(victimObject).should('include', `${victimClient.last_name} ${victimClient.first_name}`);
        } else if (victimObjectType === JSONLoader.testData.OGPOVictimObjectType.other) {
          if (inputVictimOtherDescriptionBool) {
            cy.wrap(victimObject).should('be.equal', `${fakeData.victimOtherDescription}`);
          } else {
            cy.wrap(victimObject).should('be.equal', victimOtherType);
          }
        } else {
          throw new Error('[err]   victim object type is not one of OGPO types!');
        }
      });
      claimsListPage.getClaimantText().then((claimantText) => {
        cy.wrap(claimantText).should('include', authorizedUserName);
      });
      claimsListPage.clickOpenClaimButtonByIndex(i);
      claimsListPage.waitLoaderDisappearing().should('be.true');

      claimPage.pageIsDisplayed().should('be.true');
      claimPage.isRefuseButtonPresent().should('be.true');
      claimPage.clickMoreDetailsButton();
      claimPage.getClaimNumberText().then((number) => {
        cy.wrap(number).should('be.equal', claimNumber);
      });
      claimPage.getInsuranceTypeText().should('be.equal', JSONLoader.testData.insProductTitles.OGPO);
      claimPage.getClaimantText().then((claimantText) => {
        cy.wrap(claimantText).should('include', authorizedUserName)
          .should('include', `(${chosenApplicantType})`);
      });
      cy.then(() => {
        claimPage.getIEDateText().should('be.equal', IEDate);
        claimPage.getContractNumberText().should('be.equal', policyData.policyNumber);
        claimPage.getInsurancePeriodText().should('be.equal', policyData.insurancePeriod);
      });
      cy.getLocalStorage('accumulatedTerritory').then((territory) => {
        const resultTerritory = `${territory}, ${fakeData.locationDescription}`;
        claimPage.getLocationsText().should('be.equal', resultTerritory.toUpperCase());
      });
      claimPage.getPreAppraisalDamageText().should('be.equal', averageRBNS.toString());
      claimPage.getOGPOInsuranceEventTypeText().then((OGPOIEType) => {
        cy.wrap(OGPOIEType).should('be.equal', OGPOInsuranceEventType);
      });
      claimPage.getClaimStatusText().should('be.equal', JSONLoader.testData.claimStatuses.new);
      cy.then(() => {
        if (victimObjectType === JSONLoader.testData.OGPOVictimObjectType.vehicle) {
          claimPage.getVictimObjectText().should('include', `${car.mark} ${car.model}`)
            .should('include', `${car.year}`);
          claimPage.getRiskText().should('be.equal', victimObjectsRisks.vehicle);
          claimPage.getDamageDescriptionText().should('be.equal', fakeData.victimVehicleDamageDescription);
        } else if (victimObjectType === JSONLoader.testData.OGPOVictimObjectType.client) {
          claimPage.getVictimObjectText().should('include', `${victimClient.last_name} ${victimClient.first_name}`);
          claimPage.getRiskText().should('be.equal', victimObjectsRisks.client);
          claimPage.getDamageDescriptionText().should('be.equal', fakeData.victimClientDamageDescription);
        } else if (victimObjectType === JSONLoader.testData.OGPOVictimObjectType.other) {
          if (inputVictimOtherDescriptionBool) {
            claimPage.getVictimObjectText().should('be.equal', `${fakeData.victimOtherDescription}`);
          } else {
            claimPage.getVictimObjectText().should('be.equal', victimOtherType);
          }

          claimPage.getRiskText().should('be.equal', victimObjectsRisks.other);
          claimPage.getDamageDescriptionText().should('be.equal', fakeData.victimOtherDamageDescription);
        } else {
          throw new Error('[err]   victim object type is not one of OGPO types!');
        }
      });
      claimPage.getVictimObjectTypeText().then((VOType) => {
        cy.wrap(VOType).should('be.equal', victimObjectType);
      });
      claimPage.clickBackButton();
      claimsListPage.pageIsDisplayed().should('be.true');
      claimsListPage.waitLoaderDisappearing();
    }
  });
};
