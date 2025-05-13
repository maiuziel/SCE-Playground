import { Sequelize } from 'sequelize';
import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(process.env.POSTGRES_URI, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    }
});

export async function initDb() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        throw err;
    }
}
