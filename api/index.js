require("dotenv").config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { appConfig } = require('./setup')();
const apiRouter = require('./routes/api');

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};
// Mongoose setup and config.
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;
// Mongoose connection.
mongoose
  .connect(appConfig.dbPath, options)
  .then(() => {
    console.log(`connected to mongo ${appConfig.dbPath}`);
  })
  .catch((error) => {
    console.error('Error connecting to database', error); //TODO: Use logger
  });

// Express app setup and configuration
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup origin access rules
app.use(function (req, res, next) {
  req.accepts('*/*');
  next();
});

// To allow cross origin access.
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

app.use(apiRouter);
const PORT = process.env.PORT || 5000;

console.log('Environment: ', app.get('env'), '\nPort:', PORT);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
process.on('uncaughtException', err => {
  console.log(`Uncaught Exception: ${err.message}`)
  process.exit(1)
})

