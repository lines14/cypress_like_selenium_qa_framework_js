const DataUtils = require('../main/utils/data/dataUtils');

class NodeEvents {
    static payWithKaspi(paymentInfo) {
        return cy.task('payWithKaspi', paymentInfo).then((responses) => {
            responses.forEach((response) => response.logs.forEach((log) => cy.logger(log)));
            return DataUtils.XMLToJSON(responses.pop().data)
            .then((convertedResponse) => convertedResponse.comment.pop());
        });
    }

    static getLastCodeFromDB() {
        return cy.task('getLastCodeFromDB').then((responses) => {
            responses.forEach((response) => response.logs.forEach((log) => cy.logger(log)));
            return cy.wrap(responses[1].rows.pop().code);
        });
    }
}

module.exports = NodeEvents;