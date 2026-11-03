import React, { useState, useEffect } from 'react';
import {
  History,
  Filter,
  Download,
  Calendar,
  Layers,
  ArrowUpDown,
  Search
} from 'lucide-react';
import PlotlyChart from '../components/PlotlyChart.tsx';
import { CROP_LIST, STATE_DISTRICT_MARKET_MAP } from '../utils/marketData.ts';
import { MarketRecord } from '../utils/types.ts';

export default function HistoricalAnalysisPage() {
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedMarket, setSelectedMarket] = useState<string>('All');
  const [startDate, setStartDate] = useState<string>('2026-06-01');
  const [endDate, setEndDate] = useState<string>('2026-11-30');

  const [records, setRecords] = useState<MarketRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const districts = ['All', ...Object.keys(STATE_DISTRICT_MARKET_MAP['Tamil Nadu'] || {})];
  const markets = selectedDistrict === 'All'
    ? ['All']
    : ['All', ...(STATE_DISTRICT_MARKET_MAP['Tamil Nadu']?.[selectedDistrict] || [])];

  const fetchHistorical = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedCrop !== 'All') params.append('crop', selectedCrop);
    if (selectedDistrict !== 'All') params.append('district', selectedDistrict);
    if (selectedMarket !== 'All') params.append('market', selectedMarket);
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);

    try {
      const res = await fetch(`/api/historical?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to load historical data');
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistorical();
  }, [selectedCrop, selectedDistrict, selectedMarket, startDate, endDate]);

  // Compute summary metrics for filtered set
  const prices = records.map(r => r.modalPrice);
  const minP = prices.length > 0 ? Math.min(...prices) : 0;
  const maxP = prices.length > 0 ? Math.max(...prices) : 0;
  const avgP = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;
  const totalArrivals = records.reduce((a, b) => a + (b.arrivals || 0), 0);

  // Plotly Historical Price Scatter / Area Chart
  const getChart = () => {
    if (records.length === 0) return { data: [], layout: {} };

    // Sort chronologically for chart
    const sorted = [...records].sort((a, b) => new Date(a.arrivalDate).getTime() - new Date(b.arrivalDate).getTime());

    const dates = sorted.map(r => r.arrivalDate);
    const modals = sorted.map(r => r.modalPrice);
    const mins = sorted.map(r => r.minPrice);
    const maxs = sorted.map(r => r.maxPrice);

    const data = [
      {
        x: dates,
        y: maxs,
        type: 'scatter',
        mode: 'lines',
        name: 'Max Price',
        line: { color: '#93c5fd', width: 1.5, dash: 'dash' }
      },
      {
        x: dates,
        y: modals,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Modal Price (Target)',
        line: { color: '#047857', width: 2.5 },
        marker: { size: 6 }
      },
      {
        x: dates,
        y: mins,
        type: 'scatter',
        mode: 'lines',
        name: 'Min Price',
        line: { color: '#cbd5e1', width: 1.5, dash: 'dash' }
      }
    ];

    const layout = {
      title: { text: `Historical Price Trajectory (${records.length} records)`, font: { size: 14 } },
      xaxis: { title: 'Arrival Date', gridcolor: '#f1f5f9' },
      yaxis: { title: 'Price (₹/Quintal)', gridcolor: '#f1f5f9' },
      legend: { orientation: 'h', y: -0.22, x: 0 },
      height: 340
    };

    return { data, layout };
  };

  const chart = getChart();

  return (
    <div className="space-y-6">
      {/* Filter Toolbar */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Filter className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold text-slate-900">
            Historical Data Query Filters
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Crop Filter */}
          <div>
            <label htmlFor="filter-crop" className="block text-xs font-semibold text-slate-700 mb-1">
              Crop Name
            </label>
            <select
              id="filter-crop"
              value={selectedCrop}
              onChange={e => setSelectedCrop(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="All">All Crops</option>
              {CROP_LIST.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* District Filter */}
          <div>
            <label htmlFor="filter-district" className="block text-xs font-semibold text-slate-700 mb-1">
              District
            </label>
            <select
              id="filter-district"
              value={selectedDistrict}
              onChange={e => {
                setSelectedDistrict(e.target.value);
                setSelectedMarket('All');
              }}
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Market Filter */}
          <div>
            <label htmlFor="filter-market" className="block text-xs font-semibold text-slate-700 mb-1">
              APMC Market
            </label>
            <select
              id="filter-market"
              value={selectedMarket}
              onChange={e => setSelectedMarket(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              {markets.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label htmlFor="filter-start-date" className="block text-xs font-semibold text-slate-700 mb-1">
              Start Date
            </label>
            <input
              id="filter-start-date"
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="filter-end-date" className="block text-xs font-semibold text-slate-700 mb-1">
              End Date
            </label>
            <input
              id="filter-end-date"
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Summary KPI Badges for Filtered Range */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Filtered Records</div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">{records.length}</div>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Min Price (₹/Q)</div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">₹{minP.toLocaleString('en-IN')}</div>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Average Modal (₹/Q)</div>
          <div className="text-xl font-bold text-emerald-800 mt-0.5">₹{avgP.toLocaleString('en-IN')}</div>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Max Price (₹/Q)</div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">₹{maxP.toLocaleString('en-IN')}</div>
        </div>
      </div>

      {/* Plotly Chart */}
      {records.length > 0 && (
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <PlotlyChart data={chart.data} layout={chart.layout} />
        </div>
      )}

      {/* Data Table */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900">
            AGMARKNET Historical Records Table
          </h3>
          <span className="text-xs text-slate-500">
            Showing latest {records.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Arrival Date</th>
                <th className="py-2.5 px-3">Commodity</th>
                <th className="py-2.5 px-3">Variety</th>
                <th className="py-2.5 px-3">District</th>
                <th className="py-2.5 px-3">Market</th>
                <th className="py-2.5 px-3">Min (₹)</th>
                <th className="py-2.5 px-3">Max (₹)</th>
                <th className="py-2.5 px-3">Modal Price (₹/Q)</th>
                <th className="py-2.5 px-3">Arrivals (T)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-6 text-center text-slate-400">
                    Loading historical price database...
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-6 text-center text-slate-400">
                    No records found matching the specified filters.
                  </td>
                </tr>
              ) : (
                records.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2 px-3 text-slate-700 font-medium whitespace-nowrap">{r.arrivalDate}</td>
                    <td className="py-2 px-3 font-semibold text-slate-900">{r.commodity}</td>
                    <td className="py-2 px-3 text-slate-500">{r.variety}</td>
                    <td className="py-2 px-3 text-slate-600">{r.district}</td>
                    <td className="py-2 px-3 text-slate-800">{r.market}</td>
                    <td className="py-2 px-3 text-slate-500">₹{r.minPrice}</td>
                    <td className="py-2 px-3 text-slate-500">₹{r.maxPrice}</td>
                    <td className="py-2 px-3 font-bold text-emerald-800">₹{r.modalPrice}</td>
                    <td className="py-2 px-3 text-slate-600">{r.arrivals}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
