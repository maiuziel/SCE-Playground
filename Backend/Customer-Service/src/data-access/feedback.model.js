import { DataTypes } from 'sequelize';
import { sequelize } from '../data-access/db.js';

export const Feedback = sequelize.define('Feedback', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  supportRequestId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
