const { expect } = require("chai");
const tags = require("mocha-tags");

const NavbarPage = require("../../main/pages/navbar/navbarPage");
const NavbarMorePage = require("../../main/pages/navbar/navbarMorePage");
const ListTargetListPage = require("../../main/pages/targetList/listTargetListPage");
const testConfig = require("../../testConfig.json");
const LoginPage = require("../../main/pages/loginPage");
const { myBefore, myAfter, myAfterScreen } = require("../../main/hooks");

describe("Create Campaing Test", function () {
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
});
