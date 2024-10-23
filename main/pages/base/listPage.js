const {
  untilIsLocated,
  untilIsVisible,
  sleep,
  reloadPage,
  waitUntilElementsStops,
} = require("../../../core/interactions/conditions");
const {
  clickOn,
  getColumnTexts,
  pressEnter,
  setValue,
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

  resetButton = myByCss('[data-action="reset"]');

  containerOptionsFilters = myByCss(".filters-button ~ .dropdown-menu");
  allOption = myByCss('.filter-menu a[data-name=""]');
  activeOption = myByCss('a[data-name="active"]');
  onlyMyOption = myByCss('input[data-name="onlyMy"]');

  nameTitle = myByCss('th [data-name="name"]');

  actionsButton = myByCss(".actions .actions-button");
  deleteActionsButton = myByCss('.actions [data-action="remove"]');

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

  async clickResetButton() {
    await untilIsVisible(this.resetButton);
    await clickOn(this.resetButton);
  }

  async getColumnTextsName() {
    await sleep(300);
    return getColumnTexts(this.columnName);
  }

  async clickNameTitle() {
    await untilIsVisible(this.nameTitle);
    await clickOn(this.nameTitle);
    await sleep();
  }

  async reloadPage() {
    await reloadPage();
  }

  async clickButtonFilters() {
    await untilIsVisible(this.allButton);
    await clickOn(this.allButton);
    await waitUntilElementsStops(this.containerOptionsFilters);
  }

  async clickOptionAll() {
    await untilIsVisible(this.allOption);
    await clickOn(this.allOption);
    await sleep(300);
  }

  async clickOptionActive() {
    await untilIsVisible(this.activeOption);
    await clickOn(this.activeOption);
    await sleep(200);
  }

  async clickOptionOnlyMy() {
    await untilIsVisible(this.onlyMyOption);
    await clickOn(this.onlyMyOption);
    await sleep(200);
  }

  async clickActionsButton() {
    await untilIsVisible(this.actionsButton);
    await clickOn(this.actionsButton);
  }

  async clickDeleteActionsButton() {
    await untilIsVisible(this.deleteActionsButton);
    await clickOn(this.deleteActionsButton);
  }

  async clickChecked(id) {
    const idRowChecked = myByCss(`[data-id="${id}"] input`);
    await untilIsLocated(idRowChecked);
    await untilIsVisible(idRowChecked);
    await clickOn(idRowChecked);
  }

  async setValueSearch(field) {
    await untilIsVisible(this.searchInput);
    await setValue(this.searchInput, field);
    await sleep(300);
    await pressEnter(this.searchInput);
  }
}

module.exports = ListPage;
