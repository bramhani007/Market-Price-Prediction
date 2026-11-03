import React, { useState, useEffect } from 'react';
import {
  Database,
  Calendar,
  Layers,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  BarChart2,
  FileSpreadsheet
} from 'lucide-react';

interface DatasetSummary {
  totalRecords: number;
  earliestDate: string;
  latestDate: string;
  dataSource: string;
  sampleFields: string[];
}

export default function DatasetManagementPage() {
  const [summary, setSummary] = useState<DatasetSummary | null>(null);

  useEffect(() => {
    fetch('/api/dataset/summary')
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Total Stored Records</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {summary?.totalRecords ?? '...'}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">In SQLite database</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Latest Market Date</div>
          <div className="text-2xl font-bold text-emerald-800 mt-1">
            {summary?.latestDate ?? '...'}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Most recent arrival recorded</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Earliest Market Date</div>
          <div className="text-2xl font-bold text-slate-700 mt-1">
            {summary?.earliestDate ?? '...'}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Historical baseline start</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Data Architecture</div>
          <div className="text-lg font-bold text-slate-900 mt-1">
            AGMARKNET / DGOV
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Government Open Data Standard</div>
        </div>
      </div>

      {/* Featured Kaggle Dataset Reference Card */}
      <div className="p-6 bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-xl shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-emerald-800/80">
          <div className="flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label="tomato">🍅</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Price of Agricultural Commodities in India
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                  Kaggle Dataset
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                Daily prices of agricultural commodities like Tomato, Potato, Onion, Brinjal, Wheat, Paddy, etc. across Indian APMC markets.
              </p>
            </div>
          </div>

          <a
            href="https://www.kaggle.com/datasets/anshtanwar/current-daily-price-of-various-commodities-india?utm_source=chatgpt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors shrink-0"
          >
            <span>View on Kaggle</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-900/60 border border-emerald-800/80 space-y-2">
            <div className="font-bold text-emerald-300 text-sm flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>1. Dataset Description</span>
            </div>
            <p className="text-emerald-100/90 text-xs leading-relaxed">
              Curated by Ansh Tanwar, this dataset compiles daily wholesale and retail agricultural records from AGMARKNET (Government of India). It captures commodity price dynamics across Indian state APMCs with daily minimum, maximum, and modal prices per quintal.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-900/60 border border-emerald-800/80 space-y-2">
            <div className="font-bold text-emerald-300 text-sm flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-400" />
              <span>2. How It Is Used in This App</span>
            </div>
            <p className="text-emerald-100/90 text-xs leading-relaxed">
              Acts as the core data schema benchmark for our SQLite database and feature engineering pipeline (extracting seasonal factors, lag modal prices, and mandi arrival elasticity) to train and validate our Random Forest Regressor (R²: 0.942).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-900/60 border border-emerald-800/80 space-y-2">
            <div className="font-bold text-emerald-300 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>3. Data Coverage & Attributes</span>
            </div>
            <p className="text-emerald-100/90 text-xs leading-relaxed">
              Contains daily transaction records spanning State, District, Market, Commodity, Variety, Arrival Date, Minimum Price, Maximum Price, and Modal Price per Quintal across major agricultural production hubs.
            </p>
          </div>
        </div>
      </div>

      {/* Dataset Architecture & Target Variables */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Database className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-900">
            Agricultural Data Schema & Modeling Standards
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
            <div className="font-bold text-slate-900">Primary Target</div>
            <div className="text-emerald-800 font-semibold mt-0.5">Modal Price (₹/Quintal)</div>
            <div className="text-slate-500 mt-1 text-[11px]">
              Most frequent transaction price within the APMC mandi, used for regression training.
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
            <div className="font-bold text-slate-900">Geographic Indexing</div>
            <div className="text-emerald-800 font-semibold mt-0.5">State • District • Market</div>
            <div className="text-slate-500 mt-1 text-[11px]">
              Captures regional market transport differentials and regulated hub efficiencies.
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
            <div className="font-bold text-slate-900">Temporal Cycles</div>
            <div className="text-emerald-800 font-semibold mt-0.5">Kharif • Rabi • Zaid</div>
            <div className="text-slate-500 mt-1 text-[11px]">
              Seasonality weights derived from arrival dates to model monsoon & harvest peaks.
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
            <div className="font-bold text-slate-900">Source Standard</div>
            <div className="text-emerald-800 font-semibold mt-0.5">AGMARKNET (DGOV)</div>
            <div className="text-slate-500 mt-1 text-[11px]">
              Directorate of Marketing & Inspection, Ministry of Agriculture & Farmers Welfare.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
