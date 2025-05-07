// products-service/tests/product.test.js
/* eslint-env mocha */
process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import { app, startTestServer } from './testProducts.js';

const { expect } = chai;
chai.use(chaiHttp);
let server = null;

describe('Product Service Tests', () => {
  const productId = 15;

  before(async function() {
    this.timeout(10000);
    server = await startTestServer();
    console.log('Product tests is running');
  });

  after(async () => {
    server.close();
  });

  it('should read a product by ID', (done) => {
   chai.request.execute(app)
      .get(`/read-product/${productId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id').equal(productId);
        expect(res.body).to.have.property('name').equal('eee');
        expect(res.body).to.have.property('category').equal('abcd');
        expect(res.body).to.have.property('description').to.be.null;
        expect(res.body).to.have.property('price').to.be.null;
        expect(res.body).to.have.property('datasheet_url').to.be.null;
        expect(res.body).to.have.property('createdAt');
        expect(res.body).to.have.property('updatedAt');
        done();
      });
  });
});
