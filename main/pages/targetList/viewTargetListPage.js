const { untilIsLocated, untilIsVisible } = require("../../../core/interactions/conditions");
const { clickOn, getText } = require("../../../core/interactions/action");
const { myByCss } = require("../../../core/interactions/myBy");
const ButtonPage = require('../base/buttonPage');

class ViewTargetListPage extends ButtonPage {
    titleText = myByCss('span.title');
    nameText = myByCss('label ~ [data-name="name"]');
    descriptionText = myByCss('[data-name="description"] p');
    enableChecked = myByCss('input[checked]');
    descriptionNullText = myByCss('.field[data-name="description"] > span');

    async isVisible() {
        await untilIsLocated(this.titleText);
        await untilIsLocated(this.nameText);
    }

    async getTextTitle() {
        await untilIsVisible(this.titleText); 
    }

    async getTextName() {
        await untilIsVisible(this.nameText);
        return await getText(this.nameText);
    }

    async getTextDescription() {
        await untilIsVisible(this.descriptionText);
        return await getText(this.descriptionText);
    }

    async getTextDescriptionNull() {
        await untilIsVisible(this.descriptionNullText);
        return await getText(this.descriptionNullText);
    }

    async clickRedirectToBack() {
        const redirectionButton = myByCss('[data-action="navigateToRoot"]');
        await untilIsVisible(redirectionButton);
        await clickOn(redirectionButton);
    }
}

module.exports = new ViewTargetListPage();