const { ePay } = require('../specs/ePay');
const { userPathOGPOMutual } = require('../specs/userPathOGPOMutual');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const Randomizer = require('../../main/utils/random/randomizer');

const clients = DataUtils.filterClients(
  JSONLoader.testClients,
  { hasDriverLicence: true },
);
const { holder, insured } = DataUtils.createRandomClientsStructures(clients);
const car = DataUtils.createRandomCarStructure(JSONLoader.testCars);

describe('OGPO & Mutual test suite:', () => {
  const paymentVariants = [ePay];
  userPathOGPOMutual(holder, insured, car);
  paymentVariants[Randomizer.getRandomInteger(paymentVariants.length - 1)](holder);
});
