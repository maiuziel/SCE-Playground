// authentication-service/src/data-access/supportRequest.model.js
import { DataTypes } from 'sequelize';
import { sequelize } from './db.js';

export const SupportRequest = sequelize.define('SupportRequest', {
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});
