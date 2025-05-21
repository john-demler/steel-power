# Steel Power API Backend

This is the backend service for the Steel Power Analyzer application, which processes and serves steel industry power consumption data.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure you have a CSV file named `Steel_industry_data.csv` in the `data` directory.

3. Start the server:
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

## Running Tests

This project uses Jest for testing. To run the tests:

```bash
npm test
```

To run tests in watch mode (useful during development):

```bash
npm run test:watch
```

To generate a coverage report:

```bash
npm test -- --coverage
```

## Test Structure

The tests are organized to match the structure of the codebase:

- `utils/store.test.js` - Tests for the data store module
- `utils/helpers.test.js` - Tests for utility functions like filtering and statistics calculation
- `utils/dataLoader.test.js` - Tests for CSV data loading functionality (uses mocks for file system operations)

## API Endpoints

- `GET /power` - Retrieve power consumption data
  - Supports filtering by date range, days of week, and power/load types
  - Supports list and summary views

Example:
```
GET /power?view=summary&type=Usage_kWh&stat=mean
``` 