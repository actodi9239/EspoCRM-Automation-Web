const { untilIsLocated, untilIsVisible } = require("../../../core/interactions/conditions");
const { setValue, clearText, clickOn, pressEnter } = require("../../../core/interactions/action");
const { myByCss } = require("../../../core/interactions/myBy");
const RegisterPage = require('../base/registerPage');

class CreateCampaignPage extends RegisterPage {
    nameInput = myByCss('input[data-name="name"]');
    statusSelectTrigger = myByCss('[data-name="status"] .selectize-input');
    typeSelectTrigger = myByCss('[data-name="type"] .selectize-input');
    budgetInput = myByCss('[autocomplete="espo-budget"]');
    targetListInput = myByCss('[data-name="targetLists"] input');
    excludingTargetListsInput = myByCss('[data-name="excludingTargetLists"] input');
    descriptionInput = myByCss('[data-name="description"] textarea');
    saveButton = myByCss('[data-name="save"]');
    cancelButton = myByCss('[data-name="cancel"]');
    autocompletedOption = myByCss('.autocomplete-suggestion');

    async isVisible() {
        await untilIsLocated(this.nameInput);
        await untilIsLocated(this.statusSelectTrigger);
        await untilIsLocated(this.typeSelectTrigger);
        await untilIsLocated(this.budgetInput);
        await untilIsLocated(this.targetListInput);
        await untilIsLocated(this.excludingTargetListsInput);
        await untilIsLocated(this.descriptionInput);
        await untilIsLocated(this.saveButton);
    }

    async setValues(name, status, type, budget, targetList, excludingTargetList, description) {
        await this.setValueName(name);
        await this.setValueStatus(status);
        await this.setValueType(type);
        await this.setValueBudget(budget);
        await this.setValueTargetList(targetList);
        await this.setValueExcludingTargetList(excludingTargetList);
        await this.setValueDescription(description);
    }

    async setValueName(name) {
        await untilIsVisible(this.nameInput);
        await clearText(this.nameInput);
        await setValue(this.nameInput, name);
    }

    async setValueStatus(status) {
        await untilIsVisible(this.statusSelectTrigger);
        await clickOn(this.statusSelectTrigger);
        let optionLocator;

        switch (status) {
            case 'Activo':
                optionLocator = myByCss('[data-value="Active"]');
                break;
            case 'Planificación':
                optionLocator = myByCss('[data-value="Planning"]');
                break;
            case 'Inactivo':
                optionLocator = myByCss('[data-value="Inactive"]');
                break;
            case 'Completada':
                optionLocator = myByCss('[data-value="Complete"]');
                break;
            default:
                throw new Error(`Estatus "${status}" no encontrado`);
        }

        await clickOn(optionLocator);
    }

    async setValueType(type) {
        await untilIsVisible(this.typeSelectTrigger);
        await clickOn(this.typeSelectTrigger);
        let optionLocator;

        switch (type) {
            case 'Correo':
                optionLocator = myByCss('[data-value="Email"]');
                break;
            case 'Newsletter':
                optionLocator = myByCss('[data-value="Newsletter"]');
                break;
            case 'Web':
                optionLocator = myByCss('[data-value="Web"]');
                break;
            case 'Televisión':
                optionLocator = myByCss('[data-value="Television"]');
                break;
            case 'Radio':
                optionLocator = myByCss('[data-value="Radio"]');
                break;
            case 'Correo Físico':
                optionLocator = myByCss('[data-value="Mail"]');
                break;
            default:
                throw new Error(`Tipo "${type}" no encontrado`);
        }

        await clickOn(optionLocator);
    }

    async setValueBudget(budget) {
        await untilIsVisible(this.budgetInput);
        await clearText(this.budgetInput);
        await setValue(this.budgetInput, budget);
    }

    async setValueTargetList(targetList) {
        await untilIsVisible(this.targetListInput);
        await setValue(this.targetListInput, targetList);
        await pressEnter(this.targetListInput); 
    }

    async setValueExcludingTargetList(excludingTargetList) {
        await untilIsVisible(this.excludingTargetListsInput);
        await setValue(this.excludingTargetListsInput, excludingTargetList);
        await pressEnter(this.excludingTargetListsInput);
    }


    async setValueDescription(description) {
        await untilIsVisible(this.descriptionInput);
        await setValue(this.descriptionInput, description);
    }


    async clickSaveButton() {
        await untilIsVisible(this.saveButton);
        await clickOn(this.saveButton);
    }
}

module.exports = new CreateCampaignPage();
