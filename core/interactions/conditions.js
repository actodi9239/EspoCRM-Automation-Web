const { By, until, WebElement } = require("selenium-webdriver")
const myLogger = require("../tools/myLogger")
const DriverFactory = require("../browser/driverFactory")

/**
 * 
 * @param {By} locator 
 */
exports.untilIsLocated = async (locator) => {
    myLogger.info(`Checking element is located ${locator.value}`)
    await DriverFactory.myDriver.wait(until.elementLocated(locator));
}

/**
 * 
 */
exports.reloadPage = async () => {
    myLogger.info("Reloading the current page");
    await DriverFactory.myDriver.navigate().refresh(); 
};

/**
 * 
 * @param {By} locator 
 * @returns {Promise<WebElement>} 
 */
exports.myFindElement = async (locator) => {
    myLogger.info(`Finding element with locator: ${locator.value}`);
    const element = await DriverFactory.myDriver.findElement(locator);
    return element;
};

/**
 * 
 * @param {By} locator 
 * @returns {Promise<WebElement[]>} 
 */
exports.myFindElements = async (locator) => {
    myLogger.info(`Finding elements with locator: ${locator.value}`);
    const elements = await DriverFactory.myDriver.findElements(locator);
    myLogger.info(`Found ${elements.length} elements with locator: ${locator.value}`);
    return elements;
};

/**
 * 
 * @param {By} locator 
 */
exports.untilIsVisible = async (locator) => {
    const element = await this.myFindElement(locator);
    myLogger.info(`Checking if element is visible with locator: ${locator.value}`);
    await DriverFactory.myDriver.wait(until.elementIsVisible(element));
};

/**
 * 
 * @param {By} locator 
 */
exports.waitUntilElementsStops = async (locator) => {
    myLogger.info(`Waiting until the element stops moving ${locator.value}`);
    let previousPosition = {};
    await DriverFactory.myDriver.wait(async () => {
        const element = await this.myFindElement(locator);
        const currentPosition = await element.getRect();
        myLogger.info(`Current position: ${JSON.stringify(currentPosition)}`);
        const hasStopped =
            previousPosition.x === currentPosition.x &&
            previousPosition.y === currentPosition.y;

        previousPosition = currentPosition;
        return hasStopped;
    });
    myLogger.info(`Element ${locator.value} has stopped moving`);
}

/**
 * Scroll to the bottom of the page.
 */
exports.scrollToBottom = async () => {
    await DriverFactory.myDriver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
    myLogger.info('Scrolled to the bottom of the page');
};

/**
 * 
 * @returns {Promise<string>} 
 */
exports.getCurrentUrlId = async () => {
    myLogger.info('Fetching the current URL');
    const url = await DriverFactory.myDriver.getCurrentUrl();
    myLogger.info(`Current URL: ${url}`);

    const match = url.match(/\/([^\/]+)\/?$/);
    const fragment = match ? match[1] : '';

    myLogger.info(`Extracted URL fragment: ${fragment}`);
    return fragment;
};

/**
 * 
 * @param {number} ms -
 */
exports.sleep = async (ms = 900) => {
    myLogger.info(`Waiting for ${ms} milliseconds`);
    return new Promise(resolve => setTimeout(resolve, ms));
};
