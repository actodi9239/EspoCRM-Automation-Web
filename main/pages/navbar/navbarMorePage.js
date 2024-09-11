const { untilIsLocated, untilIsVisible, waitUntilElementsStops, scrollToBottom } = require("../../../core/interactions/conditions");
const { myByCss } = require("../../../core/interactions/myBy");
const { clickOn } = require("../../../core/interactions/action");

class NavbarMorePage {
    navbarMoreContainer = myByCss('[aria-expanded="true"] ~ [role="menu"]');
    teamOption = myByCss('[data-name="Team"] > a');
    userOption = myByCss('[data-name="User"] > a');

    async isVisible() {
        await untilIsLocated(this.navbarMoreContainer);
    }

    async clickMenuTeam() {
        await untilIsVisible(this.teamOption);
        await clickOn(this.teamOption);
    }

    async clickMenuUser() {
        await untilIsVisible(this.userOption);
        await clickOn(this.userOption);
    }
}

module.exports = new NavbarMorePage();
