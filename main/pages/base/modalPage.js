const { untilIsLocated, untilIsVisible } = require("../../../core/interactions/conditions");
const { clickOn, getColumnTexts } = require("../../../core/interactions/action");
const { myByCss } = require("../../../core/interactions/myBy");


class ModalPage {
    confirmButton = myByCss('[data-name="confirm"]');
    cancelButton = myByCss('[data-name="cancel"]');

    async isVisible() {
        await untilIsLocated(this.confirmButton)
        await untilIsLocated(this.cancelButton)
    }

    async clickConfirmButton() {
        await untilIsVisible(this.confirmButton)
        await clickOn(this.confirmButton)
    }

    async clickCancelButton() {
        await untilIsVisible(this.cancelButton)
        await clickOn(this.cancelButton)
    }
}

module.exports = new ModalPage();
