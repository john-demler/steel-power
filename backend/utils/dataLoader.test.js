const fs = require('fs');
const csv = require('csv-parser');
const moment = require('moment');
const dataStore = require('./store');
const loadCSVData = require('./dataLoader');

jest.mock('fs');
jest.mock('csv-parser');
jest.mock('./store', () => ({
  data: []
}));

describe('Data Loader', () => {
  let mockDataCallback;
  let mockEndCallback;
  let csvOptions;

  beforeEach(() => {
    dataStore.data.length = 0;
    
    jest.clearAllMocks();
    
    mockDataCallback = jest.fn();
    mockEndCallback = jest.fn();
    
    const mockOn = jest.fn().mockImplementation((event, callback) => {
      if (event === 'data') mockDataCallback = callback;
      if (event === 'end') mockEndCallback = callback;
      return {
        on: mockOn
      };
    });
    
    const mockPipe = jest.fn().mockReturnValue({
      on: mockOn
    });
    
    fs.createReadStream.mockReturnValue({
      pipe: mockPipe
    });
    
    csv.mockImplementation((options) => {
      csvOptions = options;
      return 'csv-parser-transform';
    });
  });

  test('should set up file reading pipeline correctly', () => {
    loadCSVData();
    
    expect(fs.createReadStream).toHaveBeenCalledWith('data/Steel_industry_data.csv');
    
    const pipeMethod = fs.createReadStream().pipe;
    expect(pipeMethod).toHaveBeenCalledWith('csv-parser-transform');
  });

  test('should configure csv-parser with correct header mapping', () => {
    loadCSVData();
    
    expect(csvOptions).toHaveProperty('mapHeaders');
    
    const headerWithBOM = '\uFEFFColumn Name';
    const headerWithSpaces = '  Column Name  ';
    
    const mappedHeaderBOM = csvOptions.mapHeaders({ header: headerWithBOM });
    const mappedHeaderSpaces = csvOptions.mapHeaders({ header: headerWithSpaces });
    
    expect(mappedHeaderBOM).toBe('Column Name');
    expect(mappedHeaderSpaces).toBe('Column Name');
  });

  test('should process data rows correctly', () => {
    loadCSVData();
    
    const testRow = {
      'date': '01/01/2023 00:00',
      'Usage_kWh': '100',
      'Load_Type': 'Maximum_Load'
    };
    
    mockDataCallback(testRow);
    
    expect(dataStore.data.length).toBe(1);
    expect(dataStore.data[0].date).toBe('2023-01-01 00:00');
    expect(dataStore.data[0].day).toBe('Sunday');
    expect(dataStore.data[0].Usage_kWh).toBe('100');
    expect(dataStore.data[0].Load_Type).toBe('Maximum_Load');
  });

  test('should skip rows with invalid dates', () => {
    loadCSVData();
    
    const invalidRow = {
      'date': 'invalid-date',
      'Usage_kWh': '100'
    };
    
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    mockDataCallback(invalidRow);
    
    expect(dataStore.data.length).toBe(0);
    
    expect(consoleWarnSpy).toHaveBeenCalledWith('Invalid date found:', 'invalid-date');
    
    consoleWarnSpy.mockRestore();
  });

  test('should handle null or undefined date fields', () => {
    loadCSVData();
    
    const rowWithUndefinedDate = {
      'Usage_kWh': '100',
      'Load_Type': 'Maximum_Load'
    };
    
    const rowWithNullDate = {
      'date': null,
      'Usage_kWh': '100',
      'Load_Type': 'Maximum_Load'
    };
    
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    mockDataCallback(rowWithUndefinedDate);
    mockDataCallback(rowWithNullDate);
    
    expect(dataStore.data.length).toBe(0);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
    
    consoleWarnSpy.mockRestore();
  });

  test('should log completion message when finished', () => {
    loadCSVData();
    
    dataStore.data.push({ id: 1 });
    dataStore.data.push({ id: 2 });
    
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    
    mockEndCallback();
    
    expect(consoleLogSpy).toHaveBeenCalledWith('CSV loaded. Total rows: 2');
    
    consoleLogSpy.mockRestore();
  });
}); 