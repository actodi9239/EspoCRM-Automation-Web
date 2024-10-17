const { expect } = require("chai");
const tags = require("mocha-tags");


const data = require("../../utils/targetList/dataDefault.json");
const LoginPage = require("../../main/pages/loginPage");
const NavbarPage = require("../../main/pages/navbar/navbarPage");
const NavbarMorePage = require("../../main/pages/navbar/navbarMorePage");
const ListTargetListPage = require("../../main/pages/targetList/listTargetListPage");
const ViewTargetListPage = require("../../main/pages/targetList/viewTargetListPage");
const { create } = require("../../main/api/targetList/serviceTargetList");
const ModalPage = require("../../main/pages/base/modalPage");
const { myBefore, myAfter, myAfterScreen } = require("../../main/hooks");
const testConfig = require("../../testConfig.json");

describe("Delete Campaing Test", function () {
  this.timeout(60000);
  let targetList = "";
  before(async () => {    
    data.name = "Teclados";
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
    await myAfter();
  });

  it("Verify delete targetList with page view", async () => {
    await ListTargetListPage.clickTargetListRow(targetList.id);
    await ViewTargetListPage.clickMoreButton();
    await ViewTargetListPage.clickDeleteButton();
    await ModalPage.clickConfirmButton();
    expect(await ListTargetListPage.getColumnTextsName()).to.not.include(
      targetList.name
    );
  });
});
