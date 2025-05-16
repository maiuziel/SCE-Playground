import { initDb } from '../src/data-access/db.js';
import express from 'express';


export const app = express();
app.use(express.json());

app.use('/', authRoutes);
app.use(errorHandler);

let server = null;

export async function startTestServer() {
    try {
        await initDb();
        return new Promise((resolve, reject) => {
            server = app.listen(9999, () => {
                console.log('Test server running on port 9999');
                resolve(server);
            });
            server.on('error', (err) => {
                reject(err);
            });
        });
    } catch (dbErr) {
        // If DB fails, reject so Mocha knows setup failed.
        return Promise.reject(dbErr);
    }
}
