const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');

class LoginPage extends BaseForm {
  #IINBox;

  #passwordBox;

  #cyberSecutiryCheckbox;

  #loginButton;

  constructor() {
    super(new XPATH('//a[@href = \'/registration\']'), 'login page');
    this.#IINBox = new Textbox(new XPATH('//input[@type = \'number\']'), 'IIN textbox');
    this.#passwordBox = new Textbox(new XPATH('//input[@type = \'password\']'), 'password textbox');
    this.#cyberSecutiryCheckbox = new Button(new XPATH('//input[@type = \'checkbox\']'), 'cyber secutiry checkbox');
    this.#loginButton = new Button(new XPATH('//button[contains(text(), \'Войти\')]'), 'login button');
  }

  login(IIN, password) {
    this.#IINBox.multipleClickElement(3);
    this.#IINBox.inputData(IIN);
    this.#passwordBox.multipleClickElement(3);
    this.#passwordBox.inputData(password);
    this.#cyberSecutiryCheckbox.clickElement();
    this.#loginButton.clickElement();
  }
}

module.exports = new LoginPage();
