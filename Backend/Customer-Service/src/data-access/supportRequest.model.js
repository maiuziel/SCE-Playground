// Backend/Customer-Service/src/data-access/supportRequest.model.js

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
  clientComment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  
  status: {
    type: DataTypes.ENUM('open', 'in_progress', 'closed'),
    allowNull: false,
    defaultValue: 'open',
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  responseMessageRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
  
}, {
  tableName: 'support_requests',
  timestamps: true,
});
