const { clickOn } = require("../../../core/interactions/action");
const { untilIsLocated, untilIsVisible, waitUntilElementsStops } = require("../../../core/interactions/conditions");
const { myByCss } = require("../../../core/interactions/myBy");


class NavbarRightPage {
    menuIcon = myByCss('#nav-menu-dropdown')
    menuContainer = myByCss('.menu-container.open')
    logoutOption = myByCss('[data-action="logout"]')

    async isVisible() {
        await untilIsLocated(this.menuIcon)
    }

    async clickMenuIcon() {
        await untilIsVisible(this.menuIcon)
        await clickOn(this.menuIcon)
        await waitUntilElementsStops(this.menuContainer)
    }

    async clickLogout() {
        await untilIsVisible(this.logoutOption)
        await clickOn(this.logoutOption);
    }
}

module.exports = new NavbarRightPage();