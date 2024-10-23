const { expect } = require("chai");
const tags = require("mocha-tags");

const NavbarPage = require("../../main/pages/navbar/navbarPage");
const NavbarMorePage = require("../../main/pages/navbar/navbarMorePage");
const ListTargetListPage = require("../../main/pages/targetList/listTargetListPage");
const ModalPage = require("../../main/pages/base/modalPage");
const ViewTargetListPage = require("../../main/pages/targetList/viewTargetListPage");
const testConfig = require("../../testConfig.json");
const LoginPage = require("../../main/pages/loginPage");
const { myBefore, myAfter, myAfterScreen } = require("../../main/hooks");
const { create, deleted } = require("../../main/api/targetList/serviceTargetList");
const data = require("../../utils/targetList/dataDefault.json");

describe("Delete TargetList Test", function () {
  this.timeout(60000);
  let targetList = "";

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

  beforeEach(async function () {
    if (!targetList) {
      data.name = "Robot";
      targetList = await create(data);
    }
  });

  afterEach(async function () {
    if (targetList) {
      await deleted(targetList.id); 
      targetList = "";
    }
    await myAfterScreen.call(this);
  });

  after(async () => {
    await myAfter();
  });

  it("Verify the deletion of a targetList from the row menu.", async () => {
    await ListTargetListPage.reloadPage(); 
    await ListTargetListPage.clickTargetListCaret(targetList.id); 
    await ListTargetListPage.clickDelete(targetList.id); 
    await ModalPage.clickConfirmButton(); 
    expect(await ListTargetListPage.getColumnTextsName()).to.not.include(
      targetList.name
    );
    targetList = ""; 
  });

  it("Verify the deletion of a targetList using the 'Actions' option.", async () => {
    await ListTargetListPage.reloadPage();
    await ListTargetListPage.clickChecked(targetList.id);
    await ListTargetListPage.clickActionsButton();
    await ListTargetListPage.clickDeleteActionsButton();
    await ModalPage.clickConfirmButton();
    expect(await ListTargetListPage.getColumnTextsName()).to.not.include(
      targetList.name
    );    
    targetList="";
  });

  it("Verify delete targetList with page view", async () => {
    await ListTargetListPage.reloadPage();
    await ListTargetListPage.clickTargetListRow(targetList.id); 
    await ViewTargetListPage.clickMoreButton();
    await ViewTargetListPage.clickDeleteButton(); 
    await ModalPage.clickConfirmButton();
    expect(await ListTargetListPage.getColumnTextsName()).to.not.include(
      targetList.name
    );
    targetList = "";
  });

  it("Verify the cancellation of the deletion in the confirmation modal.", async () => {
    await ListTargetListPage.reloadPage();
    await ListTargetListPage.clickTargetListCaret(targetList.id);
    await ListTargetListPage.clickDelete(targetList.id);
    await ModalPage.clickCancelButton();
    expect(await ListTargetListPage.getColumnTextsName()).to.include(
      targetList.name
    );
  });
});