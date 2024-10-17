const { untilIsLocated, untilIsVisible, sleep } = require("../../../core/interactions/conditions");
const { clickOn, getColumnTexts } = require("../../../core/interactions/action");
const { myByCss } = require("../../../core/interactions/myBy");
const ListPage = require('../base/listPage');


class ListCampaingPage extends ListPage {
    columnType = myByCss('td[data-name="type"] > span')
    columnStatus = myByCss('td[data-name="status"] > span')

    typeTitle = myByCss('th [data-name="type"]')
    statusTitle = myByCss('th [data-name="status"]')

    async getColumnTextsType() {
        await sleep(200)
        return getColumnTexts(this.columnType)
    }
    async getColumnTextsStatus() {
        await sleep(200)
        return getColumnTexts(this.columnStatus)
    }
    async isVisible() {
        await untilIsLocated(this.typeTitle);
        await untilIsLocated(this.statusTitle);
    }

    async clickTypeTitle() {
        await sleep()
        await untilIsVisible(this.typeTitle);
        await clickOn(this.typeTitle);
    }

    async clickStatusTitle() {
        await sleep()
        await untilIsVisible(this.statusTitle);
        await clickOn(this.statusTitle);
    }


    async clickCampaignRow(id) {
        const campaignIdRow = myByCss(`[data-name="name"] [data-id="${id}"]`);
        await untilIsLocated(campaignIdRow);
        await untilIsVisible(campaignIdRow)
        await clickOn(campaignIdRow);
    }
}

module.exports = new ListCampaingPage(); 
