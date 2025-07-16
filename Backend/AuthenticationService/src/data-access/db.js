// authentication-service/src/data-access/db.js
import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Important for Render (no cert validation)
    },
  }
});

export async function initDb() {
  try {
    await sequelize.authenticate();
    // Sync all defined models
    await sequelize.sync({ alter: true });
    console.log('✅ Database connected and synced');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    throw err;
  }
}
