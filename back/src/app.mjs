import cors from 'cors';
import express from 'express';
import { postRouter } from './board/post-router.mjs';
import { swaggerUi, specs } from './swagger.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.MONGODB_URL);

const DB_URL =
  process.env.MONGODB_URL || 'MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.';
mongoose.connect(
  DB_URL
  //   ,
  //   {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   dbName: 'project3',
  // }
);
const db = mongoose.connection;

db.on('connected', () => console.log('정상적으로 MongoDB 서버에 연결되었습니다.  '));
db.on('error', (err) => console.error(err));

const app = express();

// CORS 에러 방지
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 기본 페이지
app.get('/', (req, res) => {
  res.send('안녕하세요, 16팀 레이서 프로젝트 API 입니다.');
});
app.use('/board', postRouter);

export { app };
