module.exports = ({ extend, bcrypt, util, validators, User, errorCodes }) => {
  async function register(req, res) {
    const return_response = {
      token: null,
      message: null,
      data: null,
      error: null
    };
    const result = validators.registerInput(req.body);
    if (!result.isValid) {
      return_response.error = result.message;
      return res.status(400).json(return_response);
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return_response.error = errorCodes[11111];
      return res.status(400).json(return_response);
    }
    const opt = extend({}, req.body);
    const salt = await bcrypt.genSaltSync(10);
    opt.password = await bcrypt.hashSync(opt.password, salt);
    try {
      user = new User(opt);
      user = await user.save();
    } catch (error) {
      return_response.error = errorCodes[11114];
      return res.status(400).json(return_response);
    }
    return_response['token'] = await util.generateAuthToken(user);
    return_response['message'] = 'success';
    delete user._doc['password'];
    return_response['data'] = user;
    return res.status(201).json(return_response);
  }

  async function getUsers(req, res) {
    const return_response = {
      status: null,
      message: null,
      data: null,
      error: null
    };
    User.find({})
      .select('-password')
      .populate('role')
      .exec(function (error, doc) {
        if (error) {
          return_response['status'] = 400;
          return_response.error = errorCodes[11114];
          return res.status(400).json(return_response);
        } else {
          return_response['status'] = 200;
          return_response['message'] = 'success';
          return_response['data'] = doc;
        }
        res.status(return_response['status']).json(return_response);
      });
  }

  async function getUserById(req, res) {
    const return_response = {
      status: null,
      message: null,
      data: null,
      error: null,
    };
    const { user } = res.locals
    User.find({ _id: user._id })
      .select('-password')
      .exec(function (error, doc) {
        if (error) {
          return_response['status'] = 400;
          return_response.error = errorCodes[11114];
          return res.status(400).json(return_response);
        } else {
          return_response['status'] = 200;
          return_response['message'] = 'success';
          return_response['data'] = doc && doc[0];
        }
        return res.status(return_response['status']).json(return_response);
      });
  }

  async function deleteUser(req, res) {
    const return_response = {
      status: null,
      message: null,
      data: null,
      error: null
    };
    User.deleteOne({ _id: req.params._id }, function (error, doc) {
      if (error) {
        return_response['status'] = 400;
        return_response.error = errorCodes[11114];
        return res.status(400).json(return_response);
      } else {
        return_response['status'] = 200;
        return_response['message'] = 'success';
        return_response['data'] = doc;
      }
     return res.status(return_response['status']).json(return_response);
    });
  }

  async function putUser(req, res) {
    const return_response = {
      status: null,
      message: null,
      data: null,
    };
    const opt = extend({}, req.body);
    User.findOneAndUpdate({ _id: req.params._id }, opt, { new: true }, function (error, doc) {
      if (error) {
        return_response['status'] = 400;
        return_response.error = errorCodes[11114];
        return res.status(400).json(return_response);
      } else {
        return_response['status'] = 200;
        return_response['message'] = 'success';
        return_response['data'] = doc;
      }
     return res.status(return_response['status']).json(return_response);
    });
  }

  return {
    register,
    getUsers,
    putUser,
    getUserById,
    deleteUser,
  };
};
