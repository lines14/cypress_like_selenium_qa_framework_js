const DataUtils = require('../main/utils/data/dataUtils');

class nodeEvents {
    payWithKaspi(paymentInfo) {
        return cy.task('payWithKaspi', paymentInfo).then((response) => {
            response.forEach((method) => method.logs.forEach((log) => cy.logger(log)));
            return (DataUtils.XMLToJSON(response.pop().response.data)).comment.pop();
        });
    }

    getLastCodeFromDB() {
        return cy.task('getLastCodeFromDB').then((response) => {
            response.forEach((method) => method.logs.forEach((log) => cy.logger(log)));
            return cy.wrap(response[1].rows.pop().code);
        });
    }
}

module.exports = new nodeEvents();