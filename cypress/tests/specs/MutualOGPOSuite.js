const { ePay } = require('./ePay');
const { kaspiPay } = require('./kaspiPay');
const { userPathMutualOGPO } = require('./userPathMutualOGPO');
const Randomizer = require('../../main/utils/random/randomizer');

describe('OGPO & Mutual test suite:', () => {
  const paymentVariants = [kaspiPay, ePay];
  userPathMutualOGPO();
  paymentVariants[Randomizer.getRandomInteger(paymentVariants.length)]();
});
