const { expect } = require("chai");
const tags = require("mocha-tags");

const NavbarPage = require("../../main/pages/navbar/navbarPage");
const NavbarMorePage = require("../../main/pages/navbar/navbarMorePage");
const NavbarRightPage = require("../../main/pages/navbar/navbarRightPage");
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
    await myAfterScreen.call(this);
  });

  after(async () => {
    if (idCampaing) {
      await deleted(idCampaing);
      idCampaing = "";
    }
    await myAfter();
  });

  it("Verify e2e de create campaing", async () => {
    await ListCampaingPage.clickCreateButton();
    await CreateCampaignPage.isVisible();

    await CreateCampaignPage.setValueName("Campañas");
    await CreateCampaignPage.setValueStatus("Completada");
    await CreateCampaignPage.setValueType("Televisión");
    await CreateCampaignPage.setValueBudget(5000);
    await CreateCampaignPage.setValueDescription(
      "Descripción completa de la campaña"
    );
    await CreateCampaignPage.setValueDateStar("12/12/2024");
    await CreateCampaignPage.setValueDateEnd("12/15/2024");
    await CreateCampaignPage.setValueUser("Dar Demo");
    await CreateCampaignPage.setValueTeam("Team Dev");
    await CreateCampaignPage.clickSaveButton();

    expect(await ViewCampaignPage.getTextTitle()).to.equal("Campañas");
    expect(await ViewCampaignPage.getTextStatus()).to.equal("Completada");
    expect(await ViewCampaignPage.getTextType()).to.equal("Televisión");
    expect(await ViewCampaignPage.getTextBudget()).to.equal("5000");
    expect(await ViewCampaignPage.getTextDescription()).to.equal(
      "Descripción completa de la campaña"
    );
    expect(await ViewCampaignPage.getTextDateStar()).to.equal("Dic 12");
    expect(await ViewCampaignPage.getTextDateEnd()).to.equal("Dic 15");
    expect(await ViewCampaignPage.getTextUser()).to.equal("Dar Demo");
    expect(await ViewCampaignPage.getTextTeam()).to.include("Team Dev");

    idCampaing = await ViewCampaignPage.getCurrentUrlId();
    await ViewCampaignPage.clickRedirectToBack();
    expect(await ListCampaingPage.getColumnTextsName()).to.include("Campañas");

    await NavbarRightPage.isVisible();
    await NavbarRightPage.clickMenuIcon();
    await NavbarRightPage.clickLogout();

    await LoginPage.isVisible();
    await LoginPage.setCredentials(
      testConfig.credentials2.username,
      testConfig.credentials2.password
    );
    await LoginPage.clickLoginButton();

    await NavbarPage.isVisible();
    await NavbarPage.clickIconMore();

    await NavbarMorePage.isVisible();
    await NavbarMorePage.clickMenuCampaign();

    await ListCampaingPage.clickButtonFilters();
    await ListCampaingPage.clickOptionOnlyMy();
    await ListCampaingPage.clickOptionAll();
    expect(await ListCampaingPage.getColumnTextsName()).to.include("Campañas");
    await ListCampaingPage.clickCampaignRow(idCampaing);
    expect(await ViewCampaignPage.getTextTitle()).to.equal("Campañas");
    expect(await ViewCampaignPage.getTextStatus()).to.equal("Completada");
    expect(await ViewCampaignPage.getTextType()).to.equal("Televisión");
    expect(await ViewCampaignPage.getTextBudget()).to.equal("5000");
    expect(await ViewCampaignPage.getTextDescription()).to.equal(
      "Descripción completa de la campaña"
    );
    expect(await ViewCampaignPage.getTextDateStar()).to.equal("Dic 12");
    expect(await ViewCampaignPage.getTextDateEnd()).to.equal("Dic 15");
    expect(await ViewCampaignPage.getTextUser()).to.equal("Dar Demo");
    expect(await ViewCampaignPage.getTextTeam()).to.include("Team Dev");
  });
});
