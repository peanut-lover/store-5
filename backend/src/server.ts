import express from 'express';
import cors from 'cors';
import session from 'express-session';
import database from './database';
import dotenv from 'dotenv';
import errorControl from './middlewares/error.middleware';

dotenv.config();

const PORT = 8080; // TODO: PORT 환경변수로 빼기

const server = express();
server.use(express.json());

// TODO: origin 환경변수 설정하기, 세션 사용시 credentials: true
server.use(cors());

server.use(
  session({
    // HttpOnly: true,  https로 사용시에 옵션 주기
    secret: '123124123', // TODO: secret 환경변수 빼기
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24000 * 60 * 60 },
    // cookie: { maxAge: 24000 * 60 * 60, domain: serverConfig.cookie_domain }, TODO: 배포 시 domain 추가해야함
  })
);

server.use(errorControl);

server.listen(PORT, async () => {
  console.log('server is running : ', PORT);
  await database();
  console.log('db connection');
});
