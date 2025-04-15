// products-service/src/data-access/productsModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from './productsDataAccess.js';

export const Products = sequelize.define('Products', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
}, {
  tableName: 'products',
  timestamps: true
});
