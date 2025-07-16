import { DataTypes } from 'sequelize';
import { sequelize } from './db.js';

export const Notification = sequelize.define('Notification', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  supportRequestId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
});
