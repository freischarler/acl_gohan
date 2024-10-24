import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Event from './event.js';
import User from './user.js';
import Team from './team.js';

const Match = sequelize.define('matches', {
  match_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  event_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
        model: Event, // name of your user model
        key: 'event_id'
      }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  style: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  user1_id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'user_id',
    },
    allowNull: true,
  },
  team1_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'teams', // name of your academy model
      key: 'team_id'
    }
  },
  user2_id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'user_id',
    },
    allowNull: true,
  },
  team2_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'teams', // name of your academy model
      key: 'team_id'
    }
  },
  points1: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  points2: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  win_by: {
    type: DataTypes.STRING,
    allowNull: true
  },
  winner_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  winner_points: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  losser_points: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
},{
    tableName: 'matches',
    timestamps: false,
});

export default Match;