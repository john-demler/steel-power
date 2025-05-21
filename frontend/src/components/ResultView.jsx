import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import EventIcon from '@mui/icons-material/Event';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BoltIcon from '@mui/icons-material/Bolt';
import PowerIcon from '@mui/icons-material/Power';
import AssessmentIcon from '@mui/icons-material/Assessment';

const ResultView = ({ data, view, type, loadType, stat }) => {
  if (!data) return null;

  if (view === 'summary') {
    return (
      <Box
        sx={{
          p: 2,
          bgcolor: '#f3f3f3',
          borderRadius: 2,
          mb: 3,
          maxWidth: 600,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <AssessmentIcon color="primary" />
          <Typography variant="h5">Summary</Typography>
        </Box>
        <Typography><strong>Type:</strong> {type}</Typography>
        <Typography><strong>Stat:</strong> {stat}</Typography>
        <Typography><strong>Result:</strong> {data.result}</Typography>
      </Box>
    );
  }

  if (!Array.isArray(data)) {
    return (
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        No data available to display as a list.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
        <AssessmentIcon color="primary" />
        <Typography variant="h5">Data List</Typography>
      </Box>

      {/* Container with fixed height & vertical scrolling */}
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 900,
          maxHeight: 400,       // Fixed height (adjust as needed)
          overflowY: 'auto',    // Vertical scroll when content overflows vertically
          overflowX: 'auto',    // Horizontal scroll if table is wider than container
        }}
      >
        <Table stickyHeader aria-label="data table" sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <EventIcon fontSize="small" color="action" />
                  Date
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarTodayIcon fontSize="small" color="action" />
                  Day
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <BoltIcon fontSize="small" color="action" />
                  {type}
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <PowerIcon fontSize="small" color="action" />
                  Load Type
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow
                key={idx}
                hover
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'rgba(25, 118, 210, 0.1)',
                  },
                }}
              >
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.day}</TableCell>
                <TableCell>{row[type]}</TableCell>
                <TableCell>{row.loadType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

ResultView.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired,
      day: PropTypes.string.isRequired,
      loadType: PropTypes.string.isRequired,
      Usage_kWh: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      Lagging_Current_Reactive_Power_kVarh: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      Leading_Current_Reactive_Power_kVarh: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })),
    PropTypes.shape({
      result: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    })
  ]),
  view: PropTypes.oneOf(['list', 'summary']).isRequired,
  type: PropTypes.string.isRequired,
  loadType: PropTypes.string,
  stat: PropTypes.string,
};

ResultView.defaultProps = {
  data: null,
  loadType: '',
  stat: 'sum',
};

export default ResultView;
