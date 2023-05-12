module.exports = () => {
  const extend = require('util')._extend;
  const bcrypt = require('bcryptjs');
  const util = require('../../utils/util')();
  const errorCodes = require('../../error_codes')();
  const validators = require('../../validation/validators')();
  const { User } = require('../../models/User');

  return require('./user.factory')({
    extend,
    bcrypt,
    util,
    validators,
    User,
    errorCodes
  });
};
