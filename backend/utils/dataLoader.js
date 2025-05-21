const fs = require('fs');
const csv = require('csv-parser');
const moment = require('moment');

const dataStore = require('./store');

const loadCSVData = () => {
  fs.createReadStream('data/Steel_industry_data.csv')
    .pipe(csv({
      mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, '') // Remove BOM
    }))
    .on('data', (row) => {
      const rawDate = row['date']?.trim();
      const parsedDate = moment(rawDate, 'DD/MM/YYYY HH:mm', true);

      if (!parsedDate.isValid()) {
        console.warn('Invalid date found:', rawDate);
        return;
      }

      row['date'] = parsedDate.format('YYYY-MM-DD HH:mm');
      row['day'] = parsedDate.format('dddd');
      dataStore.data.push(row);
    })
    .on('end', () => {
      console.log(`CSV loaded. Total rows: ${dataStore.data.length}`);
    });
};

module.exports = loadCSVData;
