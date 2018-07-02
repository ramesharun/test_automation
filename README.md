# Test Automation Framework
Built with:
* Node.js
* Nightwatch.js
* Allure Reporting
* Mocha.js

### Installation

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
1. Edit `test/sample.spec.js`: remove the `.skip` from the describe statement
2. Run `mocha test/sample.spec.js`
  * A chrome browser should launch then quickly shutdown
  * After the script finished you should see a `allure-results` directory in the root of your local copy of this project
3. Run `npm run allure:build`
4. Run `npm run allure:open`
  * A new tab in your default browser should launch the Allure Report
  * To kill the Allure server: (from the same terminal) `CTRL+C`
  
