const express = require('express'),
  apiRouter = express.Router(),
  auth = require('./auth/auth')(),
  user = require('./user/user')();
  csvGenerate = require('../utils/generator')(),
  csvFilter = require('../utils/csv-filtered')(),
  csvReader = require('../utils/csv-reader')();

  //**************************************User*******************************************************/
apiRouter.post('/api/v1/register', user.register);
apiRouter.get('/api/v1/user', auth.validateJWT, user.getUserById);
apiRouter.put('/api/v1/user/:_id', auth.validateJWT, user.putUser);
apiRouter.delete('/api/v1/user/:_id', auth.validateJWT, user.deleteUser);

//**************************************Auth*******************************************************/
apiRouter.post('/api/v1/login', auth.login);
apiRouter.get('/api/v1/token', auth.validateJWT);


//***************************CSV Generator *******************************************/
apiRouter.get('/api/v1/generator', csvGenerate.csvGenerator);

//***************************CSV Filter *******************************************/
apiRouter.get('/api/v1/filtered', csvFilter.csvFiltered);

//**************************************CSV Reader****************************************************/
apiRouter.get('/api/v1/csv', csvReader.getCSVData);

module.exports = apiRouter;
