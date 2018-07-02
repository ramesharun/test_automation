export default {

  waitForPageToLoad: function() {
    const self = this;
    const requiredLocators = self.getRequiredElements(self);
    if (requiredLocators.length > 0) {
      requiredLocators.forEach(element => {
        if (element.locatorType && element.locatorType === 'xpath') {
          self.api.useXpath();
        } else {
          self.api.useCss();
        }
        self.api.waitForElementVisible(element.locator, 15000);
        // set locator strategy back to css
        self.api.useCss();
      });
    }
    return self;
  },

  getRequiredElements: function(page) {
    let locators;
    try {
      locators = page.locators();
      const requiredElements = [];

      // find all the locators marked with 'requiredForPage'
      Object.keys(locators).forEach(key => {
        let element = locators[key];
        if (!element.groups) return false;
        if (element.groups.includes('requiredForPage')) {
          requiredElements.push(element);
        }
      });

      return requiredElements;
    } catch (e) {
      page.assert.equal(true, false, 'getRequiredElements requires a locators method on the Page Object under test');
    }
  },

  navigateToPage: function() {
    const self = this;
    let routes;
    try {
      routes = self.navigationPath();
      if (!Array.isArray(routes)) {
        return self.assert.equal(true, false, 'A page object\'s navigationPath method must return an Array');
      }
      routes.forEach(route => {
        self.api.page[route.page]()[route.action]();
      });
    } catch (e) {
      self.assert.equal(true, false, 'Could not find navigationPath method on page object: ' + self.name);
    }
    return self;
  },

}