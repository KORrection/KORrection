const server = {
  GOOGLE_CALLBACK_URL: () =>
    process.env.NODE_ENV === 'production' ? process.env.GOOGLE_CALLBACK_URL : 'http://localhost:5001/google/callback',
  MAIN_URL: () => (process.env.NODE_ENV === 'production' ? process.env.MAIN_URL : 'http://localhost:5001'),
};

export { server };
