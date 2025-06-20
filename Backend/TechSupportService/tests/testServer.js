// testServer.js
import express from 'express';
import bodyParser from 'body-parser';
import * as techSupportController from '../src/controllers/techSupController.js';
import { initDB } from '../src/data-access/db.js';

const app = express();
app.use(bodyParser.json());

// Define all routes matching techSupController
app.get('/techsupport', techSupportController.getTechSuppot);
app.get('/techsupportfetchuserrequests', techSupportController.getRequestsFromOneUser);
app.get('/gettechsupportforum', techSupportController.getForumMessages);
app.post('/posttechsupportforum', techSupportController.postForumMessage);
app.patch('/techsupportcloserequest', techSupportController.closeSupportRequest);
app.get('/techsupportisagent', techSupportController.isAgent);
app.post('/techsupportaddagent', techSupportController.addAgent);
app.post('/techsupportadd', techSupportController.addTicket);

let server = null;

export async function startTestServer() {
  await initDB();
  return new Promise((resolve) => {
    server = app.listen(13250, () => {
      console.log('[ ✅ ] Tech-Support Service is running at port: 13250');
      resolve(server);
    });
  });
}

export { app };