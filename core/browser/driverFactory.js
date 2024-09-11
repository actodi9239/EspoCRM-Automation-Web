const { WebDriver } = require("selenium-webdriver");
const ChromeDriver = require("./chromeDriver");
const FirefoxDriver = require("./firefoxDriver");
const configuration = require("../../configuration.json")
const myLogger = require("../tools/myLogger");
const RemoteDriver = require("./remoteDriver");

const browserStrategy = {
    chrome: ChromeDriver,
    firefox: FirefoxDriver,
    remote: RemoteDriver,
};


module.exports = class DriverFactory {
    /** @type {WebDriver} */
    static myDriver;

    constructor() {
        return (async () => {
            if (!this.myDriver) {
                myLogger.info("Starting Browser")

                DriverFactory.myDriver = await new browserStrategy[configuration.browser.name.toLowerCase()](configuration);

                if (configuration.browser.maxWindows) {
                    myLogger.info("Maximizing window");
                    await DriverFactory.myDriver.manage().window().maximize();
                }
                if (configuration.browser.timeout) {
                    myLogger.info("Setting timeout", configuration.browser.timeout);
                    await DriverFactory.myDriver.manage().setTimeouts({ implicit: configuration.browser.timeout });
                }
            } else {
                myLogger.error("Driver already exists")
            }
            return DriverFactory.myDriver;
        })();
    }

    static async closeDriver() {
        myLogger.info("Closing browser");
        try {
            await DriverFactory.myDriver.quit();
        } catch (error) {
            myLogger.error("Error closing browser", error);
        }
        DriverFactory.myDriver = null;
        myLogger.info("Browser closed");
    }
}