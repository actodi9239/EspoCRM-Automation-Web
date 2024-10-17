const { untilIsLocated, untilIsVisible, getCurrentUrlId } = require("../../../core/interactions/conditions");
const { clickOn, setValue } = require("../../../core/interactions/action");
const { myByCss } = require("../../../core/interactions/myBy");

class ButtonPage {
    redirectToBack = myByCss('[data-action="navigateToRoot"]')
    editButton = myByCss('[data-name="edit"]')
    moreButton = myByCss('[data-name="edit"] ~ [data-toggle="dropdown"]')
    deleteButton = myByCss('[data-name="delete"]')
    duplicateButton = myByCss('[data-name="duplicate"]')


    async isVisible() {
        await untilIsLocated(this.redirectToBack);
        await untilIsLocated(this.editButton);
        await untilIsLocated(this.moreButton);
    }

    async clickRedirectToBack() {
        await untilIsVisible(this.redirectToBack);
        await clickOn(this.redirectToBack);
    }

    async clickEditButton() {
        await untilIsVisible(this.editButton);
        await clickOn(this.editButton);
    }

    async clickMoreButton() {
        await untilIsVisible(this.moreButton);
        await clickOn(this.moreButton);
    }

    async clickDeleteButton() {
        await untilIsVisible(this.deleteButton);
        await clickOn(this.deleteButton);
    }

    async clickDuplicateButton() {
        await untilIsVisible(this.duplicateButton);
        await clickOn(this.duplicateButton);
    }

    async getCurrentUrlId() {
        return getCurrentUrlId();
      }
}
module.exports = ButtonPage; 
