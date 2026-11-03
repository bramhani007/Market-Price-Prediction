import { useState } from 'react';
import Sidebar, { PageId } from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import PredictionPage from './pages/PredictionPage.tsx';
import HistoricalAnalysisPage from './pages/HistoricalAnalysisPage.tsx';
import PriceTrendsPage from './pages/PriceTrendsPage.tsx';
import FarmerRecommendationsPage from './pages/FarmerRecommendationsPage.tsx';
import ModelPerformancePage from './pages/ModelPerformancePage.tsx';
import DatasetManagementPage from './pages/DatasetManagementPage.tsx';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage onNavigate={setActivePage} />;
      case 'prediction':
        return <PredictionPage />;
      case 'historical':
        return <HistoricalAnalysisPage />;
      case 'trends':
        return <PriceTrendsPage />;
      case 'recommendations':
        return <FarmerRecommendationsPage onNavigate={setActivePage} />;
      case 'performance':
        return <ModelPerformancePage />;
      case 'dataset':
        return <DatasetManagementPage />;
      default:
        return <DashboardPage onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans antialiased overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header activePage={activePage} setMobileOpen={setMobileOpen} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto pb-10">
            {renderActivePage()}
          </div>
        </main>
      </div>
    </div>
  );
}
