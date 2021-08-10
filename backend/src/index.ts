import 'reflect-metadata';
import { createConnection } from 'typeorm';

createConnection()
  .then(async (connection) => {
    console.log('데이터베이스 연결');
  })
  .catch((error) => console.log(error));
