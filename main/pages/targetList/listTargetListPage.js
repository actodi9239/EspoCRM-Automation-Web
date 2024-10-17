const { untilIsLocated, untilIsVisible } = require("../../../core/interactions/conditions");
const { clickOn, getColumnTexts } = require("../../../core/interactions/action");
const { myByCss } = require("../../../core/interactions/myBy");
const ListPage = require('../base/listPage');


class ListTargetListPage extends ListPage {


    async clickTargetListRow(id) {
        const targetListIdRow = myByCss(`[data-name="name"] [data-id="${id}"]`);
        await untilIsLocated(targetListIdRow);
        await untilIsVisible(targetListIdRow)
        await clickOn(targetListIdRow);
    }
}

module.exports = new ListTargetListPage(); 