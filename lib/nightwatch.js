const nightwatch = require('nightwatch');

const settings = require('../nightwatch.conf');
settings.desiredCapabilities = settings.test_settings.default.desiredCapabilities;
settings.selenium_port = settings.test_settings.default.selenium_port || 4444;
settings.silent = settings.test_settings.default.silent || true;

global.client = nightwatch.initClient(settings);
global.browser = global.client.api();
global.on = browser.page;