// authentication-service/tests/auth.test.js
process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp); // חייב להיות לפני כל שימוש

import { app, startTestServer } from './testServer.js';

console.log('[DEBUG] chai.request =', typeof chai.request); // חייב להחזיר 'function'

const { expect } = chai;
let server = null;

describe('Customer Service Tests', () => {
    const createdUserEmail = 'test@example.com';

    before(async function () {
        this.timeout(10000);
        server = await startTestServer();
    });

    after(async () => {
        await chai.request(app)
            .delete('/user')
            .query({ email: createdUserEmail });
        server.close();
    });

    it('should sign up a new user successfully', (done) => {
        chai.request(app)
            .post('/signup')
            .send({
                email: createdUserEmail,
                password: '123456',
                firstName: 'Test',
                lastName: 'User'
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                done();
            });
    });
});
