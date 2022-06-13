import cors from 'cors';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import passport from 'passport';
import passportConfig from './passport/index.mjs';
import cookieParser from 'cookie-parser';
import { swaggerUi, specs } from './swagger.js';
import { userRouter } from './user/userRouter.mjs';
import { postRouter } from './board/postRouter.mjs';

dotenv.config();
const app = express();
passportConfig();

// CORS 에러 방지
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'This is a secret',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

const DB_URL = process.env.MONGODB_URL;
mongoose.connect(DB_URL, {
  dbName: 'project3',
});
const db = mongoose.connection;

db.on('connected', () => console.log('mongoose Connected'));
db.on('error', (error) => console.error('mongoose not Connected' + error));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 기본 페이지
app.get('/', (req, res) => {
  res.send('안녕하세요, 16팀 레이서 프로젝트 API 입니다.');
});

app.use(userRouter);
app.use(postRouter);

export { app };
