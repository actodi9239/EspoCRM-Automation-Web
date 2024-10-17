const { expect } = require("chai");
const tags = require("mocha-tags");

const NavbarPage = require("../../main/pages/navbar/navbarPage");
const NavbarMorePage = require("../../main/pages/navbar/navbarMorePage");
const ListCampaingPage = require("../../main/pages/campaigns/listCampaignPage");
const CreateCampaignPage = require("../../main/pages/campaigns/createCampaignPage");
const ViewCampaignPage = require("../../main/pages/campaigns/viewCampaignPage");
const testConfig = require("../../testConfig.json");
const LoginPage = require("../../main/pages/loginPage");
const { myBefore, myAfter, myAfterScreen } = require("../../main/hooks");
const { deleted } = require("../../main/api/campaigns/serviceCampaings");

describe("Create Campaing Test", function () {
  this.timeout(60000);
  let idCampaing = "";
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

  afterEach(async function () {
    if (idCampaing) {
      await deleted(idCampaing);
      idCampaing = ""; 
    }
    await myAfterScreen.call(this);
  });

  after(async () => {
    await myAfter();
  });

  it("Verify create campaign with field requerids", async () => {
    await ListCampaingPage.clickCreateButton();
    await CreateCampaignPage.isVisible();
    await CreateCampaignPage.setValueName("Campaing 21");
    await CreateCampaignPage.clickSaveButton();

    expect(await ViewCampaignPage.getTextTitle()).to.equal("Campaing 21");
    expect(await ViewCampaignPage.getTextName()).to.equal("Campaing 21");

    idCampaing = await ViewCampaignPage.getCurrentUrlId();

    await ViewCampaignPage.clickRedirectToBack();
    expect(await ListCampaingPage.getColumnTextsName()).to.include(
      "Campaing 21"
    );
  });

  it("Verify create campaign with field requerids 2", async () => {
    await ListCampaingPage.clickCreateButton();
    await CreateCampaignPage.isVisible();
    await CreateCampaignPage.setValueName("Campaing 22");
    await CreateCampaignPage.clickSaveButton();

    expect(await ViewCampaignPage.getTextTitle()).to.equal("Campaing 22");
    expect(await ViewCampaignPage.getTextName()).to.equal("Campaing 22");

    idCampaing = await ViewCampaignPage.getCurrentUrlId();

    await ViewCampaignPage.clickRedirectToBack();
  });

  it("Verify create campaign with all fields", async () => {
    await ListCampaingPage.clickCreateButton();
    await CreateCampaignPage.isVisible();

    await CreateCampaignPage.setValueName("Campaign Complete");
    await CreateCampaignPage.setValueStatus("Completada");
    await CreateCampaignPage.setValueType("Televisión");
    await CreateCampaignPage.setValueBudget(5000);
    await CreateCampaignPage.setValueDescription("Descripción completa de la campaña");
    await CreateCampaignPage.clickSaveButton();

    expect(await ViewCampaignPage.getTextTitle()).to.equal("Campaign Complete");
    expect(await ViewCampaignPage.getTextStatus()).to.equal("Completada");
    expect(await ViewCampaignPage.getTextType()).to.equal("Televisión");
    expect(await ViewCampaignPage.getTextBudget()).to.equal("5000");
    expect(await ViewCampaignPage.getTextDescription()).to.equal(
      "Descripción completa de la campaña"
    );

    idCampaing = await ViewCampaignPage.getCurrentUrlId();
    await ViewCampaignPage.clickRedirectToBack();
  });
});