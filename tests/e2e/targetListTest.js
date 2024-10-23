const { expect } = require("chai");
const tags = require("mocha-tags");

const NavbarPage = require("../../main/pages/navbar/navbarPage");
const NavbarMorePage = require("../../main/pages/navbar/navbarMorePage");
const NavbarRightPage = require("../../main/pages/navbar/navbarRightPage");
const testConfig = require("../../testConfig.json");
const LoginPage = require("../../main/pages/loginPage");
const { myBefore, myAfter, myAfterScreen } = require("../../main/hooks");
const CreateTargetListPage = require("../../main/pages/targetList/createTargetListPage");
const ListTargetListPage = require("../../main/pages/targetList/listTargetListPage");
const ViewTargetListPage = require("../../main/pages/targetList/viewTargetListPage");
const { deleted } = require("../../main/api/targetList/serviceTargetList");

describe("Create TargetList Test", function () {
  this.timeout(60000);
  let idTarget = "";
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
    if (idTarget) {
        await deleted(idTarget);
        idTarget = "";
      }
    await myAfter();
  });

  it("Verify e2e de create target list", async () => {
    await ListTargetListPage.clickCreateButton();
    await CreateTargetListPage.isVisible();
    await CreateTargetListPage.setValueName("Interes");
    await CreateTargetListPage.setValueUser("Dar Demo")
    await CreateTargetListPage.clickSaveButton();

    expect(await ViewTargetListPage.getTextTitle()).to.equal("Interes");
    expect(await ViewTargetListPage.getTextName()).to.equal("Interes");

    idTarget = await ViewTargetListPage.getCurrentUrlId();

    await ViewTargetListPage.clickRedirectToBack();
    expect(await ListTargetListPage.getColumnTextsName()).to.include(
      "Interes"
    );
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
    await NavbarMorePage.clickMenuTargetList();

    await ListTargetListPage.clickButtonFilters();
    await ListTargetListPage.clickOptionOnlyMy();
    await ListTargetListPage.clickOptionAll();
    expect(await ListTargetListPage.getColumnTextsName()).to.include("Interes");
  });
});