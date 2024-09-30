const { expect } = require('chai');
const tags = require('mocha-tags');

const NavbarPage = require('../../main/pages/navbar/navbarPage');
const NavbarMorePage = require('../../main/pages/navbar/navbarMorePage');
const ListCampaingPage = require('../../main/pages/campaigns/listCampaignPage');
const CreateCampaignPage = require('../../main/pages/campaigns/createCampaignPage');
const ViewCampaignPage = require('../../main/pages/campaigns/viewCampaignPage');
const testConfig = require('../../testConfig.json');
const LoginPage = require('../../main/pages/loginPage');
const { myBefore, myAfter, myAfterScreen } = require('../../main/hooks');
const { deleted } = require('../../main/api/campaigns/serviceCampaings');

describe('Create Campaing Test', function () {
    this.timeout(60000);
    let idCampaing = '';
    before(async () => {
        await myBefore();
        await LoginPage.isVisible();
        await LoginPage.setCredentials(testConfig.credentials.username, testConfig.credentials.password)
        await LoginPage.clickLoginButton();
        await NavbarPage.clickIconMore();
        await NavbarMorePage.clickMenuCampaign();
    });

    afterEach(async function () {
        if (idCampaing) {
            await deleted(idCampaing);
        }
        await myAfterScreen.call(this);
    });

    after(async () => {

        await myAfter();
    });

    it('Verify create campaign with field requerids', async () => {
        await ListCampaingPage.clickCreateButton();
        await CreateCampaignPage.isVisible()
        await CreateCampaignPage.setValueName("Campaing 21")
        await CreateCampaignPage.clickSaveButton();

        expect(await ViewCampaignPage.getTextTitle()).to.equal('Campaing 21');
        expect(await ViewCampaignPage.getTextName()).to.equal('Campaing 21');

        idCampaing = await ViewCampaignPage.getCurrentUrlId();

        await ViewCampaignPage.clickRedirectToBack();
    })

    it('Verify create campaign with field requerids 2', async () => {
        await ListCampaingPage.clickCreateButton();
        await CreateCampaignPage.isVisible()
        await CreateCampaignPage.setValueName("Campaing 22")
        await CreateCampaignPage.clickSaveButton();

        expect(await ViewCampaignPage.getTextTitle()).to.equal('Campaing 22');
        expect(await ViewCampaignPage.getTextName()).to.equal('Campaing 22');

        idCampaing = await ViewCampaignPage.getCurrentUrlId();

        await ViewCampaignPage.clickRedirectToBack();
    })

    it('Verify create campaign with all fields', async () => {
        await ListCampaingPage.clickCreateButton();
        await CreateCampaignPage.isVisible();
    
        // Llenar todos los campos de la campaña
        await CreateCampaignPage.setValues(
            "Campaign Complete",          // Nombre de la campaña
            "Completada",                 // Estatus
            "Televisión",                 // Tipo de campaña
            5000,  
            "Descripción completa de la campaña"  // Descripción
        );
    
        // Guardar la campaña
        await CreateCampaignPage.clickSaveButton();
    
        // Validaciones: asegúrate de que los datos guardados son correctos
        expect(await ViewCampaignPage.getTextTitle()).to.equal('Campaign Complete');  // Validar el título
        expect(await ViewCampaignPage.getTextStatus()).to.equal('Completada');        // Validar el estatus
        expect(await ViewCampaignPage.getTextType()).to.equal('Televisión');          // Validar el tipo
        expect(await ViewCampaignPage.getTextBudget()).to.equal('5000 USD');          // Validar el presupuesto
        expect(await ViewCampaignPage.getTextDescription()).to.equal('Descripción completa de la campaña');  // Validar la descripción
    
        // Capturar el ID de la campaña para la eliminación
        idCampaing = await ViewCampaignPage.getCurrentUrlId();
    
        // Redireccionar hacia la lista de campañas
        await ViewCampaignPage.clickRedirectToBack();
    });
    
});