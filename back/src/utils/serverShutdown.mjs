import mongoose from 'mongoose';

const gracefulShutdown = (server, exitCode) => {
  server.close(async () => {
    console.log('server is closed.');
    await mongoose.connection.close();
    console.log('Mongoose connection is disconnected.');
    process.exit(exitCode);
  });
};

export { gracefulShutdown };
