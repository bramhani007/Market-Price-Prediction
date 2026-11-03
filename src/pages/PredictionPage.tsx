import React, { useState } from 'react';
import {
  TrendingUp,
  Calendar,
  MapPin,
  Sprout,
  Cpu,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import PlotlyChart from '../components/PlotlyChart.tsx';
import { CROP_LIST, STATE_DISTRICT_MARKET_MAP } from '../utils/marketData.ts';
import { PredictionResult } from '../utils/types.ts';

export default function PredictionPage() {
  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  const [selectedState, setSelectedState] = useState<string>('Tamil Nadu');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Dindigul');
  const [selectedMarket, setSelectedMarket] = useState<string>('Oddanchatram');
  const [predictionDate, setPredictionDate] = useState<string>('2026-12-15');
  const [selectedAlgo, setSelectedAlgo] = useState<string>('Random Forest');

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Available districts for Tamil Nadu
  const districts = Object.keys(STATE_DISTRICT_MARKET_MAP[selectedState] || {});
  const markets = STATE_DISTRICT_MARKET_MAP[selectedState]?.[selectedDistrict] || [];

  const handleDistrictChange = (d: string) => {
    setSelectedDistrict(d);
    const mList = STATE_DISTRICT_MARKET_MAP[selectedState]?.[d] || [];
    if (mList.length > 0) {
      setSelectedMarket(mList[0]);
    }
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedCrop || !selectedMarket || !predictionDate) {
      setError('Please fill in all required fields (Crop, Market, and Prediction Date).');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: selectedCrop,
          state: selectedState,
          district: selectedDistrict,
          market: selectedMarket,
          prediction_date: predictionDate,
          algorithm: selectedAlgo
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate prediction.');
      }

      const data: PredictionResult = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating prediction.');
    } finally {
      setLoading(false);
    }
  };

  // Build Plotly trajectory chart
  const getTrajectoryChart = () => {
    if (!result) return { data: [], layout: {} };

    const histX = result.historicalPoints.map(p => p.date);
    const histY = result.historicalPoints.map(p => p.actual);

    const trajX = [result.historicalPoints[result.historicalPoints.length - 1]?.date, ...result.forecastTrajectory.map(p => p.date)];
    const trajY = [result.historicalPoints[result.historicalPoints.length - 1]?.actual, ...result.forecastTrajectory.map(p => p.predicted)];

    const data = [
      {
        x: histX,
        y: histY,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Historical Recorded Modal Price',
        line: { color: '#047857', width: 3 },
        marker: { size: 7, symbol: 'circle' }
      },
      {
        x: trajX,
        y: trajY,
        type: 'scatter',
        mode: 'lines+markers',
        name: `Forecast Trajectory (${result.algorithm})`,
        line: { color: '#dc2626', width: 2.5, dash: 'dot' },
        marker: { size: 8, symbol: 'diamond', color: '#dc2626' }
      },
      {
        x: [result.predictionDate, result.predictionDate],
        y: [result.confidenceMin, result.confidenceMax],
        type: 'scatter',
        mode: 'lines',
        name: 'Confidence Range (±4.5%)',
        line: { color: '#94a3b8', width: 4 },
        showlegend: true
      }
    ];

    const layout = {
      title: {
        text: `${result.commodity} Price Prediction @ ${result.market} (${result.predictionDate})`,
        font: { size: 14 }
      },
      xaxis: { title: 'Timeline', gridcolor: '#f1f5f9' },
      yaxis: { title: 'Modal Price (₹ per Quintal)', gridcolor: '#f1f5f9' },
      legend: { orientation: 'h', y: -0.22, x: 0 },
      height: 380
    };

    return { data, layout };
  };

  const chart = getTrajectoryChart();

  return (
    <div className="space-y-6">
      {/* Form Card */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
          <TrendingUp className="w-5 h-5 text-emerald-700" />
          <h2 className="text-base font-bold text-slate-900">
            Agricultural Commodity Prediction Parameters
          </h2>
        </div>

        <form onSubmit={handlePredict} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Crop Selection */}
            <div>
              <label htmlFor="crop-select" className="block text-xs font-semibold text-slate-700 mb-1">
                Crop Name <span className="text-red-500">*</span>
              </label>
              <select
                id="crop-select"
                value={selectedCrop}
                onChange={e => setSelectedCrop(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {CROP_LIST.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* State Selection */}
            <div>
              <label htmlFor="state-select" className="block text-xs font-semibold text-slate-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <select
                id="state-select"
                value={selectedState}
                disabled
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-600 focus:outline-hidden cursor-not-allowed"
              >
                <option value="Tamil Nadu">Tamil Nadu</option>
              </select>
            </div>

            {/* District Selection */}
            <div>
              <label htmlFor="district-select" className="block text-xs font-semibold text-slate-700 mb-1">
                District <span className="text-red-500">*</span>
              </label>
              <select
                id="district-select"
                value={selectedDistrict}
                onChange={e => handleDistrictChange(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {districts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Market Selection */}
            <div>
              <label htmlFor="market-select" className="block text-xs font-semibold text-slate-700 mb-1">
                Regulated APMC Market <span className="text-red-500">*</span>
              </label>
              <select
                id="market-select"
                value={selectedMarket}
                onChange={e => setSelectedMarket(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {markets.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Prediction Date */}
            <div>
              <label htmlFor="date-input" className="block text-xs font-semibold text-slate-700 mb-1">
                Future Prediction Date <span className="text-red-500">*</span>
              </label>
              <input
                id="date-input"
                type="date"
                min="2026-11-01"
                max="2027-12-31"
                value={predictionDate}
                onChange={e => setPredictionDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            {/* ML Algorithm Selection - Single Best Suited Algorithm */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="algo-select" className="block text-xs font-semibold text-slate-700">
                  Machine Learning Algorithm
                </label>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  Best Suited Model
                </span>
              </div>
              <select
                id="algo-select"
                value={selectedAlgo}
                onChange={e => setSelectedAlgo(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-emerald-50/40 border border-emerald-300 rounded-lg text-emerald-950 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="Random Forest">Random Forest</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="p-3 text-xs rounded-lg bg-red-50 text-red-700 border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors"
            >
              <Cpu className="w-4 h-4" />
              <span>{loading ? 'Evaluating Model...' : 'Predict Price'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Results Display */}
      {result && (
        <div className="space-y-6">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Predicted Price */}
            <div className="p-4 bg-emerald-900 text-white rounded-xl shadow-xs">
              <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1">
                Predicted Modal Price
              </div>
              <div className="text-3xl font-extrabold text-white">
                ₹{result.predictedPrice.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-emerald-200 mt-1">
                Per Quintal (100 kg) on {result.predictionDate}
              </div>
            </div>

            {/* Historical Average */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Historical Average
              </div>
              <div className="text-2xl font-bold text-slate-900">
                ₹{result.historicalAverage.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Average across historical APMC records
              </div>
            </div>

            {/* Expected Price Trend */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Expected Price Trend
              </div>
              <div className="flex items-center gap-2 mt-1">
                {result.priceTrend === 'Bullish (Upward)' ? (
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <ArrowUpRight className="w-4 h-4" />
                    Bullish (+{result.percentageChange}%)
                  </span>
                ) : result.priceTrend === 'Bearish (Downward)' ? (
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                    <ArrowDownRight className="w-4 h-4" />
                    Bearish ({result.percentageChange}%)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                    <Minus className="w-4 h-4" />
                    Stable (±{result.percentageChange}%)
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Relative to latest recorded modal price
              </div>
            </div>

            {/* Model & Confidence Interval */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Confidence Band
              </div>
              <div className="text-sm font-bold text-slate-900">
                ₹{result.confidenceMin} – ₹{result.confidenceMax}
              </div>
              <div className="text-xs text-slate-500 mt-1 truncate">
                Algorithm: {result.algorithm}
              </div>
            </div>
          </div>

          {/* Plotly Interactive Trajectory Chart */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Price Trajectory: Actuals vs. ML Forecast
                </h3>
                <p className="text-xs text-slate-500">
                  Solid green indicates AGMARKNET recorded prices; dotted red shows projected path.
                </p>
              </div>
              <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                {result.seasonalImpact}
              </div>
            </div>
            <PlotlyChart data={chart.data} layout={chart.layout} />
          </div>

          {/* Actionable Selling Advisory */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                Farmer Decision Support
              </div>
              <p className="text-xs text-emerald-900 mt-0.5 leading-relaxed">
                {result.recommendation}
              </p>
              <div className="text-[11px] text-emerald-700/80 mt-1">
                Note: Predictions are algorithmic estimates based on historical AGMARKNET market records. Actual spot prices may vary with weather disruptions and arrival volumes.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
