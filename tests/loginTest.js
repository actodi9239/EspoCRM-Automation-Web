const { expect } = require('chai');
const tags = require('mocha-tags');

const NavbarPage = require('../main/pages/navbar/navbarPage');

const testConfig = require('../testConfig.json');
const LoginPage = require('../main/pages/loginPage');
const { myBefore, myAfter, myAfterScreen } = require('../main/hooks');

describe('Login Test', function () {
    this.timeout(50000);
    before(async () => {
        await myBefore();
    });
    
    afterEach(async function () {
        await myAfterScreen.call(this);
    });

    after(async () => {
        await myAfter();
    });

    tags('e2e').it('Test', async () => {
        await LoginPage.isVisible();
        await LoginPage.setCredentials(testConfig.credentials.username, testConfig.credentials.password)
        await LoginPage.clickLoginButton();

        await NavbarPage.isVisible()
        expect(await NavbarPage.getHomeText()).to.equal('Inicio')
    })
});