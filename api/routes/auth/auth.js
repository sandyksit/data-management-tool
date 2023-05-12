module.exports = () => {
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  const util = require('../../utils/util')();
  const errorCodes = require('../../error_codes')();
  const validators = require('../../validation/validators')();
  const { appConfig } = require('../../setup')();
  const { User } = require('../../models/User');

  return require('./auth.factory')({
    bcrypt,
    jwt,
    util,
    validators,
    appConfig,
    User,
    errorCodes
  });
};
