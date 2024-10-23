const { untilIsLocated, untilIsVisible, sleep, waitUntilElementsStops } = require("../../../core/interactions/conditions");
const { clickOn, getColumnTexts } = require("../../../core/interactions/action");
const { myByCss } = require("../../../core/interactions/myBy");
const ListPage = require("../base/listPage");

class ListTargetListPage extends ListPage {

    async isVisible() {
        const nameTitle = myByCss('th [data-name="name"]');
        await untilIsLocated(nameTitle);
    }

    async clickTargetListRow(id) {
        const targetListIdRow = myByCss(`[data-name="name"] [data-id="${id}"]`);
        await untilIsLocated(targetListIdRow);
        await untilIsVisible(targetListIdRow);
        await clickOn(targetListIdRow);
    }

    async clickTargetListChecked(idTargetList) {
        const targetListIdRowChecked = myByCss(`[data-id="${idTargetList}"] input`);
        await untilIsLocated(targetListIdRowChecked);
        await untilIsVisible(targetListIdRowChecked);
        await clickOn(targetListIdRowChecked);
    }

    async clickTargetListCaret(idTargetList) {
        const targetListIdRowCaret = myByCss(`[data-id="${idTargetList}"] button`);
        const actionsContainer = myByCss(`ul[data-id="${idTargetList}"]`);
        await untilIsLocated(targetListIdRowCaret);
        await untilIsVisible(targetListIdRowCaret);
        await clickOn(targetListIdRowCaret);
        await waitUntilElementsStops(actionsContainer);
    }

    async clickDelete(idTargetList) {
        const deleteButton = myByCss(`[data-id="${idTargetList}"] [data-action="quickRemove"]`);
        await untilIsLocated(deleteButton);
        await untilIsVisible(deleteButton);
        await clickOn(deleteButton);
    }

}

module.exports = new ListTargetListPage();