const express = require('express'),
  apiRouter = express.Router(),
  csvGenerate = require('../utils/generator')(),
  csvFilter = require('../utils/csv-filtered')(),
  csvReader = require('../utils/csv-reader')();


//***************************CSV Generator *******************************************/
apiRouter.get('/api/v1/generator', csvGenerate.csvGenerator);

//***************************CSV Filter *******************************************/
apiRouter.get('/api/v1/filtered', csvFilter.csvFiltered);

//**************************************CSV Reader****************************************************/
apiRouter.get('/api/v1/csv', csvReader.getCSVData);

module.exports = apiRouter;
