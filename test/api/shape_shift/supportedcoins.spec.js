import { default as request } from 'supertest';
import { expect } from 'chai';
import { base } from '../../../lib/urls';

describe('Supported Coins API', function() {

  it('Should get a successful response', function() {
    return request(base)
      .get('/getcoins')
      .expect(200)
      .then(response => {
        expect(response.body).to.exist;
      });
  });

});