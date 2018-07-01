beforeEach(function() {
  console.log(`~~~~~~~~~~~~~~~~~~~~~Starting test: ${this.currentTest.fullTitle()}`);
});

afterEach(function() {
  console.log(`~~~~~~~~~~~~~~~~~~~~~Finished test: ${this.currentTest.fullTitle()}`);
  if (this.currentTest.state && this.currentTest.state !== 'passed') {
    console.log('...found error:', this.currentTest.err);
  }
});