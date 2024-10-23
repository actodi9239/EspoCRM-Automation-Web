const { expect } = require("chai");
const tags = require("mocha-tags");

const NavbarPage = require("../../main/pages/navbar/navbarPage");
const NavbarMorePage = require("../../main/pages/navbar/navbarMorePage");
const ListTargetListPage = require("../../main/pages/targetList/listTargetListPage");
const ViewTargetListPage=require("../../main/pages/targetList/viewTargetListPage.js")
const testConfig = require("../../testConfig.json");
const LoginPage = require("../../main/pages/loginPage");
const { myBefore, myAfter, myAfterScreen } = require("../../main/hooks");

describe("List TargetList Test", function () {
  this.timeout(50000);
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
    await NavbarMorePage.clickMenuTargetList();
  });

  afterEach(async function () {
    await myAfterScreen.call(this);
  });

  after(async () => {
    await myAfter();
  });

  it("Verify ascending column name", async () => {
    await ListTargetListPage.clickNameTitle();

    const columnTexts = await ListTargetListPage.getColumnTextsName();
    const sortedTexts = [...columnTexts].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
    expect(columnTexts).to.deep.equal(sortedTexts);
  });

  it("Verify descending column name", async () => {
    await ListTargetListPage.clickNameTitle();
    const columnTexts = await ListTargetListPage.getColumnTextsName();
    const sortedTextsDesc = [...columnTexts]
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
      .reverse();
    expect(columnTexts).to.deep.equal(sortedTextsDesc);
  });

  it("Verify search for name", async () => {
    await ListTargetListPage.setValueSearch("Computadoras");
    expect(await ListTargetListPage.getColumnTextsName()).to.include(
      "Computadoras"
    );
    await ListTargetListPage.clickResetButton();
  });

  it("Verify that a campaign can be selected from the list", async () => {
    await ListTargetListPage.reloadPage();
    await ListTargetListPage.clickTargetListRow("67117a0a3de6b6120");
    expect(await ViewTargetListPage.getTextTitle()).to.equal("Ram")
    await ViewTargetListPage.clickRedirectToBack();
  });

  it("Verify option all", async () => {
    await ListTargetListPage.clickButtonFilters();
    await ListTargetListPage.clickOptionAll();
    const columnTexts = await ListTargetListPage.getColumnTextsName();
    expect(columnTexts.length).to.be.at.least(4); 
  });

  it("Verify option only my all", async () => {
    await ListTargetListPage.clickButtonFilters();
    await ListTargetListPage.clickOptionOnlyMy();
    const columnTexts = await ListTargetListPage.getColumnTextsName();
        expect(columnTexts.length).to.be.at.least(0);   
    await ListTargetListPage.clickButtonFilters();
    await ListTargetListPage.clickButtonFilters();
    await ListTargetListPage.clickOptionOnlyMy();   
  });
});
