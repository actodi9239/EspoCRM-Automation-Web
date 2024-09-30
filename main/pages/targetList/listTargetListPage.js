const { untilIsLocated, untilIsVisible } = require("../../../core/interactions/conditions");
const { clickOn, getColumnTexts } = require("../../../core/interactions/action");
const { myByCss } = require("../../../core/interactions/myBy");
const ListPage = require('../base/listPage');


class ListTargetListPage extends ListPage {
    
}

module.exports = new ListTargetListPage(); 