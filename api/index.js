require("dotenv").config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { appConfig } = require('./setup')();
const apiRouter = require('./routes/api');

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

