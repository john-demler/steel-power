import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const FilterPanel = ({
  from, to, days, type, view, stat, loadType,
  onFromChange, onToChange, onDaysChange,
  onTypeChange, onViewChange, onStatChange,
  onLoadTypeChange,
  onSubmit,
}) => {
  const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const typeOptions = ['Usage_kWh', 'Lagging_Current_Reactive.Power_kVarh', 'Leading_Current_Reactive_Power_kVarh'];
  const loadTypeOptions = ['Maximum_Load', 'Light_Load'];
  const statOptions = ['sum', 'mean', 'min', 'max', 'median'];

  const handleDaysChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      onDaysChange([...days, value]);
    } else {
      onDaysChange(days.filter(day => day !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ from, to, days, type, loadType, view, stat });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'grid',
        gap: 2,
        mb: 3,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          label="From"
          type="date"
          value={from}
          onChange={e => onFromChange(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 150 }}
        />
        <TextField
          label="To"
          type="date"
          value={to}
          onChange={e => onToChange(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 150 }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Day(s) of Week:
        </Typography>
        <FormGroup row>
          {dayOptions.map(day => (
            <FormControlLabel
              key={day}
              control={
                <Checkbox
                  value={day}
                  checked={days.includes(day)}
                  onChange={handleDaysChange}
                />
              }
              label={day}
            />
          ))}
        </FormGroup>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="type-label">Consumption Type</InputLabel>
          <Select
            labelId="type-label"
            value={type}
            label="Consumption Type"
            onChange={e => onTypeChange(e.target.value)}
          >
            {typeOptions.map(opt => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="load-type-label">Load Type</InputLabel>
          <Select
            labelId="load-type-label"
            value={loadType}
            label="Load Type"
            onChange={e => onLoadTypeChange(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {loadTypeOptions.map(opt => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="view-label">View</InputLabel>
          <Select
            labelId="view-label"
            value={view}
            label="View"
            onChange={e => onViewChange(e.target.value)}
          >
            <MenuItem value="list">List</MenuItem>
            <MenuItem value="summary">Summary</MenuItem>
          </Select>
        </FormControl>

        {view === 'summary' && (
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="stat-label">Stat</InputLabel>
            <Select
              labelId="stat-label"
              value={stat}
              label="Stat"
              onChange={e => onStatChange(e.target.value)}
            >
              {statOptions.map(opt => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

      <Button variant="contained" type="submit" sx={{ alignSelf: 'start', mt: 1 }}>
        Search
      </Button>
    </Box>
  );
};

FilterPanel.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  days: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  view: PropTypes.oneOf(['list', 'summary']).isRequired,
  stat: PropTypes.oneOf(['sum', 'mean', 'min', 'max', 'median']).isRequired,
  loadType: PropTypes.string,
  onFromChange: PropTypes.func.isRequired,
  onToChange: PropTypes.func.isRequired,
  onDaysChange: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  onViewChange: PropTypes.func.isRequired,
  onStatChange: PropTypes.func.isRequired,
  onLoadTypeChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

FilterPanel.defaultProps = {
  loadType: '',
};

export default FilterPanel;
