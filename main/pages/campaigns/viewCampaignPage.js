const { untilIsLocated, untilIsVisible, getCurrentUrlId } = require("../../../core/interactions/conditions");
const { clickOn, getText } = require("../../../core/interactions/action");
const { myByCss } = require("../../../core/interactions/myBy");
const ButtonPage = require('../base/buttonPage');

class ViewCampaignPage extends ButtonPage {
    titleText = myByCss('span.title');  // Título de la campaña (visible en la parte superior)
    nameText = myByCss('label ~ [data-name="name"] ');  // Nombre de la campaña
    statusText = myByCss('[data-name="status"]');  // Estatus de la campaña
    typeText = myByCss('[data-name="type"]');  // Tipo de campaña (ej. Televisión, Correo)
    budgetText = myByCss('[data-name="budget"]');  // Presupuesto de la campaña
    targetListText = myByCss('[data-name="targetLists"]');  // Lista de intereses seleccionada
    excludingTargetListText = myByCss('[data-name="excludingTargetLists"]');  // Lista de intereses excluidas
    descriptionText = myByCss('[data-name="description"]');  // Descripción de la campaña
    redirectionButton = myByCss('[data-action="navigateToRoot"]')
    // Método para asegurarse de que la página está visible
    async isVisible() {
        await untilIsLocated(this.titleText);
        await untilIsLocated(this.nameText);
    }

    // Obtener el título de la campaña
    async getTextTitle() {
        return await getText(this.titleText);
    }

    // Obtener el nombre de la campaña
    async getTextName() {
        return await getText(this.nameText);
    }

    // Obtener el estatus de la campaña
    async getTextStatus() {
        return await getText(this.statusText);
    }

    // Obtener el tipo de campaña (ej. Correo, Televisión)
    async getTextType() {
        return await getText(this.typeText);
    }

    // Obtener el presupuesto de la campaña
    async getTextBudget() {
        return await getText(this.budgetText);
    }

    // Obtener la lista de intereses seleccionada
    async getTextTargetList() {
        return await getText(this.targetListText);
    }

    // Obtener la lista de intereses excluidas seleccionada
    async getTextExcludingTargetList() {
        return await getText(this.excludingTargetListText);
    }

    // Obtener la descripción de la campaña
    async getTextDescription() {
        return await getText(this.descriptionText);
    }

    // Obtener el ID de la campaña desde la URL actual
    async getCurrentUrlId() {
        return getCurrentUrlId();
    }

    // Método para redireccionar a la lista de campañas
    async clickRedirectToBack() {
        await untilIsVisible(this.redirectionButton)
        await clickOn(this.redirectionButton);  // Selecciona el botón para regresar a la lista de campañas
    }
}

module.exports = new ViewCampaignPage();
