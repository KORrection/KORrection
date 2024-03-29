import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import passport from 'passport';
import passportConfig from './passport/index.mjs';
import cookieParser from 'cookie-parser';
import { swaggerUi, specs } from './swagger.js';
import { userRouter } from './user/userRouter.mjs';
import { postRouter } from './post/postRouter.mjs';
import { gecClientRouter } from './gecClient/gecClientRouter.mjs';
import { commentRouter } from './comment/commentRouter.mjs';
import { postVoteRouter } from './postVote/postVoteRouter.mjs';
import { loginRequired } from './middleware/loginRequired.mjs';
import { quizRouter } from './quiz/quizRouter.mjs';

process.env.NODE_ENV =
  process.env.NODE_ENV && process.env.NODE_ENV.trim().toLowerCase() == 'production' ? 'production' : 'development';

dotenv.config();
const app = express();

passportConfig();

// CORS 에러 방지
const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

// app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(passport.initialize());

const DB_URL = process.env.MONGODB_URL;
mongoose.connect(DB_URL, {
  dbName: 'project3',
});
const db = mongoose.connection;

db.on('connected', () => console.log('mongoose Connected'));
db.on('error', (error) => console.error(`mongoose not Connected: ${error}`));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/uploads', express.static('uploads'));

// 기본 페이지
app.get('/', (req, res) => {
  res.send('안녕하세요, 16팀 레이서 프로젝트 API 입니다.');
});

const router = express.Router();

router.use(userRouter);
router.use(gecClientRouter);
router.use(quizRouter);
router.use(loginRequired, postRouter);
router.use(loginRequired, commentRouter);
router.use(loginRequired, postVoteRouter);

if (process.env.NODE_ENV === 'development') {
  app.use('/', router);
} else {
  app.use('/api', router);
}

export { app };
