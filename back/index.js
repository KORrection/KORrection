import 'dotenv/config';
import { app } from './src/app.mjs';
import { gracefulShutdown } from './src/utils/serverShutdown.mjs';

const PORT = process.env.SERVER_PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  console.log('SIGINT received.');
  gracefulShutdown(server, 0);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received.');
  gracefulShutdown(server, 0);
});

process.on('uncaughtException', () => {
  console.log('uncaughtException occurs.');
  gracefulShutdown(server, 1);
});
