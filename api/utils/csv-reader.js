const fs = require("fs");
const csv = require("csv-parser");

module.exports = () => {
  function getCSVData(req, res) {
    const return_response = {
        data: null,
        status: null,
        error: null,
        message: ""
    }
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;
    const startRow = (page - 1) * pageSize + 1;
    const endRow = startRow + pageSize - 1;

    let rowCount = 0;
    let rowsToSend = [];
    let isOriginalFileExists =  fs.existsSync('data.csv')
    if(!isOriginalFileExists) {
      return_response["error"] = {message: `Generated file not found, Please generate record first`}
      return res.status(400).json(return_response);
    }

    let isFileExists =  fs.existsSync('filtered.csv')
    if(!isFileExists) {
      return_response["error"] = {message: `Duplicate data entry csv file not found, Please run clean duplicate record`}
      return res.status(400).json(return_response);
    }

  const readableStream = fs.createReadStream("filtered.csv");

    readableStream
      .pipe(csv())
      .on("data", (row) => {
        rowCount++;
        // Process the row data

        // Check if the row falls within the requested page range
        if (rowCount >= startRow && rowCount <= endRow) {
          rowsToSend.push(row);

          // If the rows to send reach the page size, send them as the response
          if (rowsToSend.length === pageSize) {
            return_response["data"] = rowsToSend
            res.status(200).json(return_response);
            rowsToSend = []; // Clear the rowsToSend array
          }
        }

        // Stop processing rows after reaching the end row of the requested page
        if (rowCount === endRow) {
          readableStream.destroy();
        }
      })
      .on("end", (d) => {
        // Send the remaining rows as the response if there are any
        if (rowsToSend.length > 0) {
          return_response["data"] = rowsToSend
          res.status(200).json(return_response);
        }
      });

    readableStream.on("close", () => {
      console.log("CSV processing complete.");
    });
  }

  return {
    getCSVData,
  };
};
