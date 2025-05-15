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
  },
  status: {
    type: DataTypes.ENUM('open', 'in_progress', 'closed'),
    allowNull: false,
    defaultValue: 'open',
  },
  responseMessage: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  responseMessageRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: 'support_requests',
  timestamps: true,
});
