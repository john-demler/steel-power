const { filterData, calculateStat } = require('./helpers');
const moment = require('moment');

describe('Helpers', () => {
  describe('filterData', () => {
    const testData = [
      { 
        date: '2023-01-01', 
        day: 'Sunday', 
        Load_Type: 'Maximum_Load', 
        Usage_kWh: '100', 
        'Lagging_Current_Reactive.Power_kVarh': '50' 
      },
      { 
        date: '2023-01-02', 
        day: 'Monday', 
        Load_Type: 'Light_Load', 
        Usage_kWh: '80', 
        'Lagging_Current_Reactive.Power_kVarh': '40' 
      },
      { 
        date: '2023-01-03', 
        day: 'Tuesday', 
        Load_Type: 'Maximum_Load', 
        Usage_kWh: '120', 
        'Lagging_Current_Reactive.Power_kVarh': '60' 
      },
      { 
        date: '2023-01-04', 
        day: 'Wednesday', 
        Load_Type: 'Maximum_Load', 
        Usage_kWh: 'invalid', 
        'Lagging_Current_Reactive.Power_kVarh': 'N/A' 
      },
    ];

    test('should return all data when no filters are applied', () => {
      const result = filterData({ data: testData });
      expect(result).toEqual(testData);
      expect(result.length).toBe(4);
    });

    test('should filter by date range', () => {
      const result = filterData({ 
        data: testData,
        from: '2023-01-02',
        to: '2023-01-02'
      });
      
      expect(result.length).toBe(1);
      expect(result[0].date).toBe('2023-01-02');
    });

    test('should filter by days of week', () => {
      const result = filterData({ 
        data: testData,
        days: ['Monday', 'Tuesday']
      });
      
      expect(result.length).toBe(2);
      expect(result[0].day).toBe('Monday');
      expect(result[1].day).toBe('Tuesday');
    });

    test('should filter by type', () => {
      const result = filterData({ 
        data: testData,
        type: 'Usage_kWh'
      });
      
      expect(result.length).toBe(3);
      expect(result).not.toContainEqual(
        expect.objectContaining({ Usage_kWh: 'invalid' })
      );
    });

    test('should filter by load type', () => {
      const result = filterData({ 
        data: testData,
        loadType: 'Maximum_Load'
      });
      
      expect(result.length).toBe(3);
      expect(result.every(item => item.Load_Type === 'Maximum_Load')).toBeTruthy();
    });

    test('should not filter when loadType is "All"', () => {
      const result = filterData({ 
        data: testData,
        loadType: 'All'
      });
      
      expect(result.length).toBe(4);
    });

    test('should combine multiple filters', () => {
      const result = filterData({ 
        data: testData,
        from: '2023-01-01',
        to: '2023-01-02',
        days: ['Monday'],
        loadType: 'Light_Load'
      });
      
      expect(result.length).toBe(1);
      expect(result[0].date).toBe('2023-01-02');
      expect(result[0].day).toBe('Monday');
      expect(result[0].Load_Type).toBe('Light_Load');
    });
  });

  describe('calculateStat', () => {
    const testValues = [10, 20, 30, 40, 50];

    test('should calculate sum correctly', () => {
      const result = calculateStat(testValues, 'sum');
      expect(result).toBe(150);
    });

    test('should calculate mean correctly', () => {
      const result = calculateStat(testValues, 'mean');
      expect(result).toBe(30);
    });

    test('should calculate min correctly', () => {
      const result = calculateStat(testValues, 'min');
      expect(result).toBe(10);
    });

    test('should calculate max correctly', () => {
      const result = calculateStat(testValues, 'max');
      expect(result).toBe(50);
    });

    test('should calculate median correctly for odd number of values', () => {
      const result = calculateStat(testValues, 'median');
      expect(result).toBe(30);
    });

    test('should calculate median correctly for even number of values', () => {
      const result = calculateStat([10, 20, 30, 40], 'median');
      expect(result).toBe(25);
    });

    test('should return null for empty array', () => {
      const result = calculateStat([], 'sum');
      expect(result).toBeNull();
    });

    test('should return null for invalid stat type', () => {
      const result = calculateStat(testValues, 'invalid');
      expect(result).toBeNull();
    });
  });
}); 