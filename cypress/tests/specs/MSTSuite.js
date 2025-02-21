const { kaspiPay } = require('./kaspiPay');
const { userPathMST } = require('./userPathMST');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const Randomizer = require('../../main/utils/random/randomizer');

const clients = DataUtils.filterClients(
  JSONLoader.testClients,
  { isJuridical: false, isUnderSixtyYearsOld: true, hasPassport: true },
);
const { holder } = DataUtils.createRandomClientsStructures(clients);

describe('MST test suite:', () => {
  const paymentVariants = [kaspiPay];
  userPathMST(holder);
  paymentVariants[Randomizer.getRandomInteger(paymentVariants.length - 1)](holder);
});
