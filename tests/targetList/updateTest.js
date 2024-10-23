const { expect } = require("chai");
const tags = require("mocha-tags");

const NavbarPage = require("../../main/pages/navbar/navbarPage");
const NavbarMorePage = require("../../main/pages/navbar/navbarMorePage");
const ListTargetListPage = require("../../main/pages/targetList/listTargetListPage");
const ViewTargetListPage = require("../../main/pages/targetList/viewTargetListPage");
const testConfig = require("../../testConfig.json");
const LoginPage = require("../../main/pages/loginPage");
const { myBefore, myAfter, myAfterScreen } = require("../../main/hooks");
const {
  create,
  deleted,
} = require("../../main/api/targetList/serviceTargetList");
const data = require("../../utils/targetList/dataDefault.json");
const CreateTargetListPage = require("../../main/pages/targetList/createTargetListPage");

describe("Update TargetList Test", function () {
  this.timeout(60000);
  let targetList = "";
  before(async () => {
    data.name = "prueba";
    targetList = await create(data);
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
    if (targetList.id) {
      await deleted(targetList.id);
    }
    await myAfter();
  });

  it("Verify update targetList with page view", async () => {
    await ListTargetListPage.clickTargetListRow(targetList.id);
    await ViewTargetListPage.clickEditButton();
    await CreateTargetListPage.isVisible();
    await CreateTargetListPage.setValueName("prueba");
    await CreateTargetListPage.clickSaveButton();

    expect(await ViewTargetListPage.getTextTitle()).to.equal("prueba");
    expect(await ViewTargetListPage.getTextName()).to.equal("prueba");

    await ViewTargetListPage.clickRedirectToBack();

    expect(await ListTargetListPage.getColumnTextsName()).to.include("prueba");
  });

  it("Verify update targetList description", async () => {
    await ListTargetListPage.clickTargetListRow(targetList.id);
    await ViewTargetListPage.clickEditButton();
    await CreateTargetListPage.isVisible();
    await CreateTargetListPage.setValueDescription("Descripcion prueba");
    await CreateTargetListPage.clickSaveButton();

    expect(await ViewTargetListPage.getTextDescription()).to.equal("Descripcion prueba");

    await ViewTargetListPage.clickRedirectToBack();
  });

  it("Verify update targetList name null", async () => {
    await ListTargetListPage.clickTargetListRow(targetList.id);
    await ViewTargetListPage.clickEditButton();
    await CreateTargetListPage.isVisible();
    await CreateTargetListPage.setValueDescription("Descripcion prueba");
    await CreateTargetListPage.clickSaveButton();

    expect(await ViewTargetListPage.getTextDescription()).to.equal("Descripcion prueba");

    await ViewTargetListPage.clickRedirectToBack();
  });

  it("Verify updating a target list without modifying any fields", async () => {
    await ListTargetListPage.clickTargetListRow(targetList.id);
    await ViewTargetListPage.clickEditButton();
    await CreateTargetListPage.isVisible();
    await CreateTargetListPage.clickSaveButton();

    expect(await ViewTargetListPage.getTextTitle()).to.equal("prueba");
    expect(await ViewTargetListPage.getTextName()).to.equal("prueba");

    await ViewTargetListPage.clickRedirectToBack();

    expect(await ListTargetListPage.getColumnTextsName()).to.include("prueba");
  });

  it("Verify updating a target list all field modifying", async () => {
    await ListTargetListPage.clickTargetListRow(targetList.id);
    await ViewTargetListPage.clickEditButton();
    await CreateTargetListPage.isVisible();    
    await CreateTargetListPage.setValueName("Target");
    await CreateTargetListPage.setValueDescription("Descripcion target");
    await CreateTargetListPage.clickSaveButton();

    expect(await ViewTargetListPage.getTextTitle()).to.equal("Target");
    expect(await ViewTargetListPage.getTextName()).to.equal("Target");
    expect(await ViewTargetListPage.getTextDescription()).to.equal("Descripcion target");

    await ViewTargetListPage.clickRedirectToBack();

    expect(await ListTargetListPage.getColumnTextsName()).to.include("Target");
  });

  it("Verify that updating a list target with a duplicate name is not allowed", async () => {
    await ListTargetListPage.clickTargetListRow(targetList.id);
    await ViewTargetListPage.clickEditButton();    
    await CreateTargetListPage.isVisible();
    await CreateTargetListPage.setValueName("Computadoras");
    await CreateTargetListPage.clickSaveButton();

    expect(await CreateTargetListPage.isVisibleMessageError()).to.be.true;
  });
});
