import 'dotenv/config';
import mongoose from 'mongoose';
import { app } from './src/app.mjs';

const PORT = process.env.SERVER_PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  console.log('SIGINT received.');
  server.close(() => {
    console.log('server is closed.');
    mongoose.connection.close(false, () => {
      console.log('Mongoose connection is disconnected. ');
      process.exit(0);
    });
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received.');
  server.close(() => {
    console.log('server is closed.');
    mongoose.connection.close(false, () => {
      console.log('Mongoose connection is disconnected. ');
      process.exit(0);
    });
  });
});

process.on('uncaughtException', () => {
  console.log('uncaughtException occurs.');
  server.close(() => {
    console.log('server is closed.');
    mongoose.connection.close(false, () => {
      console.log('Mongoose connection is disconnected. ');
      process.exit(1);
    });
  });
});
