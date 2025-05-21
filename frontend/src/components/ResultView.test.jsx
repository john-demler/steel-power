import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultView from './ResultView';

describe('ResultView Component', () => {
  const listData = [
    { 
      date: '2020-01-01', 
      day: 'Monday', 
      loadType: 'Maximum_Load', 
      'Usage_kWh': 100,
      'Lagging_Current_Reactive_Power_kVarh': 50,
      'Leading_Current_Reactive_Power_kVarh': 25
    },
    { 
      date: '2020-01-02', 
      day: 'Tuesday', 
      loadType: 'Light_Load', 
      'Usage_kWh': 80,
      'Lagging_Current_Reactive_Power_kVarh': 40,
      'Leading_Current_Reactive_Power_kVarh': 20
    }
  ];

  const summaryData = { result: 180 };

  test('renders nothing when data is null', () => {
    render(<ResultView 
      data={null} 
      view="list" 
      type="Usage_kWh" 
      loadType="" 
      stat="sum" 
    />);
    
    expect(screen.queryByText('Data List')).not.toBeInTheDocument();
    expect(screen.queryByText('Summary')).not.toBeInTheDocument();
  });

  test('renders list view correctly with data', () => {
    render(<ResultView 
      data={listData} 
      view="list" 
      type="Usage_kWh" 
      loadType="" 
      stat="sum" 
    />);
    
    expect(screen.getByText('Data List')).toBeInTheDocument();
    
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Usage_kWh')).toBeInTheDocument();
    expect(screen.getByText('Load Type')).toBeInTheDocument();
    
    expect(screen.getByText('2020-01-01')).toBeInTheDocument();
    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Maximum_Load')).toBeInTheDocument();
    
    expect(screen.getByText('2020-01-02')).toBeInTheDocument();
    expect(screen.getByText('Tuesday')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
    expect(screen.getByText('Light_Load')).toBeInTheDocument();
  });
  
  test('renders summary view correctly with data', () => {
    render(<ResultView 
      data={summaryData} 
      view="summary" 
      type="Usage_kWh" 
      loadType="" 
      stat="sum" 
    />);
    
    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByText('Type:')).toBeInTheDocument();
    expect(screen.getByText('Usage_kWh')).toBeInTheDocument();
    expect(screen.getByText('Stat:')).toBeInTheDocument();
    expect(screen.getByText('sum')).toBeInTheDocument();
    expect(screen.getByText('Result:')).toBeInTheDocument();
    expect(screen.getByText('180')).toBeInTheDocument();
  });

  test('displays message when data is not an array for list view', () => {
    render(<ResultView 
      data={{}}
      view="list" 
      type="Usage_kWh" 
      loadType="" 
      stat="sum" 
    />);
    
    expect(screen.getByText('No data available to display as a list.')).toBeInTheDocument();
  });

  test('renders with different type parameter', () => {
    render(<ResultView 
      data={listData} 
      view="list" 
      type="Lagging_Current_Reactive_Power_kVarh" 
      loadType="" 
      stat="sum" 
    />);
    
    expect(screen.getByText('Lagging_Current_Reactive_Power_kVarh')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
  });
}); 