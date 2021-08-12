import dotenv from 'dotenv';

dotenv.config();

export const databaseConfig = {
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT as string) || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  // TODO: 배포시 삭제, false로 해야 if not exist 옵션!
  synchronize: false,
};

export const githubConfig = {
  tokenURL: process.env.OAUTH_GITHUB_TOKEN_URL,
  profileURL: process.env.OAUTH_GITHUB_PROFILE_URL,
};
