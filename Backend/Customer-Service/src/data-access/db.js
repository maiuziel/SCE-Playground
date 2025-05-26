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
    console.log('✅ Database connection established');
    await sequelize.sync({ alter: true });
    console.log('📦 Database synced');
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err);
    throw err;
  }
}

initDb();
