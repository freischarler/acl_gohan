import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
/*
    await queryInterface.createTable('athlete_categories', {
      category_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      athlete_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onDelete: 'CASCADE'
      },
      category: {
        type: Sequelize.UUID,
        references: {
          model: 'categories',
          key: 'category_id',
        },
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
*/

const AthleteCategories = sequelize.define('AthleteCategory', {
    athlete_categories_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    athlete_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    category: {
        type: DataTypes.UUID,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
    }, {
    tableName: 'athlete_categories',
    timestamps: false,
    });

export default AthleteCategories;