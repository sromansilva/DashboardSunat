import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import MainDashboard from './MainDashboard';
import AIAnalytics from './AIAnalytics';
import CasesPage from './CasesPage';
import ReportsPage from './ReportsPage';
import ContributorsPage from './ContributorsPage';
import AlertsPage from './AlertsPage';
import SettingsPage from './SettingsPage';

interface DashboardPageProps {
  currentView: 'dashboard' | 'casos' | 'contribuyentes' | 'alertas' | 'reportes' | 'ai-analytics' | 'settings';
  onViewChange: (view: 'dashboard' | 'casos' | 'contribuyentes' | 'alertas' | 'reportes' | 'ai-analytics' | 'settings') => void;
  onLogout: () => void;
}

export default function DashboardPage({ currentView, onViewChange, onLogout }: DashboardPageProps) {
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <MainDashboard />;
      case 'casos':
        return <CasesPage />;
      case 'contribuyentes':
        return <ContributorsPage />;
      case 'alertas':
        return <AlertsPage />;
      case 'reportes':
        return <ReportsPage />;
      case 'ai-analytics':
        return <AIAnalytics />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <MainDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar currentView={currentView} onViewChange={onViewChange} />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader onLogout={onLogout} />
        
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}