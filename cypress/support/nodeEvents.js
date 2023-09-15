const DataUtils = require('../main/utils/data/dataUtils');

class nodeEvents {
    payWithKaspi(paymentInfo) {
        return cy.task('payWithKaspi', paymentInfo).then((responses) => {
            responses.forEach((method) => method.logs.forEach((log) => cy.logger(log)));
            return DataUtils.XMLToJSON(responses.pop().response.data)
            .then((resp) => resp.comment.pop());
        });
    }

    getLastCodeFromDB() {
        return cy.task('getLastCodeFromDB').then((responses) => {
            responses.forEach((method) => method.logs.forEach((log) => cy.logger(log)));
            return cy.wrap(responses[1].rows.pop().code);
        });
    }
}

module.exports = new nodeEvents();