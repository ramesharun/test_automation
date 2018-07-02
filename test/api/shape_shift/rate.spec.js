import { default as request } from 'supertest';
import { default as Promise } from 'bluebird';
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

  it('Pairing batman and ironman should yield an error message in the response body', function() {
    return request(base)
      .get('/rate/batman_ironman')
      .then(response => {
        expect(response.body).to.exist;
        expect(response.body.error).to.exist;
        expect(response.body.error.toLowerCase()).to.include('currently unavailable');
      });
  });

  it('BTC paired with currently available coins should return successful responses', function() {
    return request(base)
      .get('/getcoins')
      .then(response => {
        const coins = [];
        const body = response.body;
        Object.keys(body).forEach(coin => {
          if (body[coin].status === 'available') {
            coins.push(coin.toLowerCase());
          }
        });
        return coins.filter(coin => coin !== 'btc');
      })
      .then(coins => {
        Promise.each(coins, coin => {
          console.log(`Making request to /rate/btc_${coin}`);
          return request(base)
            .get(`/rate/btc_${coin}`)
            .then(response => {
              expect(response.body).to.exist;
              expect(response.body.error).to.not.exist;
              expect(response.body.rate).to.exist;
              expect(response.body.pair).to.exist;
            });
        });
      });
  });
});