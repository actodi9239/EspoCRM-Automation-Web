const {
  untilIsLocated,
  untilIsVisible,
  sleep,
} = require("../../../core/interactions/conditions");
const {
  clickOn,
  getColumnTexts,
} = require("../../../core/interactions/action");
const { myByCss } = require("../../../core/interactions/myBy");

class ListPage {
  createButton = myByCss('[data-name="create"]');
  searchInput = myByCss(' [data-name="textFilter"]');
  allButton = myByCss('.filters-button[data-toggle="dropdown"]');
  lupaIcon = myByCss('.container [data-action="search"]');
  moreFilter = myByCss(".add-filter-button");
  checkIcon = myByCss('th [type="checkbox"]');
  columnName = myByCss('td[data-name="name"] > a');
  downArrow = myByCss('.settings-container [data-toggle="dropdown"]');

  nameTitle = myByCss('th [data-name="name"]');

  async isVisible() {
    await untilIsLocated(this.createButton);
    await untilIsLocated(this.searchInput);
    await untilIsLocated(this.allButton);
    await untilIsLocated(this.moreFilter);
    await untilIsLocated(this.checkIcon);
  }

  async clickCreateButton() {
    await untilIsVisible(this.createButton);
    await clickOn(this.createButton);
  }

  async getColumnTextsName() {
    return getColumnTexts(this.columnName);
  }

  async clickNameTitle() {
    await untilIsVisible(this.nameTitle);
    await clickOn(this.nameTitle);
    await sleep();
  }
}

module.exports = ListPage;
