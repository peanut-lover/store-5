import { createConnection } from 'typeorm';

export default async function () {
  await createConnection({
    type: 'mysql',
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT as string) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    synchronize: true,
    entities: ['src/entity/**/*.ts'],
  });
}
