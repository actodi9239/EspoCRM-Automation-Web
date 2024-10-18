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

/**
 * Select elements by XPath.
 * Logs the locator information.
 * 
 * @param {String} xpathSelector 
 * @returns {By}
 */
exports.myByXpath = (xpathSelector) => {
    myLogger.info(`Using XPath selector: ${xpathSelector}`);
    return By.xpath(xpathSelector);  
};
