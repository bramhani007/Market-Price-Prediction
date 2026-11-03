import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  History,
  LineChart,
  Lightbulb,
  Award,
  Database,
  Sprout,
  X
} from 'lucide-react';

export type PageId =
  | 'dashboard'
  | 'prediction'
  | 'historical'
  | 'trends'
  | 'recommendations'
  | 'performance'
  | 'dataset';

interface SidebarProps {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const NAV_ITEMS: { id: PageId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'prediction', label: 'Crop Price Prediction', icon: TrendingUp },
  { id: 'historical', label: 'Historical Price Analysis', icon: History },
  { id: 'trends', label: 'Price Trends', icon: LineChart },
  { id: 'recommendations', label: 'Farmer Recommendations', icon: Lightbulb },
  { id: 'performance', label: 'Model Performance', icon: Award },
  { id: 'dataset', label: 'Dataset Management', icon: Database }
];

export default function Sidebar({ activePage, setActivePage, mobileOpen, setMobileOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-[#14532d] text-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sprout className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide text-white leading-tight">
                AgriPrice ML
              </div>
              <div className="text-xs text-emerald-300/80 font-medium">
                Market Intelligence
              </div>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 text-emerald-300 rounded-md hover:bg-emerald-800 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* State Tag */}
        <div className="px-5 py-2.5 bg-emerald-950/40 border-b border-emerald-800/60 flex items-center justify-between text-xs text-emerald-200">
          <span className="font-medium">Focus: Tamil Nadu APMCs</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-600/40 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
            AGMARKNET
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-950/20'
                    : 'text-emerald-100/90 hover:bg-emerald-800/80 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-emerald-300'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="p-4 border-t border-emerald-800 bg-[#0f3d21]">
          <div className="text-xs text-emerald-300 font-medium">
            Model: Random Forest
          </div>
          <div className="text-[11px] text-emerald-400/70 mt-0.5">
            Prices in ₹ / Quintal (100 kg)
          </div>
        </div>
      </aside>
    </>
  );
}
