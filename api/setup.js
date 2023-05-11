module.exports = () => {
  const appConfig = {
    environment: process.env.ENV,
    port: process.env.PORT,
  };
  return {
    appConfig,
  };
};
