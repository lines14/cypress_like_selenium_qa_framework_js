const BaseElement = require('../baseElement.js');

class Label extends BaseElement {
    constructor(locator, name) {
        super(locator, name);
    }
}

module.exports = Label;