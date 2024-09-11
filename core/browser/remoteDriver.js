const { Builder, Browser } = require("selenium-webdriver");
const myLogger = require("../tools/myLogger");

module.exports = class RemoteDriver {

  constructor(configuration) {
    myLogger.debug("Starting remote driver");
    let capabilities = {
      browserName: configuration.remote.browser,
      'bstack:options': {
        "os": configuration.remote.os,
        "osVersion": configuration.remote.osVersion,
        "browserVersion": configuration.remote.browserVersion,
      },
    }

    return (async () => {
      myLogger.info(`Creating Driver with configuration: ${JSON.stringify(capabilities, null, 2)}`)

      return await new Builder().
        usingServer("https://helloworld_Id850G:pscaNWu7bSbEej8Jjyq3@hub-cloud.browserstack.com/wd/hub").
        withCapabilities(capabilities).
        build();
    })();
  }
}
