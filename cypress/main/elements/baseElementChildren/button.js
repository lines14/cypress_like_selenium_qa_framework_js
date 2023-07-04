const BaseElement = require('../baseElement.js');

class Button extends BaseElement {
    constructor(locator, name) {
        super(locator, name);
    }
}

module.exports = Button;