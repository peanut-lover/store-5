import { createConnection } from 'typeorm';
import { databaseConfig } from './config';

export default async function () {
  await createConnection({
    type: 'mysql',
    ...databaseConfig,
    synchronize: false,
    entities: ['src/entity/**/*.ts'],
  });
}
