require('./nightwatch');

const psList = require('ps-list');

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
        console.error('To start the selenium server, please run "npm run startServer"');
        console.error('To start the selenium server in the background, please run "npm run startServer &"');
        console.log('\nRun your tests from a new console tab/terminal window to avoid seeing selenium server logs when used this way\n');
        console.log('\nIf you started the selenium server already without using one of the above commands, please ' +
          'add &selenium-standalone=true to the command you used to start your own selenium server\n');
        process.exit(9);
      }
    });
}

beforeEach(function() {
  return checkSeleniumServer()
    .then(() => {
      console.log(`~~~~~~~~~~~~~~~~~~~~~Starting test: ${this.currentTest.fullTitle()}`);
    });
});

afterEach(function(done) {
  console.log(`~~~~~~~~~~~~~~~~~~~~~Finished test: ${this.currentTest.fullTitle()}`);
  if (this.currentTest.state && this.currentTest.state !== 'passed') {
    console.log('...found error:', this.currentTest.err);
  }
  browser.end();
  client.start(done);
});