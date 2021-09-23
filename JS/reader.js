const fs = require('fs')
const csv = require('csv-parser')

let readedData = []

fs.createReadStream('./data/sembako.csv')
  .pipe(csv())
  .on('data', (row) => {
    readedData.push(row)
  })
  .on('end', () => {
    let stringified = JSON.stringify(readedData, null, 2)
    fs.writeFileSync('./data/sembako.json', stringified)
  });
