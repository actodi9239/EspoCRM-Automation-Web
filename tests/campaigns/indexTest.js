const { expect } = require('chai');
const tags = require('mocha-tags');

const NavbarPage = require('../../main/pages/navbar/navbarPage');
const NavbarMorePage = require('../../main/pages/navbar/navbarMorePage');
const ListCampaingPage = require('../../main/pages/campaigns/listCampaignPage');
const testConfig = require('../../testConfig.json');
const LoginPage = require('../../main/pages/loginPage');
const { myBefore, myAfter, myAfterScreen } = require('../../main/hooks');

describe('landing page Campaing Test', function () {
    this.timeout(60000);
    before(async () => {
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

    it('Verify asceding colunm name', async () => {
        await ListCampaingPage.clickNameTitle();

        const columnTexts = await ListCampaingPage.getColumnTextsName();
        const sortedTexts = [...columnTexts].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
        expect(columnTexts).to.deep.equal(sortedTexts);
    })

    it('Verify desceding colunm name', async () => {
        await ListCampaingPage.clickNameTitle();
        const columnTexts = await ListCampaingPage.getColumnTextsName();
        const sortedTextsDesc = [...columnTexts].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).reverse();
        expect(columnTexts).to.deep.equal(sortedTextsDesc);
    })

    it('Verify asceding colunm type', async () => {
        await ListCampaingPage.clickTypeTitle();

        const columnTexts = await ListCampaingPage.getColumnTextsType();
        const sortedTexts = [...columnTexts].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
        expect(columnTexts).to.deep.equal(sortedTexts);
    })

    it('Verify desceding colunm type', async () => {
        await ListCampaingPage.clickTypeTitle();
        const columnTexts = await ListCampaingPage.getColumnTextsType();
        const sortedTextsDesc = [...columnTexts].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).reverse();
        expect(columnTexts).to.deep.equal(sortedTextsDesc);
    })

    it('Verify asceding colunm status', async () => {
        await ListCampaingPage.clickStatusTitle();
        const columnTexts = await ListCampaingPage.getColumnTextsStatus();
        const sortedTextsDesc = [...columnTexts].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).reverse();
        expect(columnTexts).to.deep.equal(sortedTextsDesc);
    })

    it('Verify desceding colunm status', async () => {
        await ListCampaingPage.clickStatusTitle();
        const columnTexts = await ListCampaingPage.getColumnTextsStatus();        
        const sortedTexts = [...columnTexts].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
        expect(columnTexts).to.deep.equal(sortedTexts);
    })
});