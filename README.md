# Test Automation Framework
Built with:
* Node.js
* Nightwatch.js
* Allure Reporting
* Mocha.js

### Installation
* Requirements:
  * Java 8+
  * Node 8+
  * Git

1. Clone this repo:
```shell
git clone https://github.com/wattersnathen/test_automation.git
```

2. Install the dependencies:
```shell
npm install
```

3. Install the selenium server:
```shell
npm run selenium:install
```

To test your installation:
1. Run `npm run selenium:start`
2. Edit `test/sample.spec.js`: remove the `.skip` from the describe statement
3. Open a new terminal/console tab/window
4. From the new terminal/console `mocha test/sample.spec.js`
  * A chrome browser should launch then quickly shutdown
  * After the script finished you should see a `allure-results` directory in the root of your local copy of this project
5. Run `npm run allure:build`
6. Run `npm run allure:open`
  * A new tab in your default browser should launch the Allure Report
  * To kill the Allure server: (from the same terminal) `CTRL+C`

### Defaults
* Built on an Apple OSx
* Chrome is the default browser used in UI tests
* Mocha reporter is defaulted to use `mocha-allure-reporter`. To override, add `--reporter <choice>` to your mocha command
* Standard mocha was used in conjunction with Nightwatch. See (http://nightwatchjs.org/guide#using-mocha) and find the "Using the standard mocha" section to read more
  * This was chosen because standard mocha has more plugins available and reduces the context switch between running UI from non-UI test scripts. You'd need to use different commands to run UI tests otherwise
  
### Agenda (To-Dos)
- [ ] Build pipeline integration with GitHub
- [ ] Browser comparability support
- [ ] SauceLabs/BrowserStack Integration
- [ ] Test instructions on Windows/Linux
- [ ] Docker integration