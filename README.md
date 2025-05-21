# Steel Industry Power Analyzer ⚡

A modern full-stack web application to analyze and visualize steel industry power consumption data from CSV files. Gain insights into energy usage patterns with intuitive filtering and aggregated statistics.

## 📊 Features

- **Data Import**: Parse raw power consumption data from CSV files.
- **Flexible Filtering**:
  - Date range selection
  - Days of the week
  - Power type (e.g., Usage_kWh, CO2)
  - Load type (e.g., Maximum_Load, Light_Load)
- **Data Views**:
  - **List View**: Detailed records with date and day information
  - **Summary View**: Aggregated statistics (sum, mean, min, max, median)
- **Tech Stack**:
  - **Frontend**: React, Axios, CSS
  - **Backend**: Node.js, Express
  - **CSV Parsing**: csv-parser
  - **Date Handling**: moment.js

## 🚀 Getting Started

### 🛠️ Prerequisites

- **Node.js**: Version 18 or higher
- **npm** or **yarn**: Package manager for dependencies
- A CSV file named `Steel_industry_data.csv` with the required data structure

### ⚙️ Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

   The server will run at `http://localhost:3001`.

### 🌐 Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The app will run at `http://localhost:3000` (or the next available port).

### 🧪 Sample API Endpoints

- **Summary View**:
  ```
  GET /power?view=summary&type=Usage_kWh&stat=mean
  ```
  Returns the mean Usage_kWh value for the filtered data.

- **List View with Filters**:
  ```
  GET /power?view=list&type=CO2(tCO2)&loadType=Maximum_Load&from=2018-05-01&to=2018-06-01
  ```
  Returns detailed records for CO2 emissions with Maximum_Load between May 1, 2018, and June 1, 2018.

## 📁 Project Structure

```
├── backend/
│   ├── index.js
│   └── data/
│       └── Steel_industry_data.csv
├── frontend/
│   ├── App.js
│   ├── components/
│   │   ├── FilterForm.js
│   │   └── ResultView.js
│   └── api/
│       └── powerAPI.js
```

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free for personal and commercial use.

## 📬 Contact

For questions or feedback, open an issue on the GitHub repository.