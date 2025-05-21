import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterPanel from './FilterPanel';

describe('FilterPanel Component', () => {
  const defaultProps = {
    from: '2020-01-01',
    to: '2020-01-31',
    days: ['Monday', 'Wednesday'],
    type: 'Usage_kWh',
    view: 'list',
    stat: 'sum',
    loadType: '',
    onFromChange: jest.fn(),
    onToChange: jest.fn(),
    onDaysChange: jest.fn(),
    onTypeChange: jest.fn(),
    onViewChange: jest.fn(),
    onStatChange: jest.fn(),
    onLoadTypeChange: jest.fn(),
    onSubmit: jest.fn(),
  };

  test('renders all form elements correctly', () => {
    render(<FilterPanel {...defaultProps} />);
    
    expect(screen.getByLabelText('From')).toBeInTheDocument();
    expect(screen.getByLabelText('From')).toHaveValue('2020-01-01');
    expect(screen.getByLabelText('To')).toBeInTheDocument();
    expect(screen.getByLabelText('To')).toHaveValue('2020-01-31');
    
    expect(screen.getByText('Day(s) of Week:')).toBeInTheDocument();
    expect(screen.getByLabelText('Monday')).toBeChecked();
    expect(screen.getByLabelText('Wednesday')).toBeChecked();
    expect(screen.getByLabelText('Tuesday')).not.toBeChecked();
    
    expect(screen.getByLabelText('Consumption Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Load Type')).toBeInTheDocument();
    expect(screen.getByLabelText('View')).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });
  
  test('shows stat dropdown only when view is summary', () => {
    render(<FilterPanel {...defaultProps} />);
    expect(screen.queryByLabelText('Stat')).not.toBeInTheDocument();
    
    render(<FilterPanel {...defaultProps} view="summary" />);
    expect(screen.getByLabelText('Stat')).toBeInTheDocument();
  });
  
  test('handles date changes', () => {
    render(<FilterPanel {...defaultProps} />);
    
    fireEvent.change(screen.getByLabelText('From'), {
      target: { value: '2020-02-01' }
    });
    expect(defaultProps.onFromChange).toHaveBeenCalledWith('2020-02-01');
    
    fireEvent.change(screen.getByLabelText('To'), {
      target: { value: '2020-02-28' }
    });
    expect(defaultProps.onToChange).toHaveBeenCalledWith('2020-02-28');
  });
  
  test('handles day checkbox changes', () => {
    render(<FilterPanel {...defaultProps} />);
    
    fireEvent.click(screen.getByLabelText('Tuesday'));
    expect(defaultProps.onDaysChange).toHaveBeenCalledWith([...defaultProps.days, 'Tuesday']);
    
    fireEvent.click(screen.getByLabelText('Monday'));
    expect(defaultProps.onDaysChange).toHaveBeenCalledWith(['Wednesday']);
  });
  
  test('handles dropdown changes', () => {
    render(<FilterPanel {...defaultProps} />);
    
    fireEvent.mouseDown(screen.getByLabelText('Consumption Type'));
    fireEvent.click(screen.getByText('Lagging_Current_Reactive.Power_kVarh'));
    expect(defaultProps.onTypeChange).toHaveBeenCalled();
    
    fireEvent.mouseDown(screen.getByLabelText('View'));
    fireEvent.click(screen.getByText('Summary'));
    expect(defaultProps.onViewChange).toHaveBeenCalled();
    
    fireEvent.mouseDown(screen.getByLabelText('Load Type'));
    fireEvent.click(screen.getByText('Maximum_Load'));
    expect(defaultProps.onLoadTypeChange).toHaveBeenCalled();
  });
  
  test('handles form submission', () => {
    render(<FilterPanel {...defaultProps} />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(defaultProps.onSubmit).toHaveBeenCalledWith({
      from: defaultProps.from,
      to: defaultProps.to,
      days: defaultProps.days,
      type: defaultProps.type,
      loadType: defaultProps.loadType,
      view: defaultProps.view,
      stat: defaultProps.stat
    });
  });
}); 