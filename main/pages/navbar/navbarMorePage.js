const { untilIsLocated, untilIsVisible, waitUntilElementsStops, scrollToBottom } = require("../../../core/interactions/conditions");
const { myByCss } = require("../../../core/interactions/myBy");
const { clickOn } = require("../../../core/interactions/action");

class NavbarMorePage {
    navbarMoreContainer = myByCss('[aria-expanded="true"] ~ [role="menu"]');
    targetListOption = myByCss('[data-name="TargetList"] > a');
    campaignOption = myByCss('[data-name="Campaign"] > a');

    async isVisible() {
        await untilIsLocated(this.navbarMoreContainer);
    }

    async clickMenuTargetList() {
        await untilIsVisible(this.targetListOption);
        await clickOn(this.targetListOption);
    }

    async clickMenuCampaign() {
        await untilIsVisible(this.campaignOption);
        await clickOn(this.campaignOption);
    }
}

module.exports = new NavbarMorePage();
