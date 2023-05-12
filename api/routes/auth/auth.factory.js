const extend = require('util')._extend;
module.exports = ({ bcrypt, jwt, util, validators, appConfig, User, errorCodes }) => {
  async function login(req, res) {
    const return_response = {
      status: null,
      token: null,
      data: null,
      error: null
    };
    const result = validators.loginInput(req.body);
    if (!result.isValid) {
      return_response.message = result.message;
      return res.status(400).json(return_response);
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);
      if(!match) {
        return_response.error = String(error);
        return res.status(400).json(return_response);
      }
      delete user._doc.password;
      return_response.status = 'success';
      return_response.token = await util.generateAuthToken(user);
      return_response.data = user;
      return res.status(200).json(return_response);
    }
    return_response.error = errorCodes[11112];

    return res.status(400).json(return_response);
  }

  function validateJWT(req, res, next) {
    if (!req.headers.authorization) {
      res.status(401).send({
        status: 401,
        message: 'Authorization Token is missing!',
        data: null,
      });
    } else {
      const token = req.headers.authorization.substr(7); //after 'Bearer '
      jwt.verify(token, appConfig.secret, function (err, decoded) {
        if (err) {
          res.status(401).send({
            status: 401,
            message: err.message,
            data: null,
          });
        } else {
          res.locals = {
            user: decoded
          }
          next();
        }
      });
    }
  }

  return {
    login,
    validateJWT,
  };
};
