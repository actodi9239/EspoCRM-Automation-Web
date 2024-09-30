const { expect } = require('chai');
const tags = require('mocha-tags');

const NavbarPage = require('../../main/pages/navbar/navbarPage');
const NavbarMorePage = require('../../main/pages/navbar/navbarMorePage');
const ListCampaingPage = require('../../main/pages/campaigns/listCampaignPage');
const ModalPage = require('../../main/pages/base/modalPage');
const ViewCampaignPage = require('../../main/pages/campaigns/viewCampaignPage');
const testConfig = require('../../testConfig.json');
const LoginPage = require('../../main/pages/loginPage');
const { myBefore, myAfter, myAfterScreen } = require('../../main/hooks');
const { create } = require('../../main/api/campaigns/serviceCampaings');
const data = require('../../utils/campaigns/dataDefault.json');

describe('Create Campaing Test', function () {
    this.timeout(60000);
    let campaign = '';
    before(async () => {
        campaign = await create(data);
        await myBefore();
        await LoginPage.isVisible();
        await LoginPage.setCredentials(testConfig.credentials.username, testConfig.credentials.password)
        await LoginPage.clickLoginButton();
        await NavbarPage.clickIconMore();
        await NavbarMorePage.clickMenuCampaign();
    });

    afterEach(async function () {
        await myAfterScreen.call(this);
    });

    after(async () => {
        await myAfter();
    });

    it('Verify delete campaign with page view', async () => {
        await ListCampaingPage.clickCampaignRow(campaign.id);
        await ViewCampaignPage.clickMoreButton()
        await ViewCampaignPage.clickDeleteButton()
        await ModalPage.clickConfirmButton()
        expect(await ListCampaingPage.getColumnTextsName()).to.not.include(campaign.name);
    })
});