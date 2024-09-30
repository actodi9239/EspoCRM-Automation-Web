
const { untilIsLocated, untilIsVisible } = require("../../../core/interactions/conditions");
const { setValue, getText } = require("../../../core/interactions/action");
const { myByCss } = require("../../../core/interactions/myBy");
const ButtonPage = require('../base/buttonPage');


class ViewTargetListPage extends ButtonPage {
    titleText = myByCss('span.title')
    nameText = myByCss('label ~ [data-name="name"] ')

    async isVisible() {
        await untilIsLocated(this.titleText)
        await untilIsLocated(this.nameText)
    }

    async getTextTitle() {
        return await getText(this.meetingTitle);
    }

    async getTextName() {
        return await getText(this.meetingTitle);
    }
}

module.exports = new ViewTargetListPage(); 
