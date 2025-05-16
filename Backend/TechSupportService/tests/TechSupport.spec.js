// tests/TechSupport.spec.js
process.env.NODE_ENV = 'test';

import chaiImport from 'chai';
import chaiHttp from 'chai-http';
import { app, startTestServer } from './testServer.js';

const chai = chaiImport.default || chaiImport; 
const { expect } = chai;
chai.use(chaiHttp);

let server = null;
let createdTicketId = -1;

const testTicket = {
  type: 1,
  name: 'Test User',
  email: 'test@example.com',
  category: 'Other',
  description: 'This is a test ticket',
  images: [null, null, null, null],
};

const testForumMessage = {
  pid: createdTicketId,
  name: 'Ariel',
  content: 'This is a test forum message',
};

describe('🧪 TechSupport Backend Full API Test Suite', () => {
  before(async function () {
    this.timeout(10000);
    server = await startTestServer();
  });

  after(async () => {
    server.close();
  });

  it('POST /techsupportadd → should create a new ticket', (done) => {
    chai
      .request(app)
      .post('/techsupportadd')
      .send(testTicket) 
      .end((err, res) => {
        expect(res).to.have.status(200); 
        expect(res.body).to.have.property('ticketId');
        createdTicketId = res.body.ticketId;
        done();
      });
  });

  it('GET /techsupport → should return all tickets including the new one', (done) => {
    chai
      .request(app)
      .get('/techsupport')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('GET /techsupportfetchuserrequests → should return tickets for specific user', (done) => {
    chai
      .request(app)
      .get('/techsupportfetchuserrequests')
      .query({ email: testTicket.email })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.userRequest).to.be.an('array');
        done();
      });
  });

  it('POST /posttechsupportforum → user sends a forum message', (done) => {
    chai
      .request(app)
      .post('/posttechsupportforum')
      .query(testForumMessage)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('GET /gettechsupportforum → should return forum messages for the ticket', (done) => {
    chai
      .request(app)
      .get('/gettechsupportforum')
      .query({ pid: createdTicketId })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.messages).to.be.an('array');
        done();
      });
  });

  it('PATCH /techsupportcloserequest → should close the ticket', (done) => {
    chai
      .request(app)
      .patch('/techsupportcloserequest')
      .query({ id: createdTicketId }) 
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success', true);
        done();
      });
  });

  it('GET /techsupportisagent → should return false for non-existing agent', (done) => {
    chai
      .request(app)
      .get('/techsupportisagent')
      .query({ email: 'fakeagent@example.com' })
      .end((err, res) => {
        expect(res.body.agent).to.be.false;
        done();
      });
  });

  it('POST /techsupportaddagent → should add a new agent', (done) => {
    chai
      .request(app)
      .post('/techsupportaddagent')
      .query({ email: 'newagent@example.com' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('GET /techsupportisagent → should return true for added agent', (done) => {
    chai
      .request(app)
      .get('/techsupportisagent')
      .query({ email: 'newagent@example.com' })
      .end((err, res) => {
        expect(res.body.agent).to.be.true;
        done();
      });
  });
});
