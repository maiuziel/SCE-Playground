// tests/leads.test.js
import chai from 'chai';
import request from 'supertest'; // ⬅️ במקום chai-http
import { app, startTestServer } from './testServer.js';

const { expect } = chai;
let server;

describe('Leads Service Testss', () => {
  before(async function () {
    this.timeout(10000);
    server = await startTestServer();
  });

  after(async () => {
    server.close();
  });

  it('should return all leads', async () => {
    const res = await request(app).get('/leads/getall');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
