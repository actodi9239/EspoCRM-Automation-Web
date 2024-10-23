const { untilIsLocated, untilIsVisible, untilIsVisibleSpecific, sleep} = require("../../../core/interactions/conditions");
const { setValue, clickOn, clearText, getText, pressEnter } = require("../../../core/interactions/action");
const { myByCss } = require("../../../core/interactions/myBy");
const RegisterPage = require('../base/registerPage');

class CreateTargetListPage extends RegisterPage {
    nameInput = myByCss('input[data-name="name"]');
    descriptionInput = myByCss('textarea[data-name="description"]');
    syncEnable = myByCss('input[data-name="syncWithReportsEnabled"]');
    syncReport = myByCss('.headered [placeholder="Seleccionar"]')
    userAssignedInput = myByCss('input[data-name="assignedUserName"]')
    autocompletedOption = myByCss('.autocomplete-suggestions:not([style*="display: none"]) > .autocomplete-suggestion');
    messageNameRequired = myByCss('.popover-content > p');
    messageError = myByCss('.alert  .message');
    messageErrorDanger = myByCss('.alert-danger .message')

    async isVisible() {
        await untilIsLocated(this.nameInput);
        await untilIsLocated(this.descriptionInput);
    }

    async setValueName(name) {
        await untilIsVisible(this.nameInput);
        await clearText(this.nameInput);
        await setValue(this.nameInput, name);
    }

    async setValueDescription(description) {
        await untilIsVisible(this.descriptionInput);
        await clearText(this.descriptionInput);
        await setValue(this.descriptionInput, description);
    }

    async clickSyncEnable() {
        await untilIsVisible(this.syncEnable);
        await clickOn(this.syncEnable);
    }

    async clickSyncReport() {
        await untilIsVisible(this.syncReport);
        await clickOn(this.syncReport);
    }

    async getTextMessageNameRequired() {
        return await getText(this.messageNameRequired);
    }

    async getTextMessageError() {
        return await getText(this.messageError);
    }

    async isVisibleMessageError() {
        return await untilIsVisibleSpecific(this.messageErrorDanger);
    }

    async setValueUser(user){
        await untilIsVisible(this.userAssignedInput);
        await setValue(this.userAssignedInput, user);  
        await sleep(400);
        await untilIsVisible(this.autocompletedOption);
        await pressEnter(this.userAssignedInput);
    }
}

module.exports = new CreateTargetListPage(); 
