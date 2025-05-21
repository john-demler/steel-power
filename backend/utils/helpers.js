const moment = require('moment');

// Filter data
const filterData = ({ data, from, to, days, type, loadType }) => {
  return data.filter(row => {
    const date = moment(row.date, 'YYYY-MM-DD');
    const dayOfWeek = date.format('dddd');

    if (from && date.isBefore(moment(from))) return false;
    if (to && date.isAfter(moment(to))) return false;
    if (days?.length && !days.includes(dayOfWeek)) return false;
    if (type && isNaN(parseFloat(row[type]))) return false;
    if (loadType && loadType !== 'All' && row.Load_Type !== loadType) return false;

    return true;
  });
};

// Compute stat
const calculateStat = (values, stat) => {
  if (!values.length) return null;

  switch (stat) {
    case 'sum':
      return values.reduce((a, b) => a + b, 0);
    case 'mean':
      return values.reduce((a, b) => a + b, 0) / values.length;
    case 'min':
      return Math.min(...values);
    case 'max':
      return Math.max(...values);
    case 'median': {
      const sorted = [...values].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
    }
    default:
      return null;
  }
};

module.exports = { filterData, calculateStat };
