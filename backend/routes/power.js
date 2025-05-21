const express = require('express');
const moment = require('moment');
const { filterData, calculateStat } = require('../utils/helpers');
const dataStore = require('../utils/store');

const router = express.Router();

router.get('/', (req, res) => {
  const {
    from,
    to,
    days = '',
    type = 'Usage_kWh',
    loadType = '',
    view = 'list',
    stat = 'sum'
  } = req.query;

  if (!type) {
    return res.status(400).json({ error: 'Missing type parameter' });
  }

  const dayList = days ? days.split(',') : [];
  const filtered = filterData({
    data: dataStore.data,
    from,
    to,
    days: dayList,
    type,
    loadType
  });

  if (view === 'list') {
    return res.json(filtered.map(row => ({
      date: row.date,
      day: moment(row.date).format('dddd'),
      [type]: parseFloat(row[type]),
      loadType: row.Load_Type,
    })));
  }

  const values = filtered.map(row => parseFloat(row[type])).filter(val => !isNaN(val));
  const result = calculateStat(values, stat);

  if (result === null) {
    return res.status(400).json({ error: 'Invalid or empty data for stat calculation' });
  }

  return res.json({
    type,
    stat,
    result: parseFloat(result.toFixed(2))
  });
});

module.exports = router;
