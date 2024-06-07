const { kaspiPay } = require('./kaspiPay');
const { userPathMutualOGPO } = require('./userPathMutualOGPO');
const Randomizer = require('../../main/utils/random/randomizer');

describe('OGPO & Mutual test suite:', () => {
  const paymentVariants = [kaspiPay];
  userPathMutualOGPO();
  paymentVariants[Randomizer.getRandomInteger(paymentVariants.length - 1)]();
});
