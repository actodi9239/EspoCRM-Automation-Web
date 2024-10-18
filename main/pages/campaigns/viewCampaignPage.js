const {
  untilIsLocated,
  untilIsVisible,
  sleep,
} = require("../../../core/interactions/conditions");
const { clickOn, getText } = require("../../../core/interactions/action");
const { myByCss } = require("../../../core/interactions/myBy");
const ButtonPage = require("../base/buttonPage");

class ViewCampaignPage extends ButtonPage {
  titleText = myByCss("span.title"); // Título de la campaña (visible en la parte superior)
  nameText = myByCss('label ~ [data-name="name"] '); // Nombre de la campaña
  statusText = myByCss('[data-name="status"] >div > span'); // Estatus de la campaña
  typeText = myByCss('[data-name="type"] > div >span'); // Tipo de campaña (ej. Televisión, Correo)
  budgetText = myByCss('[data-name="budget"]  > div'); // Presupuesto de la campaña
  targetListText = myByCss('[data-name="targetLists"]'); // Lista de intereses seleccionada
  excludingTargetListText = myByCss('[data-name="excludingTargetLists"]'); // Lista de intereses excluidas
  descriptionText = myByCss('[data-name="description"] .complex-text'); // Descripción de la campaña
  redirectionButton = myByCss('[data-action="navigateToRoot"]');

  dateStarText = myByCss('.field[data-name="startDate"] > span');
  dateEndText = myByCss('.field[data-name="endDate"] > span');
  userText = myByCss('.field[data-name="assignedUser"] > a');
  teamText = myByCss('.field[data-name="teams"]  a');

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
    const text = await getText(this.budgetText);
    const formattedText = text.replace("$", "").replace(/,/g, "").trim();
    const budgetNumber = parseFloat(formattedText);
    return "" + budgetNumber;
  }

  async getTextTargetList() {
    return await getText(this.targetListText);
  }

  async getTextExcludingTargetList() {
    return await getText(this.excludingTargetListText);
  }

  async getTextDescription() {
    return await getText(this.descriptionText);
  }

  async clickRedirectToBack() {
    await untilIsVisible(this.redirectionButton);
    await clickOn(this.redirectionButton);
  }

  async getTextDateStar() {
    return await getText(this.dateStarText);
  }

  async getTextDateEnd() {
    return await getText(this.dateEndText);
  }

  async getTextUser() {
    return await getText(this.userText);
  }

  async getTextTeam() {
    return await getText(this.teamText);
  }
}

module.exports = new ViewCampaignPage();
