const { expect } = require("chai");
const tags = require("mocha-tags");

const NavbarPage = require("../../main/pages/navbar/navbarPage");
const NavbarMorePage = require("../../main/pages/navbar/navbarMorePage");
const ListCampaingPage = require("../../main/pages/campaigns/listCampaignPage");
const ViewCampaignPage = require("../../main/pages/campaigns/viewCampaignPage");
const testConfig = require("../../testConfig.json");
const LoginPage = require("../../main/pages/loginPage");
const { myBefore, myAfter, myAfterScreen } = require("../../main/hooks");
const {
  create,
  deleted,
} = require("../../main/api/campaigns/serviceCampaings");
const data = require("../../utils/campaigns/dataDefault.json");
const CreateCampaignPage = require("../../main/pages/campaigns/createCampaignPage");

describe("Update Campaing Test", function () {
  this.timeout(60000);
  let campaign = "";
  before(async () => {
    data.name = "Viruela";
    campaign = await create(data);
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

  afterEach(async function () {
    await myAfterScreen.call(this);
  });

  after(async () => {
    if (campaign.id) {
      await deleted(campaign.id);
    }
    await myAfter();
  });

  it("Verify update campaign with page view", async () => {
    await ListCampaingPage.clickCampaignRow(campaign.id);
    await ViewCampaignPage.clickEditButton();
    await CreateCampaignPage.isVisible();
    await CreateCampaignPage.setValueName("prueba");
    await CreateCampaignPage.clickSaveButton();

    expect(await ViewCampaignPage.getTextTitle()).to.equal("prueba");
    expect(await ViewCampaignPage.getTextName()).to.equal("prueba");

    await ViewCampaignPage.clickRedirectToBack();

    expect(await ListCampaingPage.getColumnTextsName()).to.include("prueba");

  });

  it("Verify updating a campaign without modifying any fields", async () => {
    await ListCampaingPage.clickCampaignRow(campaign.id);
    await ViewCampaignPage.clickEditButton();
    await CreateCampaignPage.isVisible();
    await CreateCampaignPage.clickSaveButton();

    expect(await ViewCampaignPage.getTextTitle()).to.equal("prueba");
    expect(await ViewCampaignPage.getTextName()).to.equal("prueba");

    await ViewCampaignPage.clickRedirectToBack();

    expect(await ListCampaingPage.getColumnTextsName()).to.include("prueba");
  });



  it("Verify that updating a campaign without a name (empty name field) is not allowed", async () => {
    await ListCampaingPage.clickCampaignRow(campaign.id);
    await ViewCampaignPage.clickEditButton();  
    await CreateCampaignPage.isVisible();
    await CreateCampaignPage.setValueName(" ");
    await CreateCampaignPage.clickSaveButton();

    expect(await CreateCampaignPage.getTextMessageNameRequired()).to.equal(
      "Nombre es requerido"
    );
    expect(await CreateCampaignPage.getTextMessageError()).to.equal(
      "No válido"
    );
    await CreateCampaignPage.clickCancelEditButton();
    await ViewCampaignPage.clickRedirectToBack();
  });

  it("Verify updating a campaign by changing the status to Completed", async () => {
    await ListCampaingPage.clickCampaignRow(campaign.id);
    await ViewCampaignPage.clickEditButton();  
    await CreateCampaignPage.isVisible();
    await CreateCampaignPage.setValueStatus("Completada");
    await CreateCampaignPage.clickSaveButton();

    expect(await ViewCampaignPage.getTextStatus()).to.equal(
      "Completada"
    );
    await ViewCampaignPage.clickRedirectToBack();
  });

  
  it("Verify that updating a campaign with a duplicate name is not allowed", async () => {
    await ListCampaingPage.clickCampaignRow(campaign.id);
    await ViewCampaignPage.clickEditButton();    
    await CreateCampaignPage.isVisible();
    await CreateCampaignPage.setValueName("Animales");
    await CreateCampaignPage.clickSaveButton();

    expect(await CreateCampaignPage.isVisibleMessageError()).to.be.true;
  });
});
