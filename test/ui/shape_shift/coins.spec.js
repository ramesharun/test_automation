import '../../../lib/nightwatch';
import { default as request } from 'supertest';

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

  it('Quick asset trade should display current rate for the selected pair', function(done) {
    on.ShapeShift.Homepage()
      .navigateToPage()
      .waitForPageToLoad()
      .getNextFormPage(pair => {
        console.log('Pair found', pair);
        on.ShapeShift.Homepage()
          .assertMarketInfoRateIsAccurateOnScreen(pair);
      });

    client.start(done);
  });

});