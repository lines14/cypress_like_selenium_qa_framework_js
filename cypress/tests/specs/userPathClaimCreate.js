const moment = require('moment');
const mainPage = require('../pageObjects/mainPage');
const header = require('../pageObjects/header');
const loginPage = require('../pageObjects/login');
const claimsListPage = require('../pageObjects/claims/claimsListPage');
const claimCreateStep1 = require('../pageObjects/claims/create/claimCreateStep1');
const claimCreateStep2 = require('../pageObjects/claims/create/claimCreateStep2');
const claimCreateStep3 = require('../pageObjects/claims/create/claimCreateStep3');
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
    let territory;
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
        loginPage.login(claimant.iin, claimant.password);
      }
    });

    header.clickProfileMenuDropdownButton();
    header.clickClaimsButton();

    claimsListPage.pageIsDisplayed().should('be.true');
    claimsListPage.clickCreateClaimButton();

    claimCreateStep1.pageIsDisplayed().should('be.true');
    claimCreateStep1.inputContractNumberWithIEDateAndCheckWithRecursiveRetries()
      .then((randomizedData) => {
        ({ policyData, IEDate } = { ...randomizedData });
      });

    claimCreateStep2.pageIsDisplayed().should('be.true');
    header.clickProfileMenuDropdownButton();
    header.getAuthorizedUserName().then((name) => {
      authorizedUserName = name.toUpperCase();
      claimCreateStep2.getApplicantFullName().should('include', authorizedUserName);
    });
    header.clickProfileMenuDropdownButton().then(() => {
      claimCreateStep2.getPolicyNumberLabelText().should('be.equal', policyData.policyNumber);
      claimCreateStep2.getPolicyInsurancePeriodLabelText()
        .should('be.equal', policyData.insurancePeriod);
    });
    claimCreateStep2.chooseRandomApplicantType();
    claimCreateStep2.getChosenApplicantType()
      .then((applicantType) => {
        chosenApplicantType = applicantType;
      });

    if (Randomizer.getRandomInteger(1)) {
      claimCreateStep2.clickPDLCheckbox();
      claimCreateStep2.uploadPDLDocumentFront();
      claimCreateStep2.uploadPDLDocumentBack();
    }

    cy.clearLocalStorage('accumulatedTerritory');

    claimCreateStep2.recursivelyChooseTerritories().then((accumulatedTerritory) => {
      territory = accumulatedTerritory;
    });
    claimCreateStep2.randomlyClickDirectClaimCheckbox();
    claimCreateStep2.inputLocationDescription(fakeData.locationDescription);
    claimCreateStep2.inputIEDescription(fakeData.IEDescription);
    claimCreateStep2.clickNextButton();

    claimCreateStep3.pageIsDisplayed().should('be.true');
    claimCreateStep3.getVictimObjectFormLabelText()
      .should('be.equal', JSONLoader.testData.insProductTitles.OGPO);
    claimCreateStep3.chooseOGPOInsuranceEventType();
    claimCreateStep3.getChosenOGPOInsuranceEventType()
      .then((type) => {
        OGPOInsuranceEventType = type;
      });
    claimCreateStep3.randomlyChooseInsuredObject();
    claimCreateStep3.chooseLastVictimObjectType('vehicle');
    claimCreateStep3.randomlyClickSearchVehicleWithoutVerificationCheckbox();
    claimCreateStep3.inputSearchVehicleVIN(car.vin);
    claimCreateStep3.clickSearchVehicleButton();
    claimCreateStep3.getVictimVehicleTitle().should('include', `${car.mark} ${car.model}`);
    claimCreateStep3.getVictimVehicleYear().should('include', `${car.year}`);
    claimCreateStep3.inputRegNum(car.reg_num);

    if (Randomizer.getRandomInteger(1)) {
      if (!victimVehicleOwner.natural_person_bool) {
        claimCreateStep3.clickVictimVehicleOwnerJuridicalPersonBoolCheckbox();
      }

      claimCreateStep3.inputVictimVehicleOwnerIIN(victimVehicleOwner.iin);
      claimCreateStep3.clickVictimVehicleOwnerSearchButton();
      claimCreateStep3.waitLoaderDisappearing().should('be.true');

      if (victimVehicleOwner.natural_person_bool) {
        claimCreateStep3.getVictimVehicleOwnerFullNameLabelText()
          .should('include', `${victimVehicleOwner.last_name} ${victimVehicleOwner.first_name}`);
      } else {
        claimCreateStep3.getVictimVehicleOwnerFullNameLabelText()
          .should('include', `${victimVehicleOwner.juridical_person_name}`);
      }
    }

    if (Randomizer.getRandomInteger(1)) {
      claimCreateStep3.inputVictimVehicleDriverIIN(victimVehicleDriver.iin);
      claimCreateStep3.clickVictimVehicleDriverSearchButton();
      claimCreateStep3.waitLoaderDisappearing().should('be.true');
      claimCreateStep3.getVictimVehicleDriverFullNameLabelText()
        .should('include', `${victimVehicleDriver.last_name} ${victimVehicleDriver.first_name}`);
    }

    claimCreateStep3.randomlyChooseLastVictimObjectsRisk();
    claimCreateStep3.getLastVictimObjectsChosenRisk()
      .then((risk) => {
        victimObjectsRisks.vehicle = risk;
      });
    claimCreateStep3
      .inputLastVictimObjectDamageDescription(fakeData.victimVehicleDamageDescription);

    claimCreateStep3.clickAddVictimObjectButton();

    claimCreateStep3.chooseLastVictimObjectType('client');
    claimCreateStep3.inputVictimClientIIN(victimClient.iin);
    claimCreateStep3.clickVictimClientSearchButton();
    claimCreateStep3.waitLoaderDisappearing().should('be.true');
    claimCreateStep3.getVictimClientFullNameLabelText()
      .should('include', `${victimClient.last_name} ${victimClient.first_name}`);
    claimCreateStep3.randomlyClickDeathBoolCheckbox();
    claimCreateStep3.randomlyClickInvalidBoolCheckbox();
    claimCreateStep3.randomlyChooseLastVictimObjectsRisk();
    claimCreateStep3.getLastVictimObjectsChosenRisk()
      .then((risk) => {
        victimObjectsRisks.client = risk;
      });
    claimCreateStep3
      .inputLastVictimObjectDamageDescription(fakeData.victimClientDamageDescription);

    claimCreateStep3.clickAddVictimObjectButton();

    claimCreateStep3.chooseLastVictimObjectType('other');
    claimCreateStep3.randomlyChooseVictimOtherType();
    claimCreateStep3.getChosenVictimOtherType().then((type) => {
      victimOtherType = type;
    });

    if (Randomizer.getRandomInteger(1)) {
      if (!victimOtherOwner.natural_person_bool) {
        claimCreateStep3.clickVictimOtherOwnerJuridicalPersonBoolCheckbox();
      }

      claimCreateStep3.inputVictimOtherOwnerIIN(victimOtherOwner.iin);
      claimCreateStep3.clickVictimOtherOwnerSearchButton();
      claimCreateStep3.waitLoaderDisappearing().should('be.true');

      if (victimOtherOwner.natural_person_bool) {
        claimCreateStep3.getVictimOtherOwnerFullNameLabelText()
          .should('include', `${victimOtherOwner.last_name} ${victimOtherOwner.first_name}`);
      } else {
        claimCreateStep3.getVictimOtherOwnerFullNameLabelText()
          .should('include', `${victimOtherOwner.juridical_person_name}`);
      }
    }

    claimCreateStep3.randomlyChooseLastVictimObjectsRisk();
    claimCreateStep3.getLastVictimObjectsChosenRisk()
      .then((risk) => {
        victimObjectsRisks.other = risk;
      });

    const inputVictimOtherDescriptionBool = Randomizer.getRandomInteger(1);

    if (inputVictimOtherDescriptionBool) {
      claimCreateStep3
        .inputVictimOtherDescription(fakeData.victimOtherDescription);
    }

    claimCreateStep3
      .inputLastVictimObjectDamageDescription(fakeData.victimOtherDamageDescription);
    claimCreateStep3.clickCreateClaimButton();
    claimCreateStep3.waitLoaderDisappearing().should('be.true');

    claimsListPage.claimCreatedMessageIsDisplayed().should('be.true');
    claimsListPage.clickCloseMessageButton();
    claimsListPage.claimCreatedMessageIsNotDisplayed().should('be.true');

    for (let i = 1; i <= OGPOVictimObjectsCount; i += 1) {
      claimsListPage.getClaimDateByIndex(i).should('be.equal', currentDate);
      claimsListPage.getClaimStatusByIndex(i).should('be.equal', JSONLoader.testData.claimStatuses.new)
        .then(() => {
          claimsListPage.getIEContractNumberByIndex(i).should('be.equal', policyData.policyNumber);
          claimsListPage.getIEDateByIndex(i).should('be.equal', IEDate);
        });
      claimsListPage.clickMoreDetailsButtonByIndex(i);
      claimsListPage.getClaimNumberByIndex(i).then((number) => {
        claimNumber = number;
      });
      claimsListPage.getVictimObjectTypeText().then((type) => {
        victimObjectType = type;
      });
      claimsListPage.getVictimObjectText().then((victimObject) => {
        const isVictimObjectTypeValid = Object
          .values(JSONLoader.testData.OGPOVictimObjectTypes).includes(victimObjectType);

        cy.wrap(isVictimObjectTypeValid).should('be.true');

        switch (victimObjectType) {
          case JSONLoader.testData.OGPOVictimObjectTypes.vehicle:
            cy.wrap(victimObject).should('include', `${car.mark} ${car.model}`)
              .should('include', `${car.year}`);
            break;
          case JSONLoader.testData.OGPOVictimObjectTypes.client:
            cy.wrap(victimObject).should('include', `${victimClient.last_name} ${victimClient.first_name}`);
            break;
          case JSONLoader.testData.OGPOVictimObjectTypes.other:
            if (inputVictimOtherDescriptionBool) {
              cy.wrap(victimObject).should('be.equal', `${fakeData.victimOtherDescription}`);
            } else {
              cy.wrap(victimObject).should('be.equal', victimOtherType);
            }
            break;
          default:
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
      }).then(() => {
        claimPage.getIEDateText().should('be.equal', IEDate);
        claimPage.getContractNumberText().should('be.equal', policyData.policyNumber);
        claimPage.getInsurancePeriodText().should('be.equal', policyData.insurancePeriod);
        const resultTerritory = `${territory}, ${fakeData.locationDescription}`;
        claimPage.getLocationsText().should('be.equal', resultTerritory.toUpperCase());
      });
      claimPage.getPreAppraisalDamageText().should('be.equal', averageRBNS.toString());
      claimPage.getOGPOInsuranceEventTypeText().then((OGPOIEType) => {
        cy.wrap(OGPOIEType).should('be.equal', OGPOInsuranceEventType);
      });
      claimPage.getClaimStatusText().should('be.equal', JSONLoader.testData.claimStatuses.new)
        .then(() => {
          const isVictimObjectTypeValid = Object
            .values(JSONLoader.testData.OGPOVictimObjectTypes).includes(victimObjectType);

          cy.wrap(isVictimObjectTypeValid).should('be.true');

          switch (victimObjectType) {
            case JSONLoader.testData.OGPOVictimObjectTypes.vehicle:
              claimPage.getVictimObjectText().should('include', `${car.mark} ${car.model}`)
                .should('include', `${car.year}`);
              claimPage.getRiskText().should('be.equal', victimObjectsRisks.vehicle);
              claimPage.getDamageDescriptionText().should('be.equal', fakeData.victimVehicleDamageDescription);
              break;
            case JSONLoader.testData.OGPOVictimObjectTypes.client:
              claimPage.getVictimObjectText().should('include', `${victimClient.last_name} ${victimClient.first_name}`);
              claimPage.getRiskText().should('be.equal', victimObjectsRisks.client);
              claimPage.getDamageDescriptionText().should('be.equal', fakeData.victimClientDamageDescription);
              break;
            case JSONLoader.testData.OGPOVictimObjectTypes.other:
              if (inputVictimOtherDescriptionBool) {
                claimPage.getVictimObjectText().should('be.equal', `${fakeData.victimOtherDescription}`);
              } else {
                claimPage.getVictimObjectText().should('be.equal', victimOtherType);
              }

              claimPage.getRiskText().should('be.equal', victimObjectsRisks.other);
              claimPage.getDamageDescriptionText().should('be.equal', fakeData.victimOtherDamageDescription);
              break;
            default:
          }
        });
      claimPage.getVictimObjectTypeText().then((VOType) => {
        cy.wrap(VOType).should('be.equal', victimObjectType);
      });

      claimPage.clickBackButton();
      claimsListPage.pageIsDisplayed().should('be.true');
      claimsListPage.waitLoaderDisappearing().should('be.true');
    }
  });
};
