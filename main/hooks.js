const DriverFactory = require('../core/browser/driverFactory');
const myLogger = require('../core/tools/myLogger');
const testConfig = require('../testConfig.json');
const { allure } = require("allure-mocha/runtime");
const fs = require("fs");

exports.myBefore = async () => {
    this.driver = await new DriverFactory();
    await this.driver.get(testConfig.baseUrl);
};

exports.myAfter = async () => {
    await DriverFactory.closeDriver();
};


exports.myAfterScreen = async function () {
    if (this.currentTest && this.currentTest.state === 'failed') {
        try {
            const screenshot = await DriverFactory.myDriver.takeScreenshot();
            allure.attachment('Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
            console.log('Screenshot attached to Allure report.');
        } catch (err) {
            console.error('Error taking screenshot:', err);
        }
    }
};