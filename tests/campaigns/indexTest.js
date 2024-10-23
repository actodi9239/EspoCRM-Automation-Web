const { expect } = require("chai");
const tags = require("mocha-tags");

const NavbarPage = require("../../main/pages/navbar/navbarPage");
const NavbarMorePage = require("../../main/pages/navbar/navbarMorePage");
const ListCampaingPage = require("../../main/pages/campaigns/listCampaignPage");
const testConfig = require("../../testConfig.json");
const LoginPage = require("../../main/pages/loginPage");
const { myBefore, myAfter, myAfterScreen } = require("../../main/hooks");
const { log } = require("winston");
const ViewCampaignPage = require("../../main/pages/campaigns/viewCampaignPage");

describe("landing page Campaing Test", function () {
  this.timeout(60000);
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
    await myAfter();
  });

  it("Verify ascending column name", async () => {
    await ListCampaingPage.clickNameTitle();

    const columnTexts = await ListCampaingPage.getColumnTextsName();
    const sortedTexts = [...columnTexts].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
    expect(columnTexts).to.deep.equal(sortedTexts);
  });

  it("Verify descending column name", async () => {
    await ListCampaingPage.clickNameTitle();
    const columnTexts = await ListCampaingPage.getColumnTextsName();
    const sortedTextsDesc = [...columnTexts]
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
      .reverse();
    expect(columnTexts).to.deep.equal(sortedTextsDesc);
  });

  it("Verify asceding column type", async () => {
    await ListCampaingPage.clickTypeTitle();

    const columnTexts = await ListCampaingPage.getColumnTextsType();
    const sortedTexts = [...columnTexts].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
    expect(columnTexts).to.deep.equal(sortedTexts);
  });

  it("Verify descending column type", async () => {
    await ListCampaingPage.clickTypeTitle();
    const columnTexts = await ListCampaingPage.getColumnTextsType();
    const sortedTextsDesc = [...columnTexts]
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
      .reverse();
    expect(columnTexts).to.deep.equal(sortedTextsDesc);
  });

  it("Verify acceding column status", async () => {
    await ListCampaingPage.clickStatusTitle();
    const columnTexts = await ListCampaingPage.getColumnTextsStatus();
    const sortedTextsDesc = [...columnTexts]
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
      .reverse();
    expect(columnTexts).to.deep.equal(sortedTextsDesc);
  });

  it("Verify descending column status", async () => {
    await ListCampaingPage.clickStatusTitle();
    const columnTexts = await ListCampaingPage.getColumnTextsStatus();
    const sortedTexts = [...columnTexts].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
    expect(columnTexts).to.deep.equal(sortedTexts);
  });

  it("Verify search for name", async () => {
    await ListCampaingPage.setValueSearch("Arboles");
    expect(await ListCampaingPage.getColumnTextsName()).to.include(
      "Arboles"
    );
    await ListCampaingPage.clickResetButton();
  });

  it("Verify that a campaign can be selected from the list", async () => {
    await ListCampaingPage.reloadPage();
    await ListCampaingPage.clickCampaignRow("67143527cc2288dc1");
    expect(await ViewCampaignPage.getTextTitle()).to.equal("Animales")
    await ViewCampaignPage.clickRedirectToBack();
  });

  it("Verify option active", async () => {
    await ListCampaingPage.clickButtonFilters();
    await ListCampaingPage.clickOptionActive();
    const columnTexts = await ListCampaingPage.getColumnTextsName();
    expect(columnTexts.length).to.equal(1);    
  });

  it("Verify option all", async () => {
    await ListCampaingPage.clickButtonFilters();
    await ListCampaingPage.clickOptionAll();
    const columnTexts = await ListCampaingPage.getColumnTextsName();
    expect(columnTexts.length).to.be.at.least(4);
  });

  it("Verify option only my active", async () => {
    await ListCampaingPage.clickButtonFilters();
    await ListCampaingPage.clickOptionActive();
    await ListCampaingPage.clickButtonFilters();
    await ListCampaingPage.clickOptionOnlyMy();
    const columnTexts = await ListCampaingPage.getColumnTextsName();
    expect(columnTexts.length).to.equal(1);    
  });

  it("Verify option only my all", async () => {
    await ListCampaingPage.clickButtonFilters();
    await ListCampaingPage.clickButtonFilters();
    await ListCampaingPage.clickOptionAll();
    const columnTexts = await ListCampaingPage.getColumnTextsName();
        expect(columnTexts.length).to.be.at.least(0);   
    await ListCampaingPage.clickButtonFilters();
    await ListCampaingPage.clickOptionOnlyMy();    
    await ListCampaingPage.clickOptionAll();    
  });

});
