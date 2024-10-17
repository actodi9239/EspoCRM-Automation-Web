
const { untilIsLocated, untilIsVisible } = require("../../../core/interactions/conditions");
const { setValue, getText } = require("../../../core/interactions/action");
const { myByCss } = require("../../../core/interactions/myBy");
const ButtonPage = require('../base/buttonPage');


class ViewTargetListPage extends ButtonPage {
    titleText = myByCss('span.title')
    nameText = myByCss('label ~ [data-name="name"] ')
    descriptionText = myByCss('[data-name="description"] p')
    enableChecked = myByCss('input[checked]')
    descriptionNullText = myByCss('.field[data-name="description"] > span')

    async isVisible() {
        await untilIsLocated(this.titleText)
        await untilIsLocated(this.nameText)
    }

    async getTextTitle() {
        return await getText(this.titleText);
    }

    async getTextName() {
        return await getText(this.nameText);
    }

    async getTextDescription() {
        return await getText(this.descriptionText);
    }

    async getTextDescriptionNull() {
        return await getText(this.descriptionNullText);
    }
}

module.exports = new ViewTargetListPage(); 
