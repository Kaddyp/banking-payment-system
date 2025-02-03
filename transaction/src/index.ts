import { app } from './app';
import pool from '../src/config/db';
import 'dotenv/config';


const start = async () => {
  try {
    await pool.connect();
    console.log('Connected to Postgres database');
  } catch (err) {
    console.error(err);
  }

  app.listen(4005, () => {
    console.log('Listening on port 4005!!!!!!!!');
  });
};

start();