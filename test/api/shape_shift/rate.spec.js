import { default as request } from 'supertest';
import { expect } from 'chai';
import { base } from '../../../lib/urls';

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

});