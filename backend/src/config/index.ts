import dotenv from 'dotenv';

dotenv.config();

export const databaseConfig = {
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT as string) || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  // TODO: 배포시 삭제, false로 해야 if not exist 옵션!
  synchronize: true,
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
