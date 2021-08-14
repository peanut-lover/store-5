import dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

export const databaseConfig = {
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT as string) || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  // logging: true,
  // TODO: 배포시 삭제!
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export const githubConfig = {
  tokenURL: process.env.OAUTH_GITHUB_TOKEN_URL,
  profileURL: process.env.OAUTH_GITHUB_PROFILE_URL,
};

export const serverConfig = {
  port: process.env.SERVER_PORT,
  origin_url: process.env.ORIGIN_URL,
  session_secret: process.env.SESSION_SECRET,
  cookie_domain: process.env.COOKIE_DOMAIN,
};
