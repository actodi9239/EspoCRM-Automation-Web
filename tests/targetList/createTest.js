const { expect } = require("chai");
const tags = require("mocha-tags");

const NavbarPage = require("../../main/pages/navbar/navbarPage");
const NavbarMorePage = require("../../main/pages/navbar/navbarMorePage");
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
    if (idTarget) {
      await deleted(idTarget);
      idTarget = "";
    }
    await myAfterScreen.call(this);
  });

  after(async () => {
    await myAfter();
  });

  it("Verify create targetList with field requerids", async () => {
    await ListTargetListPage.clickCreateButton();
    await CreateTargetListPage.isVisible();
    await CreateTargetListPage.setValueName("targetList Test");
    await CreateTargetListPage.clickSaveButton();

    expect(await ViewTargetListPage.getTextTitle()).to.equal("targetList Test");
    expect(await ViewTargetListPage.getTextName()).to.equal("targetList Test");

    idTarget = await ViewTargetListPage.getCurrentUrlId();

    await ViewTargetListPage.clickRedirectToBack();
    expect(await ListTargetListPage.getColumnTextsName()).to.include(
      "targetList Test"
    );
  });

  it("Verify create targetList with empty description", async () => {
    await ListTargetListPage.clickCreateButton();
    await CreateTargetListPage.isVisible();
    await CreateTargetListPage.setValueName("targetList Test");
    await CreateTargetListPage.clickSaveButton();

    expect(await ViewTargetListPage.getTextTitle()).to.equal("targetList Test");
    expect(await ViewTargetListPage.getTextName()).to.equal("targetList Test");
    expect(await ViewTargetListPage.getTextDescriptionNull()).to.equal("(vacío)");

    idTarget = await ViewTargetListPage.getCurrentUrlId();

    await ViewTargetListPage.clickRedirectToBack();
    expect(await ListTargetListPage.getColumnTextsName()).to.include(
      "targetList Test"
    );
  });

  it("Verify create targetList with description", async () => {
    await ListTargetListPage.clickCreateButton();
    await CreateTargetListPage.isVisible();
    await CreateTargetListPage.setValueName("targetList Test");
    await CreateTargetListPage.setValueDescription("description Target List");
    await CreateTargetListPage.clickSyncEnable();
    await CreateTargetListPage.clickSaveButton();

    expect(await ViewTargetListPage.getTextTitle()).to.equal("targetList Test");
    expect(await ViewTargetListPage.getTextName()).to.equal("targetList Test");
    expect(await ViewTargetListPage.getTextDescription()).to.equal(
      "description Target List"
    );

    idTarget = await ViewTargetListPage.getCurrentUrlId();

    await ViewTargetListPage.clickRedirectToBack();
    expect(await ListTargetListPage.getColumnTextsName()).to.include(
      "targetList Test"
    );
  });

  it("Verify create campaign name null", async () => {
    await ListTargetListPage.clickCreateButton();
    await CreateTargetListPage.isVisible();
    await CreateTargetListPage.setValueName(" ");
    await CreateTargetListPage.clickSaveButton();

    expect(await CreateTargetListPage.getTextMessageNameRequired()).to.equal(
      "Nombre es requerido"
    );
    expect(await CreateTargetListPage.getTextMessageError()).to.equal(
      "No válido"
    );
  });
});
