module.exports = () => {
  const validator = require('validator');

  function loginInput(data) {
    const response = {
      message: {},
      isValid: true,
    };
    data.email = data.email ? data.email : '';
    if (!validator.isEmail(data.email)) {
      response['message']['email'] = 'Invalid email!';
    }
    if (!data.email) {
      response['message']['email'] = 'Email field is required!';
    }
    if (!data.password) {
      response['message']['password'] = 'Password field is required!';
    }
    if (Object.keys(response['message']).length) {
      response['isValid'] = false;
    }
    return response;
  }

  function registerInput(data) {
    const response = {
      message: {},
      isValid: true,
    };
    data.email = data.email ? data.email : '';
    if (!validator.isEmail(data.email)) {
      response['message']['email'] = 'Invalid email!';
    }
    if (!data.email) {
      response['message']['email'] = 'Email field is required!';
    }
    if (!data.password) {
      response['message']['password'] = 'Password field is required!';
    }
    if (!data.name) {
      response['message']['name'] = 'Name field is required!';
    }

    if (Object.keys(response['message']).length) {
      response['isValid'] = false;
    }
    return response;
  }
 
  return {
    loginInput,
    registerInput,
  };
};
