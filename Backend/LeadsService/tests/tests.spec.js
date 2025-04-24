// leads-service/tests/leads.test.js
process.env.NODE_ENV = 'test';

import chai from 'chai';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const chaiHttp = require('chai-http');

import { app, startTestServer } from './testServer.js';

const { expect } = chai;
chai.use(chaiHttp);

let server = null;

describe('Leads Service Tests', () => {
  before(async function() {
    this.timeout(10000); // הגדרת טיימאאוט למניעת כשל בהתחברות לדאטאבייס
    server = await startTestServer();
    console.log("Test server is running");
  });

  after(async () => {
    server.close();
  });

  it('should return all leads', (done) => {
    chai.request(app)
      .get('/getall')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
