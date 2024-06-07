const { kaspiPay } = require('./kaspiPay');
const { userPathMST } = require('./userPathMST');
const Randomizer = require('../../main/utils/random/randomizer');

describe('MST test suite:', () => {
  const paymentVariants = [kaspiPay];
  userPathMST();
  paymentVariants[Randomizer.getRandomInteger(paymentVariants.length - 1)]();
});
