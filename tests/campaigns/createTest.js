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

  it("Verify create campaign with all fields type television", async () => {
    await ListCampaingPage.clickCreateButton();
    await CreateCampaignPage.isVisible();

    await CreateCampaignPage.setValueName("Campaign Complete");
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

    expect(await ViewCampaignPage.getTextTitle()).to.equal("Campaign Complete");
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
    expect(await ListCampaingPage.getColumnTextsName()).to.include(
      "Campaign Complete"
    );
  });

  it("Verify create campaign with all fields type correo", async () => {
    await ListCampaingPage.clickCreateButton();
    await CreateCampaignPage.isVisible();

    await CreateCampaignPage.setValueName("Campaign Complete");
    await CreateCampaignPage.setValueStatus("Completada");
    await CreateCampaignPage.setValueType("Correo");
    await CreateCampaignPage.setValueBudget(5000);
    await CreateCampaignPage.setValueDescription(
      "Descripción completa de la campaña"
    );
    await CreateCampaignPage.setValueDateStar("12/12/2024");
    await CreateCampaignPage.setValueDateEnd("12/15/2024");
    await CreateCampaignPage.setValueUser("Dar Demo");
    await CreateCampaignPage.setValueTeam("Team Dev");
    await CreateCampaignPage.setValueTargetList("Arboles");
    await CreateCampaignPage.setValueExcludingTargetList("Vacio");
    await CreateCampaignPage.setValueFormatContacts("Invoice (example)");
    await CreateCampaignPage.setValueFormatReference(
      "Delivery Order (example)"
    );
    await CreateCampaignPage.setValueFormatAccounts("Purchase Order (example)");

    await CreateCampaignPage.clickSaveButton();

    expect(await ViewCampaignPage.getTextTitle()).to.equal("Campaign Complete");
    expect(await ViewCampaignPage.getTextStatus()).to.equal("Completada");
    expect(await ViewCampaignPage.getTextType()).to.equal("Correo");
    expect(await ViewCampaignPage.getTextBudget()).to.equal("5000");
    expect(await ViewCampaignPage.getTextDescription()).to.equal(
      "Descripción completa de la campaña"
    );
    expect(await ViewCampaignPage.getTextDateStar()).to.equal("Dic 12");
    expect(await ViewCampaignPage.getTextDateEnd()).to.equal("Dic 15");
    expect(await ViewCampaignPage.getTextUser()).to.equal("Dar Demo");
    expect(await ViewCampaignPage.getTextTeam()).to.include("Team Dev");
    expect(await ViewCampaignPage.getTextTargetList()).to.equal("Arboles");
    expect(await ViewCampaignPage.getTextExcludingTargetList()).to.equal(
      "Vacio"
    );
    expect(await ViewCampaignPage.getTextFormatContact()).to.equal(
      "Invoice (example)"
    );
    expect(await ViewCampaignPage.getTextFormatReference()).to.equal(
      "Delivery Order (example)"
    );
    expect(await ViewCampaignPage.getTextFormatAccount()).to.equal(
      "Purchase Order (example)"
    );

    idCampaing = await ViewCampaignPage.getCurrentUrlId();
    await ViewCampaignPage.clickRedirectToBack();
    expect(await ListCampaingPage.getColumnTextsName()).to.include(
      "Campaign Complete"
    );
  });

  it("Verify create campaign with all fields type Periódico", async () => {
    await ListCampaingPage.clickCreateButton();
    await CreateCampaignPage.isVisible();

    await CreateCampaignPage.setValueName("Campaign Complete");
    await CreateCampaignPage.setValueStatus("Completada");
    await CreateCampaignPage.setValueType("Periódico");
    await CreateCampaignPage.setValueBudget(5000);
    await CreateCampaignPage.setValueDescription(
      "Descripción completa de la campaña"
    );
    await CreateCampaignPage.setValueDateStar("12/12/2024");
    await CreateCampaignPage.setValueDateEnd("12/15/2024");
    await CreateCampaignPage.setValueUser("Dar Demo");
    await CreateCampaignPage.setValueTeam("Team Dev");
    await CreateCampaignPage.setValueTargetList("Arboles");
    await CreateCampaignPage.setValueExcludingTargetList("Vacio");

    await CreateCampaignPage.clickSaveButton();

    expect(await ViewCampaignPage.getTextTitle()).to.equal("Campaign Complete");
    expect(await ViewCampaignPage.getTextStatus()).to.equal("Completada");
    expect(await ViewCampaignPage.getTextType()).to.equal("Periódico");
    expect(await ViewCampaignPage.getTextBudget()).to.equal("5000");
    expect(await ViewCampaignPage.getTextDescription()).to.equal(
      "Descripción completa de la campaña"
    );
    expect(await ViewCampaignPage.getTextDateStar()).to.equal("Dic 12");
    expect(await ViewCampaignPage.getTextDateEnd()).to.equal("Dic 15");
    expect(await ViewCampaignPage.getTextUser()).to.equal("Dar Demo");
    expect(await ViewCampaignPage.getTextTeam()).to.include("Team Dev");
    expect(await ViewCampaignPage.getTextTargetList()).to.equal("Arboles");
    expect(await ViewCampaignPage.getTextExcludingTargetList()).to.equal(
      "Vacio"
    );

    idCampaing = await ViewCampaignPage.getCurrentUrlId();
    await ViewCampaignPage.clickRedirectToBack();
    expect(await ListCampaingPage.getColumnTextsName()).to.include(
      "Campaign Complete"
    );
  });

  it("Verify create campaign with all fields type television", async () => {
    await ListCampaingPage.clickCreateButton();
    await CreateCampaignPage.isVisible();

    await CreateCampaignPage.setValueName("Campaign Complete");
    await CreateCampaignPage.setValueStatus("Planificación");
    await CreateCampaignPage.setValueBudget(5000);
    await CreateCampaignPage.setValueDescription(
      "Descripción completa de la campaña"
    );
    await CreateCampaignPage.setValueDateStar("12/12/2000");
    await CreateCampaignPage.setValueDateEnd("12/15/2000");
    await CreateCampaignPage.setValueUser("Dar Demo");
    await CreateCampaignPage.setValueTeam("Team Dev");
    await CreateCampaignPage.clickSaveButton();
    idCampaing = await ViewCampaignPage.getCurrentUrlId();
    expect(await CreateCampaignPage.isVisibleMessageError()).to.be.true;
  });

  it("Verify create campaign name null", async () => {
    await ViewCampaignPage.clickRedirectToBack();
    await ListCampaingPage.clickCreateButton();
    await CreateCampaignPage.isVisible();
    await CreateCampaignPage.setValueName(" ");
    await CreateCampaignPage.clickSaveButton();

    expect(await CreateCampaignPage.getTextMessageNameRequired()).to.equal(
      "Nombre es requerido"
    );
    expect(await CreateCampaignPage.getTextMessageError()).to.equal(
      "No válido"
    );
  });
});
