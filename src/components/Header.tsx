import React from 'react';
import { Menu, Calendar, ShieldCheck, MapPin } from 'lucide-react';
import { PageId } from './Sidebar.tsx';

interface HeaderProps {
  activePage: PageId;
  setMobileOpen: (open: boolean) => void;
}

const PAGE_TITLES: Record<PageId, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Agricultural Dashboard',
    subtitle: 'Real-time Tamil Nadu market intelligence and price overview'
  },
  prediction: {
    title: 'Crop Price Prediction',
    subtitle: 'Machine learning forecasting for agricultural commodities per quintal'
  },
  historical: {
    title: 'Historical Price Analysis',
    subtitle: 'Explore past price records, modal trends, and market arrivals'
  },
  trends: {
    title: 'Price Trends & Seasonality',
    subtitle: 'Analyze daily, monthly, and agricultural seasonal patterns'
  },
  recommendations: {
    title: 'Farmer Recommendations',
    subtitle: 'Actionable market arbitrage and selling decision support'
  },
  performance: {
    title: 'Model Performance & Evaluation',
    subtitle: 'MAE, MSE, RMSE, and R² scores across ML regression algorithms'
  },
  dataset: {
    title: 'Dataset Management',
    subtitle: 'AGMARKNET & data.gov.in data ingestion and CSV validation'
  }
};

export default function Header({ activePage, setMobileOpen }: HeaderProps) {
  const current = PAGE_TITLES[activePage] || PAGE_TITLES.dashboard;
  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white border-b border-slate-200">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-slate-600 rounded-lg lg:hidden hover:bg-slate-100 focus:outline-hidden"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
            {current.title}
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            {current.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 text-xs">
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>Tamil Nadu APMCs</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>{today}</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-medium shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Random Forest Active</span>
        </div>
      </div>
    </header>
  );
}
