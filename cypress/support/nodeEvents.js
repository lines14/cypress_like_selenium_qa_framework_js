const DataUtils = require('../main/utils/data/dataUtils');

class nodeEvents {
    payWithKaspi(paymentInfo) {
        return cy.task('payWithKaspi', paymentInfo).then((response) => {
            response.forEach((method) => method.logs.forEach((log) => cy.logger(log)));
            return DataUtils.XMLToJSON(response.pop().response.data)
            .then((response) => response.comment.pop());
        });
    }

    getLastCodeFromDB() {
        return cy.task('getLastCodeFromDB').then((responses) => {
            responses.forEach((response) => response.logs.forEach((log) => cy.logger(log)));
            return cy.wrap(responses[1].rows.pop().code);
        });
    }
}

module.exports = new nodeEvents();