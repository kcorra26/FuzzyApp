const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const results = [];

fs.createReadStream(path.join(__dirname, 'customers-1000.csv'))
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    fs.writeFileSync(path.join(__dirname, 'output.json'), JSON.stringify(results, null, 2));
    console.log('CSV file has been converted to JSON and saved.');
});