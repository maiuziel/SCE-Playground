
// authentication-service/src/data-access/db.js
import { Sequelize } from 'sequelize';
import 'dotenv/config';
console.log('🔍 Connection string:', process.env.POSTGRES_URI);

export const sequelize = new Sequelize(process.env.POSTGRES_URI, {
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
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    throw err;
  }
}
