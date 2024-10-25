import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { hash } from 'bcrypt';

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  team_id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: 'a494ac40-d362-441e-8fb8-f64460084c19',
    references: {
      model: 'teams',
      key: 'team_id',
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'genders',
      key: 'gender_id',
    },
  },
  born: {
    type: DataTypes.DATE,
    allowNull: false
  },
  url_image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'roles',
      key: 'roles_id',
    },
  },
  reset_token: {
    type: DataTypes.STRING,
    allowNull: true
  },
  reset_token_expires: {
    type: DataTypes.DATE,
    allowNull: true
  },
}, {
  hooks: {
    beforeCreate: async (newUserData) => {
      newUserData.password_hash = await hash(newUserData.password_hash, 10);
      return newUserData;
    },
    /*beforeUpdate: async (updatedUserData) => {
      if (updatedUserData.password_new) {
          updatedUserData.password_hash = await hash(updatedUserData.password_new, 10);
      }
      return updatedUserData;
  },*/
  },
  tableName: 'users',
  timestamps: false
});

export default User;

