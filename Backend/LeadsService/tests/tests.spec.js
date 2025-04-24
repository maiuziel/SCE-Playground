import chai from 'chai';
import request from 'supertest';
import { app, startTestServer } from './testServer.js';

const { expect } = chai;
let server;

describe('Leads Service Tests', () => {
  before(async function () {
    this.timeout(10000);
    server = await startTestServer(); // 🔄 מפעיל את השרת
  });

  after(async function () {
    // ✅ סוגר את השרת אחרי שכל הטסטים סיימו
    if (server && server.close) {
      await new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    }
  });

  it('should return all leads', async () => {
    const res = await request(app).get('/leads/getall');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
