const { untilIsLocated, untilIsVisible } = require("../../core/interactions/conditions");
const { clickOn, setValue } = require("../../core/interactions/action");
const { myByCss } = require("../../core/interactions/myBy");

class LoginPage {
    usernameInput = myByCss('[data-name="username"] > input');
    passwordInput = myByCss('[data-name="password"] > input');
    loginButton = myByCss('[data-name="submit"] > button');

    async isVisible() {
        await untilIsLocated(this.usernameInput)
        await untilIsLocated(this.passwordInput)
        await untilIsLocated(this.loginButton)
    }

    async setCredentials(username, password) {
        await untilIsVisible(this.usernameInput);
        await untilIsVisible(this.passwordInput);
        await setValue(this.usernameInput, username);
        await setValue(this.passwordInput, password)
    }

    async clickLoginButton() {
        await untilIsVisible(this.loginButton)
        await clickOn(this.loginButton)
    }
}

module.exports = new LoginPage(); 
