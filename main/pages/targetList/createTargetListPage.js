const { untilIsLocated, untilIsVisible} = require("../../../core/interactions/conditions");
const { setValue, clickOn } = require("../../../core/interactions/action");
const { myByCss } = require("../../../core/interactions/myBy");
const RegisterPage = require('../base/registerPage');

class CreateTargetListPage extends RegisterPage {
    nameInput = myByCss('input[data-name="name"]');
    descriptionInput = myByCss('textarea[data-name="description"]');
    syncEnable = myByCss('input[data-name="syncWithReportsEnabled"]');
    syncReport = myByCss('.headered [placeholder="Seleccionar"]')

    async isVisible() {
        await untilIsLocated(this.nameInput);
        await untilIsLocated(this.descriptionInput);
    }

    async setValueName(name) {
        await untilIsVisible(this.nameInput);
        await setValue(this.nameInput, name);
    }

    async setValueDescription(description) {
        await untilIsVisible(this.descriptionInput);
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

}

module.exports = new CreateTargetListPage(); 
