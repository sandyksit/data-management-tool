module.exports = () => {
  const appConfig = {
    secret: process.env.SECRET,
    environment: process.env.ENV,
    dbPath: process.env.MONGO_URI,
    port: process.env.PORT,
  };
  return {
    appConfig,
  };
};
