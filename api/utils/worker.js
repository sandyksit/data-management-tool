const faker = require('faker');
const { parentPort } = require('node:worker_threads');

parentPort.once('message', (message) => {
    const batchSize = message.batchSize;
    for (let batch = 0; batch < 1; batch++) {
        let rows = '';
        for (let i = 0; i < batchSize; i++) {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const email = faker.internet.email();
            const phone = faker.phone.phoneNumber();
            const row = `${firstName},${lastName},${email},${phone}\n`;
            rows += row;
            if(i < message.dupRows) {// For add duplicate rows
                rows += row;
            }
        }
        parentPort.postMessage(rows);
    }
});