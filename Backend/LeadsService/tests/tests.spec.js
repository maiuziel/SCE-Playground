import chai from 'chai';
import chaiHttp from 'chai-http';
import { app, startTestServer } from './testServer.js';

const { expect } = chai;
chai.use(chaiHttp);

let server;

describe('Leads API Tests', () => {
  before(async () => {
    server = await startTestServer();
  });

  after(async () => {
    server.close();
  });

  it('should return all leads', async () => {
    const res = await chai.request(app).get('/leads/getall');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
