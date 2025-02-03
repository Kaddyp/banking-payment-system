import { app } from './app';
import pool from '../src/config/db';
import 'dotenv/config';
//import { connectKafka } from "./utils/kafka";

const start = async () => {
  try {
    await pool.connect();
    console.log('Connected to Postgres database');
    //await connectKafka(); // Connect Kafka Producer & Consumer  
    app.listen(4005, () => {
      console.log('Listening on port 4005!!!!!!!!');
    });
  } catch (err) {
    console.error(err);
  }
};

start();