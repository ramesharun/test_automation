import '../lib/nightwatch';

describe.skip('Custom Test Suite for Framework Functionality', function() {

  it('Go to Google Home page and load the body', function(done) {
    browser
      .url('https://www.google.com')
      .waitForElementVisible('body', 3000);

    client.start(done);
  });

});