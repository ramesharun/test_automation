import { default as request } from 'supertest';
import { expect } from 'chai';
import { base } from '../../../lib/urls';
import { btcPairings } from '../../../lib/known_pairings';

describe('Rate API', function() {

  it('Should get a successful response for BTC-LTC pairing', function() {
    return request(base)
      .get('/rate/btc_ltc')
      .expect(200)
      .then(response => {
        expect(response.body).to.exist;
        expect(response.body.pair).to.exist;
        expect(response.body.rate).to.exist;
      });
  });

  it('Pairing batman and ironman should yield an error message in the response body', function() {
    return request(base)
      .get('/rate/batman_ironman')
      .then(response => {
        expect(response.body).to.exist;
        expect(response.body.error).to.exist;
        expect(response.body.error.toLowerCase()).to.include('currently unavailable');
      });
  });

  btcPairings.forEach(pair => {
    it(`BTC paired with ${pair} should return a successful response`, function() {
      return request(base)
        .get(`/rate/btc_${pair}`)
        .expect(200)
        .then(response => {
          expect(response.body).to.exist;
          expect(response.body.error).to.not.exist;
          expect(response.body.pair).to.exist;
          expect(response.body.rate).to.exist;
        });
    });
  });

});