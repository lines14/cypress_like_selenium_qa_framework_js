const { userPathClaimCreate } = require('../specs/userPathClaimCreate');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const FakeDataGenerator = require('../../main/utils/random/fakeDataGenerator');
const DataUtils = require('../../main/utils/data/dataUtils');
const Randomizer = require('../../main/utils/random/randomizer');

describe('claim create test suite:', () => {
  const naturalPersonClients = DataUtils
    .filterClients(JSONLoader.testClients, { isJuridical: false });
  const claimant = Randomizer.getRandomArrayElement(naturalPersonClients);
  const victimVehicleOwner = Randomizer.getRandomArrayElement(JSONLoader.testClients);
  const victimVehicleDriver = Randomizer.getRandomArrayElement(naturalPersonClients);
  const victimClient = Randomizer.getRandomArrayElement(naturalPersonClients);
  const victimOtherOwner = Randomizer.getRandomArrayElement(JSONLoader.testClients);
  const car = DataUtils.createRandomCarStructure(JSONLoader.testCars);
  const fakeData = FakeDataGenerator.generateInsuranceEventData(car);

  userPathClaimCreate(
    claimant,
    victimVehicleOwner,
    victimVehicleDriver,
    victimClient,
    victimOtherOwner,
    car,
    fakeData,
  );
});
