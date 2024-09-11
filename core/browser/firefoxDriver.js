const { Builder, Browser } = require("selenium-webdriver");
const myLogger = require("../tools/myLogger");
const { Options } = require("selenium-webdriver/firefox");


module.exports = class FirefoxDriver {
    constructor(configuration) {
        return (async () => {
            myLogger.info(`Creating Driver with configuration: ${JSON.stringify(configuration, null, 2)}`);

            const firefoxOptions = new Options();
            if (configuration.browser.headless) {
                firefoxOptions.headless();
            }
            if (configuration.browser.resolution) {
                firefoxOptions.windowSize({
                    width: configuration.browser.resolution.width,
                    height: configuration.browser.resolution.height
                });
            }

            try {
                const driver = await new Builder()
                    .forBrowser(Browser.FIREFOX)
                    .setFirefoxOptions(firefoxOptions)
                    .build();
                return driver;
            } catch (error) {
                myLogger.error("Error creating Firefox driver", error);
                throw error;
            }
        })();
    }
}