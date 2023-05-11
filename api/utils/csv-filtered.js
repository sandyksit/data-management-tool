const fs = require('fs');
const readline = require('readline');

module.exports = () => {
 async function csvFiltered(req, res) {
    const return_response = {
        data: null,
        status: null,
        error: null,
        message: ""
    }
    let fileExists =  fs.existsSync('data.csv')
    if(!fileExists) {
        return_response["error"] = {message: `File not found, Please generate record first`}
        return res.status(400).json(return_response);
    }
    let filteredFileExists =  fs.existsSync('filtered.csv')
    if(filteredFileExists) {
        fs.unlinkSync('filtered.csv');
    }
    // Set to store unique rows
    const uniqueRows = new Set();
    // Array to store duplicate rows
    const duplicateRows = [];
   
    // Read the original CSV file line by line
    const readStream = fs.createReadStream('data.csv');
    const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
    });

    rl.on('line', (line) => {
    // Check if the row is unique
    if (!uniqueRows.has(line)) {
        uniqueRows.add(line);
    } else {
        // Duplicate row found, add to duplicateRows array
        duplicateRows.push(line);
    }
    });

    rl.on('close', () => {
    // Create the new CSV file
    const writeStream = fs.createWriteStream('filtered.csv');

    // Write the filtered data rows
    for (const row of uniqueRows) {
        writeStream.write(`${row}\n`);
    }

    // Close the file
    writeStream.end();

    // Log the duplicate rows
    console.log('Duplicate rows:');
    for (const row of duplicateRows) {
        //console.log(row);
    }
    console.log('Duplicate removal complete.');
    return_response["message"] = `Successfully removed duplicate rows`
    return res.status(200).json(return_response);
    });
    }

    return {
        csvFiltered
    }
}
