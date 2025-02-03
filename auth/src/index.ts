import { app } from './app';
import pool from '../src/config/db';
import 'dotenv/config';


const start = async () => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error('JWT KEY must be defined');
  }

  try {
    await pool.connect();
    console.log('Connected to Postgres database');
  } catch (err) {
    console.error(err);
  }

  app.listen(4000, () => {
    console.log('Listening on port 4000!!!!!!!!');
  });
};

start();