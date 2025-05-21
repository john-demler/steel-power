const express = require('express');
const cors = require('cors');
const loadCSVData = require('./utils/dataLoader');
const powerRoutes = require('./routes/power');

const app = express();
const PORT = 3001;

app.use(cors());

// Routes
app.use('/power', powerRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Steel Power API is running!');
});

// Start server and load data
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  loadCSVData();
});
