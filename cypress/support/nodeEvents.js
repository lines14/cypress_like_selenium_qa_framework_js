class NodeEvents {
  static toggleVerification() {
    return cy.task('toggleVerification').then((responses) => {
      responses.forEach((response) => response.logs.forEach((log) => cy.logger(log)));
      return cy.wrap(responses);
    });
  }

  static payWithKaspi(paymentInfo) {
    return cy.task('payWithKaspi', paymentInfo).then((responses) => {
      responses.forEach((response) => response.logs.forEach((log) => cy.logger(log)));
      return cy.wrap(responses);
    });
  }

  static getLastCodeFromDB(phoneNumber) {
    return cy.task('getLastCodeFromDB', phoneNumber).then((responses) => {
      responses.forEach((response) => response.logs.forEach((log) => cy.logger(log)));
      return cy.wrap(responses[1].rows.pop().code);
    });
  }
}

module.exports = NodeEvents;
