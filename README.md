# Agricultural Market Price Prediction System

A complete machine learning-based agricultural commodity price prediction, market intelligence, and decision support platform for Indian farmers, focused on Tamil Nadu markets.

## Technology Stack

- **Frontend**: React.js 19, TypeScript, Tailwind CSS, Plotly
- **Backend**: FastAPI (Python), REST Architecture
- **Database**: SQLite with SQLAlchemy ORM (Persistent Disk configuration for Render)
- **Machine Learning**: Scikit-learn (Random Forest Regressor), XGBoost Regressor, LightGBM Regressor
- **Time-Series Forecasting**: SARIMA (Seasonal Autoregressive Integrated Moving Average)
- **Model Persistence**: Joblib
- **Data Source**: AGMARKNET (agmarknet.gov.in) & data.gov.in format

---

## Project Structure

```text
├── backend/
│   ├── main.py                  # FastAPI application entry point & CORS
│   ├── database.py              # SQLite & SQLAlchemy engine configuration
│   ├── models.py                # 5 DB tables (MarketRecord, Crop, Market, Predictions, Performance)
│   ├── schemas.py               # Pydantic request/response validation
│   ├── requirements.txt         # Python dependencies
│   ├── routes/
│   │   ├── predict.py           # /api/predict, /api/compare, /api/recommendations
│   │   ├── analytics.py         # /api/dashboard, /api/historical, /api/trends
│   │   ├── dataset.py           # /api/dataset/upload, /api/dataset/summary
│   │   └── models.py            # /api/models/performance
│   ├── services/
│   │   ├── data_service.py      # AGMARKNET CSV parsing, cleaning, seeding
│   │   └── ml_service.py        # ML regression models, evaluation, Joblib
│   └── data/
│       └── sample_agmarknet_tamilnadu.csv  # Authentic Tamil Nadu market dataset
├── src/                         # React Frontend Application
│   ├── components/              # Sidebar, Header, StatCards, Plotly charts
│   ├── pages/                   # All 8 functional pages
│   ├── utils/                   # TypeScript ML engine, types, seed data & unit tests
│   ├── App.tsx                  # Main router and state layout
│   └── main.tsx
├── server.ts                    # Full-stack Node/Express dev & preview server
├── render.yaml                  # Render deployment configuration
└── README.md
```

---

## 8 Functional Pages

1. **Dashboard**: High-level agricultural KPI cards (Total Crops, Active Markets, Latest Modal Price, Predicted Trend, Best Performing ML Model) and interactive summary Plotly charts.
2. **Crop Price Prediction**: Interactive prediction form allowing farmers to select Crop, State, District, Regulated Market, and Future Date. Evaluates Random Forest, XGBoost, LightGBM, or SARIMA with confidence bounds and forward trajectory.
3. **Market Comparison**: Real-time cross-market price arbitrage tool comparing prices across different Tamil Nadu APMCs for the same commodity, calculating net differences and highlighting top selling market.
4. **Historical Price Analysis**: Comprehensive multi-filter exploration tool (by crop, district, market, and date range) with chronological data tables and historical min/max/modal charts.
5. **Price Trends**: Daily, weekly, monthly, and seasonal price trend visualizations highlighting Kharif, Rabi, and Zaid agricultural cycles.
6. **Farmer Recommendations**: Concrete, data-driven selling advisories (arbitrage opportunities, post-harvest holding windows, risk warnings for perishable produce).
7. **Model Performance**: Objective machine learning benchmarks comparing Random Forest, XGBoost, LightGBM, and SARIMA on MAE (₹), MSE, RMSE (₹), and R² Score, alongside feature importance weights.
8. **Dataset Management**: Real AGMARKNET CSV ingestion interface with column validation, format normalization (DD/MM/YYYY to YYYY-MM-DD), record counting, and sample CSV download.

---

## Running Locally in VS Code

### 1. Python FastAPI Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```
Backend runs at `http://localhost:8000` with interactive Swagger docs at `http://localhost:8000/docs`.

### 2. React Frontend

```bash
npm install
npm run dev
```
Open `http://localhost:3000` to interact with the application.

---

## Render Deployment

This project includes a pre-configured `render.yaml` for zero-downtime deployment:
- FastAPI backend deployed with persistent 10GB disk mount at `/var/data` for the SQLite database.
- React frontend deployed as a static web site or unified service.
