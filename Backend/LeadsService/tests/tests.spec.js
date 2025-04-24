import chai from 'chai';
import request from 'supertest';
import { app, startTestServer, stopTestServer } from './testServer.js';

const { expect } = chai;
let server;

describe('Leads Service Tests', () => {
  before(async function () {
    this.timeout(10000);
    server = await startTestServer(); // 🟢 מפעיל את השרת
  });

  after(async function () {
    await stopTestServer(); // 🔴 סוגר את השרת אחרי הטסטים
  });

  it('should return all leads', async () => {
    const res = await request(app).get('/leads/getall');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
