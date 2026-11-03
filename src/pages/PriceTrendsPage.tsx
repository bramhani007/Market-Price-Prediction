import React, { useState, useEffect } from 'react';
import {
  LineChart as LineChartIcon,
  Calendar,
  CloudSun,
  TrendingUp,
  Sparkles,
  Layers
} from 'lucide-react';
import PlotlyChart from '../components/PlotlyChart.tsx';
import { CROP_LIST } from '../utils/marketData.ts';

export default function PriceTrendsPage() {
  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  const [trendData, setTrendData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/trends?crop=${encodeURIComponent(selectedCrop)}`)
      .then(res => res.json())
      .then(data => {
        setTrendData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedCrop]);

  // Daily Trend Chart
  const getDailyChart = () => {
    if (!trendData || !trendData.daily || trendData.daily.length === 0) return { data: [], layout: {} };

    const dates = trendData.daily.map((d: any) => d.date);
    const prices = trendData.daily.map((d: any) => d.price);

    const data = [
      {
        x: dates,
        y: prices,
        type: 'scatter',
        mode: 'lines+markers',
        name: `${selectedCrop} Recorded Daily/Fortnightly Price`,
        line: { color: '#059669', width: 2.5 },
        marker: { size: 6 }
      }
    ];

    const layout = {
      title: { text: `Recorded Market Price Series (${selectedCrop})`, font: { size: 14 } },
      xaxis: { title: 'Date', gridcolor: '#f1f5f9' },
      yaxis: { title: 'Modal Price (₹/Quintal)', gridcolor: '#f1f5f9' },
      height: 320
    };

    return { data, layout };
  };

  // Monthly Trend Chart
  const getMonthlyChart = () => {
    if (!trendData || !trendData.monthly || trendData.monthly.length === 0) return { data: [], layout: {} };

    const months = trendData.monthly.map((m: any) => m.month);
    const avgs = trendData.monthly.map((m: any) => m.avgPrice);

    const data = [
      {
        x: months,
        y: avgs,
        type: 'bar',
        name: 'Average Monthly Modal Price (₹/Q)',
        marker: {
          color: ['#10b981', '#059669', '#047857', '#065f46', '#022c22', '#15803d']
        }
      }
    ];

    const layout = {
      title: { text: `Monthly Modal Price Averages (${selectedCrop})`, font: { size: 14 } },
      xaxis: { title: 'Year-Month', gridcolor: '#f1f5f9' },
      yaxis: { title: 'Average Modal Price (₹/Quintal)', gridcolor: '#f1f5f9' },
      height: 320
    };

    return { data, layout };
  };

  const dailyChart = getDailyChart();
  const monthlyChart = getMonthlyChart();

  return (
    <div className="space-y-6">
      {/* Header Selector */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <LineChartIcon className="w-5 h-5 text-emerald-700" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Crop Price Trend & Seasonality Analysis
              </h2>
              <p className="text-xs text-slate-500">
                Identify agricultural market cycles, monthly averages, and seasonal shifts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="trend-crop" className="text-xs font-semibold text-slate-700">
              Select Crop:
            </label>
            <select
              id="trend-crop"
              value={selectedCrop}
              onChange={e => setSelectedCrop(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              {CROP_LIST.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Seasonal Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
          <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-1">
            <CloudSun className="w-4 h-4 text-emerald-700" />
            <span>Kharif Season (Jul - Oct)</span>
          </div>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Monsoon period. Inflow disruptions and weather events often lead to sharp price spikes in perishables (Tomato, Onion) and planting-phase demand.
          </p>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-center gap-2 text-blue-900 text-xs font-bold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4 text-blue-700" />
            <span>Rabi Season (Nov - Mar)</span>
          </div>
          <p className="text-xs text-blue-800 leading-relaxed">
            Winter harvest period. Large-scale paddy, maize, and pulse arrivals enter Tamil Nadu APMCs, exerting supply-side stabilization on modal prices.
          </p>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-center gap-2 text-amber-900 text-xs font-bold uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4 text-amber-700" />
            <span>Zaid Season (Apr - Jun)</span>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            Summer transitional window. Higher ambient heat accelerates post-harvest spoilage, increasing short-term spot market price variance.
          </p>
        </div>
      </div>

      {/* Dual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily/Fortnightly Time Series */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <PlotlyChart data={dailyChart.data} layout={dailyChart.layout} />
        </div>

        {/* Monthly Aggregation Bar Chart */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <PlotlyChart data={monthlyChart.data} layout={monthlyChart.layout} />
        </div>
      </div>
    </div>
  );
}
