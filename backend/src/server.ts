import database from './database';
import dotenv from 'dotenv';

dotenv.config();

database().then(() => {
  console.log('db connection');
});
