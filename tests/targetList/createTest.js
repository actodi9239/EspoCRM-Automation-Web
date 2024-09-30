const { expect } = require('chai');
const tags = require('mocha-tags');

const NavbarPage = require('../../main/pages/navbar/navbarPage');
const NavbarMorePage = require('../../main/pages/navbar/navbarMorePage');
const testConfig = require('../../testConfig.json');
const LoginPage = require('../../main/pages/loginPage');
const { myBefore, myAfter, myAfterScreen } = require('../../main/hooks');
const createTargetListPage = require('../../main/pages/targetList/createTargetListPage');
const ListTargetListPage = require('../../main/pages/targetList/listTargetListPage')

describe('Create TargetList Test', function () {
    this.timeout(60000);
    before(async () => {
        await myBefore();
        await LoginPage.isVisible();
        await LoginPage.setCredentials(testConfig.credentials.username, testConfig.credentials.password)
        await LoginPage.clickLoginButton();
        await NavbarPage.clickIconMore();
        await NavbarMorePage.clickMenuTargetList();
        await ListTargetListPage.clickCreateButton();
    });

    afterEach(async function () {
        await myAfterScreen.call(this);
    });

    after(async () => {
        await myAfter();
    });

 /*   it('Verify create targetList with field requerids', async () => {
        createTargetListPage.isVisible()
        createTargetListPage.setValueName("targetList Test")
        createTargetListPage.clickSaveButton(); 

    })

    it('Verify create targetList with empty description', async () => {
        createTargetListPage.isVisible()
        createTargetListPage.setValueName("targetList Test")
        createTargetListPage.clickSaveButton(); 
    })

    it('Verify create targetList with description', async () => {
        createTargetListPage.isVisible()
        createTargetListPage.setValueName("targetList Test")
        createTargetListPage.setValueDescription("description Target List")
        createTargetListPage.clickSaveButton(); 
    }) */

    it('Verify create targetList with description', async () => {
        await createTargetListPage.isVisible()
        await createTargetListPage.setValueName("targetList Test")
        await createTargetListPage.setValueDescription("description Target List")
        await createTargetListPage.clickSyncEnable();
    })

});