const { By } = require('selenium-webdriver');
const myLogger = require("../tools/myLogger")


/**
 * Select elements by CSS selector.
 * Logs the locator information.
 * 
 * @param {String} cssSelector 
 * @returns {By} 
 */
exports.myByCss = (cssSelector) => {
    myLogger.info(`Using CSS selector: ${cssSelector}`);
    return By.css(cssSelector); 
};