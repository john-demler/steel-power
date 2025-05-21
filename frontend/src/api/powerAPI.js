import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const fetchPowerData = async ({ from, to, days, type, loadType, view, stat }) => {
  const params = {};

  if (from) params.from = from;
  if (to) params.to = to;
  if (days.length > 0) params.days = days.join(',');
  if (type) params.type = type;
  if (loadType) params.loadType = loadType;
  if (view) params.view = view;
  if (view === 'summary' && stat) params.stat = stat;

  const response = await axios.get(`${BASE_URL}/power`, { params });
  return response.data;
};

export default fetchPowerData;
