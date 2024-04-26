module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    browser: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
    'plugin:cypress/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
