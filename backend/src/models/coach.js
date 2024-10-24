import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Coach = sequelize.define('Coach', {
  coach_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  team_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
}, {
  tableName: 'coaches',
  timestamps: false
});

export default Coach;