// tests/testServer.js
import app from '../src/app.js'; // 🔄 לא לייבא index.js!

let server = null;

export async function startTestServer(port = 9999) {
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Test server running on port ${port}`);
      resolve(server);
    });
    server.on('error', reject);
  });
}

export { app };
