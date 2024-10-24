import User from './user.js';
import Event from './event.js';
import EventPrice from './event_price.js';
import Ticket from './ticket.js';
import QRCode from './qr.js';
import Team from './team.js';
import Match from './match.js';
import Coach from './coach.js';
import { sequelize } from '../config/db.js';
import Registration from './registrations.js'; // Renamed to singular
// import Category from './category.js'; // Uncomment this if Category model exists

// Define relationships
// Teams
Team.hasMany(User, { foreignKey: 'team_id' });
Team.hasMany(Coach, { foreignKey: 'team_id' });

// Users
User.hasMany(Ticket, { foreignKey: 'user_id' });
User.hasMany(Match, { foreignKey: 'user1_id' });
User.hasMany(Match, { foreignKey: 'user2_id' });
User.belongsTo(Team, { foreignKey: 'team_id' });
User.hasMany(Registration, { foreignKey: 'user_id' }); // Renamed to singular
User.belongsToMany(Event, { through: Registration, foreignKey: 'user_id' }); // Renamed to singular

// Registrations
Registration.belongsTo(User, { foreignKey: 'user_id' });
Registration.belongsTo(Event, { foreignKey: 'event_id' });
// Registration.belongsTo(Category, { foreignKey: 'category_id' }); // Uncomment this if Category model exists

// Tickets
Ticket.belongsTo(User, { foreignKey: 'user_id' });
Ticket.belongsTo(Event, { foreignKey: 'event_id' });
Ticket.hasOne(QRCode, { foreignKey: 'ticket_id' });

// Matches
Match.belongsTo(Event, { foreignKey: 'event_id' });
Match.belongsTo(User, { as: 'User1', foreignKey: 'user1_id' });
Match.belongsTo(User, { as: 'User2', foreignKey: 'user2_id' });

// Events
Event.hasMany(EventPrice, { foreignKey: 'event_id' });
Event.hasMany(Ticket, { foreignKey: 'event_id' });
Event.belongsToMany(User, { through: Registration, foreignKey: 'event_id' }); // Renamed to singular

// Event Prices
EventPrice.belongsTo(Event, { foreignKey: 'event_id' });

// QR Codes
QRCode.belongsTo(Ticket, { foreignKey: 'ticket_id' });

// Coaches
Coach.belongsTo(User, { foreignKey: 'user_id' });
Coach.belongsTo(Team, { foreignKey: 'team_id' });

const syncModels = async () => {
  await sequelize.sync({ alter: true });
};

export default {
  sequelize,
  syncModels,
  User,
  Event,
  Team,
  Match,
  EventPrice,
  Ticket,
  QRCode,
  Coach,
  Registration, // Renamed to singular
  // Category, // Uncomment this if Category model exists
};