const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');
const Label = require('../../main/elements/baseElementChildren/label');

class Header extends BaseForm {
  #loginButton;

  #authorizedUserNameLabel;

  #profileMenuButton;

  #claimsButton;

  constructor() {
    super(new XPATH('//div[@class = "header-first"]'), 'header page object');
    this.#loginButton = new Button(new XPATH('//a[@href = "/login"]'), 'login button');
    this.#authorizedUserNameLabel = new Label(new XPATH('//div[@class = "dropdown-title"]/div[@class = "title"]'), 'authorized username label');
    this.#profileMenuButton = new Button(new XPATH('//button[@id = "dropdown-right__BV_toggle_"]'), 'profile menu button');
    this.#claimsButton = new Button(new XPATH('//a[@href = "/profile/insurance-events/claims"]'), 'claims button');
  }

  clickLoginButton() {
    return this.#loginButton.clickElement();
  }

  getAuthorizedUserName() {
    return this.#authorizedUserNameLabel.getText();
  }

  loginButtonExists() {
    return this.#loginButton.elementIsExisting();
  }

  clickProfileMenuDropdownButton() {
    return this.#profileMenuButton.clickElement();
  }

  clickClaimsButton() {
    return this.#claimsButton.clickElement();
  }
}

module.exports = new Header();
