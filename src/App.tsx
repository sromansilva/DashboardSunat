import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'casos' | 'contribuyentes' | 'alertas' | 'reportes' | 'ai-analytics' | 'settings'>('dashboard');

  // Verificar si hay token almacenado al cargar
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <DashboardPage 
      currentView={currentView} 
      onViewChange={setCurrentView}
      onLogout={handleLogout}
    />
  );
}