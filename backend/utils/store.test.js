const store = require('./store');

describe('Store', () => {
  test('should have a data property initialized as an empty array', () => {
    expect(store).toHaveProperty('data');
    expect(Array.isArray(store.data)).toBe(true);
    expect(store.data.length).toBe(0);
  });

  test('should allow adding elements to the data array', () => {
    store.data.length = 0;
    
    const testItem = { id: 1, value: 'test' };
    store.data.push(testItem);
    
    expect(store.data.length).toBe(1);
    expect(store.data[0]).toEqual(testItem);
  });

  test('should allow clearing the data array', () => {
    store.data.push({ id: 1 });
    store.data.push({ id: 2 });
    
    store.data.length = 0;
    
    expect(store.data.length).toBe(0);
  });
}); 