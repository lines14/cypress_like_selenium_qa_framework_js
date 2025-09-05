const BaseElement = require('../baseElement');

class Checkbox extends BaseElement {
  isChecked() {
    return this.getAttributeValue({ attrName: 'checked' }).then((value) => JSON.parse(value));
  }
}

module.exports = Checkbox;
