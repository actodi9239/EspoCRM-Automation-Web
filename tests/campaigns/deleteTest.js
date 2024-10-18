const { expect } = require("chai");
const tags = require("mocha-tags");

const NavbarPage = require("../../main/pages/navbar/navbarPage");
const NavbarMorePage = require("../../main/pages/navbar/navbarMorePage");
const ListCampaingPage = require("../../main/pages/campaigns/listCampaignPage");
const ModalPage = require("../../main/pages/base/modalPage");
const ViewCampaignPage = require("../../main/pages/campaigns/viewCampaignPage");
const testConfig = require("../../testConfig.json");
const LoginPage = require("../../main/pages/loginPage");
const { myBefore, myAfter, myAfterScreen } = require("../../main/hooks");
const { create, deleted } = require("../../main/api/campaigns/serviceCampaings");
const data = require("../../utils/campaigns/dataDefault.json");

describe("Delete Campaing Test", function () {
  this.timeout(60000);
  let campaign = "";
  before(async () => {
    await myBefore();
    await LoginPage.isVisible();
    await LoginPage.setCredentials(
      testConfig.credentials.username,
      testConfig.credentials.password
    );
    await LoginPage.clickLoginButton();

    await NavbarPage.isVisible();
    await NavbarPage.clickIconMore();

    await NavbarMorePage.isVisible();
    await NavbarMorePage.clickMenuCampaign();
  });

  beforeEach(async function () {
    data.name = "Sarampion";
    campaign = await create(data);
  });

  afterEach(async function () {
    if (campaign) {
      await deleted(campaign.id);
      campaign = ""; 
    }
    await myAfterScreen.call(this);
  });

  after(async () => {
    await myAfter();
  });

  it("Verify the deletion of a campaign from the row menu.", async () => {
    await ListCampaingPage.reloadPage();
    await ListCampaingPage.clickCampaingCaret(campaign.id);
    await ListCampaingPage.clickDelete(campaign.id);
    await ModalPage.clickConfirmButton();
    expect(await ListCampaingPage.getColumnTextsName()).to.not.include(
      campaign.name
    );
    campaign="";
  });

  it("Verify the deletion of a campaign using the 'Actions' option.", async () => {
    await ListCampaingPage.reloadPage();
    await ListCampaingPage.clickCampaingChecked(campaign.id);
    await ListCampaingPage.clickActionsButton();
    await ListCampaingPage.clickDeleteActionsButton();
    await ModalPage.clickConfirmButton();
    expect(await ListCampaingPage.getColumnTextsName()).to.not.include(
      campaign.name
    );    
    campaign="";
  });

  it("Verify delete campaign with page view", async () => {
    await ListCampaingPage.reloadPage();
    await ListCampaingPage.clickCampaignRow(campaign.id);
    await ViewCampaignPage.clickMoreButton();
    await ViewCampaignPage.clickDeleteButton();
    await ModalPage.clickConfirmButton();
    expect(await ListCampaingPage.getColumnTextsName()).to.not.include(
      campaign.name
    );
    campaign="";
  });

  it("Verify the cancellation of the deletion in the confirmation modal.", async () => {
    await ListCampaingPage.reloadPage();
    await ListCampaingPage.clickCampaingCaret(campaign.id);
    await ListCampaingPage.clickDelete(campaign.id);
    await ModalPage.clickCancelButton();
    expect(await ListCampaingPage.getColumnTextsName()).to.include(
      campaign.name
    );
  });
});
