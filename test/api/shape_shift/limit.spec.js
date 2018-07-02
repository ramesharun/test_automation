import { default as request } from 'supertest';
import { expect } from 'chai';
import { base } from '../../../lib/urls';

describe('Limit API', function() {

  it('Should get a successful response for BTC-LTC pairing', function() {
    return request(base)
      .get('/limit/btc_ltc')
      .expect(200)
      .then(response => {
        expect(response.body).to.exist;
        expect(response.body.error).to.not.exist;
        expect(response.body.pair).to.eql('btc_ltc');
        expect(response.body.limit).to.exist;
      });
  });

  it('Pairing batman and ironman should yield an error message', function() {
    return request(base)
      .get('/limit/batman_ironman')
      .then(response => {
        expect(response.body).to.exist;
        expect(response.body.error).to.eql('Unknown pair')
      });
  });
});