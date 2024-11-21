const { kaspiPay } = require('./kaspiPay');
const { userPathMutualOGPO } = require('./userPathMutualOGPO');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const Randomizer = require('../../main/utils/random/randomizer');

const clients = DataUtils.filterClients(
  JSONLoader.testClients,
  { isUnderSixtyYearsOld: true, hasPassport: true },
);
const { holder } = DataUtils.createRandomClientsStructures(clients);
const car = DataUtils.createRandomCarStructure(JSONLoader.testCars);

describe('OGPO & Mutual test suite:', () => {
  const paymentVariants = [kaspiPay];
  userPathMutualOGPO(holder, car);
  paymentVariants[Randomizer.getRandomInteger(paymentVariants.length - 1)](holder);
});
