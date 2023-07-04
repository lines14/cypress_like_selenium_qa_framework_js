const BaseForm = require('../../main/baseForm.js');
const Button = require('../../main/elements/baseElementChildren/button.js');
const Textbox = require('../../main/elements/baseElementChildren/textbox.js');
const configManager = require('../../main/utils/data/configManager.js');

class MainPageIntroADP extends BaseForm {
    constructor() {
        super('//footer[contains(text(), "Created by AMANAT")]', 'main page');
        this.loginForm = new Textbox('//form[contains(class(), "ant-form")]', 'login form');
        this.loginBox = new Textbox('//input[@id="form_item_login"]', 'login');
        this.passwordBox = new Textbox('//input[@id="form_item_password"]', 'password');
        this.submitButton = new Button('//button[@type="submit"]', 'submit button');
    }

    async waitLoginForm() {
        await this.passwordBox.waitIsClickable();
        await this.loginBox.waitIsClickable();
    }

    async loginADP() {
        await this.passwordBox.inputData(configManager.getAuthData().passwordADP);
        await this.loginBox.inputData(configManager.getAuthData().loginADP);
        await this.submitButton.clickElement();
    }
}

module.exports = new MainPageIntroADP();