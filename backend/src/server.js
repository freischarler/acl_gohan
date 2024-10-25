import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import  syncModels  from './models/index.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import qrsRoutes from './routes/qrsRoutes.js';
import teamsRoutes from './routes/teamsRoutes.js';
import eventPriceRoutes from './routes/eventPriceRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import mpRoutes from './routes/mpRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';
import eventParametersRoutes from './routes/eventParametersRoutes.js';
import athleteCategoriesRoutes from './routes/athleteCategoriesRoutes.js';
import weightRoutes from './routes/weightRoutes.js';
import ageRoutes from './routes/ageRoutes.js';
import styleRoutes from './routes/styleRoutes.js';
import rankRoutes from './routes/rankRoutes.js';

import errorHandler from './middlewares/errorHandler.js';

dotenv.config();



const app = express();
app.use(express.json());


console.log('Ambient' + process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
  console.log('CORS-enabled for all origins');
} else {
  app.use(cors({ origin: 'https://your-production-url.com' }));
  console.log('CORS-enabled for a single domain');
}

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An error occurred', error: err.message });
});

connectDB().then(syncModels);

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/qrs', qrsRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/eventPrice', eventPriceRoutes);
app.use('/api/team/:teamId/coach', teamsRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/registration', registrationRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/mp', mpRoutes);
app.use('/api/eventParameters', eventParametersRoutes);
app.use('/api/athleteCategories', athleteCategoriesRoutes);
app.use('/api/weight', weightRoutes);
app.use('/api/age', ageRoutes);
app.use('/api/style', styleRoutes);
app.use('/api/rank', rankRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
