import '../../../lib/nightwatch';

describe('Shape Shift Coins UI', function() {

  it('Should load the homepage TAGS: @smoke', function(done) {
    on.ShapeShift.Homepage()
      .navigateToPage()
      .waitForPageToLoad();

    client.start(done);
  });

  it('Clicking continue on the asset trader form should retain the pairing TAGS: @smoke', function(done) {
    on.ShapeShift.Homepage()
      .navigateToPage()
      .waitForPageToLoad()
      .assertCoinsCarriedOverAfterClickingContinue();

    client.start(done);
  });

});