import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';

import FilterPanel from './components/FilterPanel';
import ResultView from './components/ResultView';
import { fetchPowerData } from './api/powerAPI';

const PER_PAGE = 30;

const App = () => {
  const [from, setFrom] = useState('2018-01-01');
  const [to, setTo] = useState('2018-03-31');
  const [days, setDays] = useState([]);
  const [type, setType] = useState('Usage_kWh');
  const [loadType, setLoadType] = useState('');
  const [view, setView] = useState('list');
  const [stat, setStat] = useState('sum');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFetch = async (filters) => {
    setLoading(true);
    try {
      const result = await fetchPowerData(filters);
      setData(result);
      setCurrentPage(1); // reset page
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const pageCount = Math.ceil(data.length / PER_PAGE);

  const getPagedData = () => {
    if (view !== 'list') return data;
    if (!Array.isArray(data)) return [];
    const offset = (currentPage - 1) * PER_PAGE;
    return data.slice(offset, offset + PER_PAGE);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Steel Industry Power Analysis
      </Typography>

      <FilterPanel
        from={from}
        to={to}
        days={days}
        type={type}
        loadType={loadType}
        view={view}
        stat={stat}
        onFromChange={setFrom}
        onToChange={setTo}
        onDaysChange={setDays}
        onTypeChange={setType}
        onLoadTypeChange={setLoadType}
        onViewChange={setView}
        onStatChange={setStat}
        onSubmit={() => handleFetch({ from, to, days, type, loadType, view, stat })}
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <ResultView data={getPagedData()} view={view} type={type} loadType={loadType} stat={stat} />

          {view === 'list' && data.length > PER_PAGE && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                siblingCount={1}
                boundaryCount={1}
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default App;
