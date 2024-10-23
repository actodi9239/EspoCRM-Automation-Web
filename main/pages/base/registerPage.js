const { untilIsLocated, untilIsVisible, sleep } = require("../../../core/interactions/conditions");
const { clickOn, setValue } = require("../../../core/interactions/action");
const { myByCss } = require("../../../core/interactions/myBy");

class RegisterPage {
    saveButton = myByCss('[data-name="save"]');
    cancelButton = myByCss('[data-name="cancel"]');
    cancelEditButton = myByCss('[data-name="cancelEdit"]')
    moreIcon = myByCss('[role="group"] > [data-toggle="dropdown"]');
    saveContinueButton = myByCss('[data-name="saveAndContinueEditing"]')
    saveNewButton = myByCss('[data-name="saveAndNew"]')

    // [data-name="edit"]
    async isVisible() {
        await untilIsLocated(this.saveButton);
        await untilIsLocated(this.moreIcon);
    }

    async clickSaveButton() {
        await untilIsVisible(this.saveButton);
        await clickOn(this.saveButton);
    }
    async clickCancelButton() {
        await untilIsVisible(this.cancelButton);
        await clickOn(this.cancelButton);
    }

    async clickCancelEditButton() {
        await untilIsVisible(this.cancelEditButton);
        await clickOn(this.cancelEditButton);
    }

    async clickMoreIcon() {
        await untilIsVisible(this.moreIcon);
        await clickOn(this.moreIcon);
    }
    async clickSaveContinueButton() {
        await untilIsVisible(this.saveContinueButton);
        await clickOn(this.saveButtsaveContinueButtonon);
    }
    async clickSaveNewButton() {
        await untilIsVisible(this.saveNewButton);
        await clickOn(this.saveNewButton);
    }
}
module.exports = RegisterPage; 
