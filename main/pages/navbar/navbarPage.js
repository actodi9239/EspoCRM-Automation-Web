const { untilIsLocated, untilIsVisible, waitUntilElementsStops, scrollToBottom } = require("../../../core/interactions/conditions");
const { myByCss } = require("../../../core/interactions/myBy");
const { clickOn, getText } = require("../../../core/interactions/action");

class NavbarPage {
    navbarContainer = myByCss('#navbar');
    homeText = myByCss('[data-name="Home"] span.full-label');
    iconTicket = myByCss('[data-name="Case"]>a');
    iconChevron = myByCss('.minimizer');
    moreContainer = myByCss('.more');
    iconMore = myByCss('.more > a');
    opportunityOption = myByCss('[data-name="Opportunity"] > a');
    meetingOption = myByCss('[data-name="Meeting"] > a')

    async isVisible() {
        await untilIsLocated(this.navbarContainer);
        await untilIsLocated(this.iconChevron);
        await untilIsLocated(this.moreContainer);
        await untilIsLocated(this.iconMore);
    }

    async clickIconChevron() {
        await untilIsVisible(this.iconChevron);
        await clickOn(this.iconChevron);
        await waitUntilElementsStops(this.iconChevron);
    }

    async clickIconMore() {
        await scrollToBottom();
        await untilIsVisible(this.iconMore);
        await clickOn(this.iconMore);        
        await waitUntilElementsStops(this.iconMore);
    }
    async clickIconTicket() {
        await scrollToBottom();
        await untilIsVisible(this.iconTicket);
        await clickOn(this.iconTicket);        
        await waitUntilElementsStops(this.iconTicket);
    }

    async getHomeText() {
        return getText(this.homeText);
    }

    async clickOnOpportunity() {
        await untilIsVisible(this.opportunityOption);
        await clickOn(this.opportunityOption);
    }

    async clickMenuMeeting() {
        await untilIsVisible(this.meetingOption);
        await clickOn(this.meetingOption);
    }
}

module.exports = new NavbarPage();