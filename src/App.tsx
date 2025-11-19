import { useState } from 'react';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'casos' | 'contribuyentes' | 'alertas' | 'reportes' | 'ai-analytics' | 'settings'>('dashboard');

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <DashboardPage 
      currentView={currentView} 
      onViewChange={setCurrentView}
      onLogout={() => setIsLoggedIn(false)}
    />
  );
}