const { Builder, Browser } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");
const myLogger = require("../tools/myLogger");


const chromeOptions = new Options

module.exports = class ChromeDriver {
    constructor(configuration) {
        return (async () => {
            myLogger.info(`Creating Driver with configuration: ${JSON.stringify(configuration, null, 2)}`)
            if (configuration.browser.headless) {
                chromeOptions.addArguments("--headless")
            }
            return await new Builder().forBrowser(Browser.CHROME).setChromeOptions(chromeOptions.windowSize(configuration.browser.resolution)).build();
        })();
    }
}
