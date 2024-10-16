const { untilIsLocated, untilIsVisible, waitUntilElementsStops, scrollToBottom } = require("../../../core/interactions/conditions");
const { myByCss } = require("../../../core/interactions/myBy");
const { clickOn } = require("../../../core/interactions/action");

class NavbarMorePage {
    navbarMoreContainer = myByCss('[aria-expanded="true"] ~ [role="menu"]');
    targetListOption = myByCss('[data-name="TargetList"] > a');
    campaignOption = myByCss('[data-name="Campaign"] > a');
    iconSpinner = myByCss('#notification span');

    async isVisible() {
        await untilIsLocated(this.navbarMoreContainer);
    }

    async clickMenuTargetList() {
        await untilIsVisible(this.targetListOption);
        await clickOn(this.targetListOption);
        await untilIsVisible(this.iconSpinner);
    }

    async clickMenuCampaign() {
        await untilIsVisible(this.campaignOption);
        await clickOn(this.campaignOption);
        await untilIsVisible(this.iconSpinner);
    }
}

module.exports = new NavbarMorePage();
