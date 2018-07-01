require('./mocha');

const psList = require('ps-list');
const nightwatch = require('nightwatch');

const settings = require('../nightwatch.conf');
settings.desiredCapabilities = settings.test_settings.default.desiredCapabilities;
settings.selenium_port = settings.test_settings.default.selenium_port || 4444;
settings.silent = settings.test_settings.default.silent || true;

global.client = nightwatch.initClient(settings);
global.browser = global.client.api();
global.on = browser.page;

before(function() {
  return checkSeleniumServer();
});

afterEach(function(done) {
  browser.end();
  client.start(done);
});

function checkSeleniumServer() {
  return psList()
    .then(data => {
      const commands = data
      // only care about node and java processes
        .filter(d => d.name === 'node' || d.name === 'java')
        // only need the cmd field
        .map(d => d.cmd);

      let seleniumProcessesCount = 0;
      commands.forEach(cmd => {
        if (cmd.includes('selenium-standalone')) {
          seleniumProcessesCount++;
        }
      });

      if (seleniumProcessesCount === 0) {
        // server is not running, kick it off
        console.error('\n\n\nLooks like your selenium server is not running.');
        console.error('To start the selenium server, please run "npm run seleniumStart"');
        console.error('To start the selenium server in the background, please run "npm run seleniumStart &"');
        console.log('\nRun your tests from a new console tab/terminal window to avoid seeing selenium server logs when used this way\n');
        console.log('\nIf you started the selenium server already without using one of the above commands, please ' +
          'add &selenium-standalone=true to the command you used to start your own selenium server\n');
        process.exit(9);
      }
    });
}