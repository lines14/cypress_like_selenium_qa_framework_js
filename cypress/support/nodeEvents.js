const DataUtils = require('../main/utils/data/dataUtils');

class NodeEvents {
    static payWithKaspi(paymentInfo) {
        return cy.task('payWithKaspi', paymentInfo).then((responses) => {
            responses.forEach((method) => method.logs.forEach((log) => cy.logger(log)));
            return DataUtils.XMLToJSON(responses.pop().response)
            .then((resp) => resp.comment.pop());
        });
    }

    static getLastCodeFromDB() {
        return cy.task('getLastCodeFromDB').then((responses) => {
            responses.forEach((method) => method.logs.forEach((log) => cy.logger(log)));
            return cy.wrap(responses[1].rows.pop().code);
        });
    }
}

module.exports = NodeEvents;