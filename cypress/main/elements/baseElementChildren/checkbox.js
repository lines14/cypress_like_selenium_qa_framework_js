const BaseElement = require('../baseElement.js');

class Checkbox extends BaseElement {
    constructor(locator, name) {
        super(locator, name);
    }
}

module.exports = Checkbox;