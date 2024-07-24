import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import routes from './routes/index.js';
import db from './models/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'bezkoder-session',
  keys: ['COOKIE_SECRET'],
  httpOnly: true,
  sameSite: 'strict',
}));

app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}...`));

(async () => {
  try {
    await db.sequelize.sync(); // Remove force: true to prevent table drop
    console.log('Database synced');
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
})();
