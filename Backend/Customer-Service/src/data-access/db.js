import dotenv from 'dotenv';
dotenv.config();
console.log('DB_CONNECTION_STRING =', process.env.DB_CONNECTION_STRING);
import 'dotenv/config';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    process.env.DB_CONNECTION_STRING,
    {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false }
        }
    }
);

export async function initDb() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        throw err;
    }
}
