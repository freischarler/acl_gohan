// models/registrations.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

/*

    await queryInterface.createTable('registrations', {
      registration_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        },
      },
      event_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'events',
          key: 'event_id',
        },
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'category_id',
        },
      },
      team_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'team_id',
        },
      },
      weight_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'weights',
          key: 'weight_id',
        },
      },
      age_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'ages',
          key: 'age_id',
        },
      },
      style_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'styles',
          key: 'style_id',
        },
      },
      status: {
        type: Sequelize.STRING(50),
        defaultValue: 'pending',
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      registration_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

*/

const Registration = sequelize.define('Registration', {
  registration_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id',
    },
  },
  event_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'events',
      key: 'event_id',
    },
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'category_id',
    },
  },
  team_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'team_id',
    },
  },
  weight_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'weights',
      key: 'weight_id',
    },
  },
  age_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'ages',
      key: 'age_id',
    },
  },
  style_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'styles',
      key: 'style_id',
    },
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'pending',
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  registration_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  reference_id: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'registrations',
  timestamps: false,
});

export default Registration;