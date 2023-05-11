const fs = require('fs');
const csv = require('csv-parser');

const path = require('path');
const { Worker } = require('node:worker_threads');
module.exports = () => {
    async function csvGenerator(req, res) {
        const return_response = {
            message: null,
            data: null,
        }
        const moment = require('moment');
        const numRows = 5000000;
        const numDuplicates = 20;
        const numberOfWorkerThread = 10;
        
        let startTime = moment().unix();
        let totalTime  = startTime
        const callEnd = () => {
          totalTime = moment().unix() - startTime
          console.log("end in", totalTime);
          return_response["message"] = `Successfully generated 5 milion records in ${totalTime} sec`
          return res.status(200).json(return_response);
        }
        const threadObj = {
            batchSize: numRows / numberOfWorkerThread,
            dupRows: numDuplicates / numberOfWorkerThread,
        }

        let fileExists =  fs.existsSync('data.csv')
        if(fileExists) {
            fs.unlinkSync('data.csv');
        }
    
       fs.writeFileSync('data.csv', 'firstName,lastName,email,phoneNumber\n');
       let counter = 0
       for (let i = 0; i < numberOfWorkerThread; i++) {
            const wPath = path.resolve(__dirname, 'worker.js')
            const worker = new Worker(wPath);
            worker.postMessage(threadObj);
            worker.once('message', (message) => {
                counter ++
                fs.appendFileSync('data.csv', message);
                if(counter === 9) callEnd();
            });
            worker.on('error', code => {
                console.log(`error exit code ${code}`)
            })
            worker.on('exit', code => {
                if (code !== 0) console.log(`Worker stopped with exit code ${code}`)
            })
        }
    }

    return {
        csvGenerator
    }
}
