import '../../../lib/nightwatch';

describe('Shape Shift Coins UI', function() {

  it('Should load the homepage', function(done) {
    on.ShapeShift.Homepage()
      .navigateToPage()
      .waitForPageToLoad();

    client.start(done);
  });

});