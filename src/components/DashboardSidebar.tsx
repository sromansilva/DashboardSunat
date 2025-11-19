import { Home, FileText, Users, Bell, BarChart3, Brain, Settings, Circle } from 'lucide-react';
import { cn } from './ui/utils';

interface DashboardSidebarProps {
  currentView: 'dashboard' | 'casos' | 'contribuyentes' | 'alertas' | 'reportes' | 'ai-analytics' | 'settings';
  onViewChange: (view: 'dashboard' | 'casos' | 'contribuyentes' | 'alertas' | 'reportes' | 'ai-analytics' | 'settings') => void;
}

export default function DashboardSidebar({ currentView, onViewChange }: DashboardSidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Inicio', view: 'dashboard' as const },
    { id: 'casos', icon: FileText, label: 'Casos', view: 'casos' as const },
    { id: 'contribuyentes', icon: Users, label: 'Contribuyentes', view: 'contribuyentes' as const },
    { id: 'alertas', icon: Bell, label: 'Alertas', view: 'alertas' as const },
    { id: 'reportes', icon: BarChart3, label: 'Reportes', view: 'reportes' as const },
    { id: 'ia-analytics', icon: Brain, label: 'IA Analítica', view: 'ai-analytics' as const },
    { id: 'settings', icon: Settings, label: 'Configuración', view: 'settings' as const },
  ];

  return (
    <aside className="w-64 bg-[#003876] text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-8 h-8">
              <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fill="#003876" fontSize="36">
                S
              </text>
            </svg>
          </div>
          <div>
            <div className="text-white">SUNAT</div>
            <div className="text-xs text-white/70">Fiscalización</div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.view === currentView;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.view)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                    isActive 
                      ? "bg-white/20 text-white" 
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Connection status */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Circle className="w-2 h-2 fill-green-400 text-green-400" />
          <span>Sesión activa</span>
        </div>
      </div>
    </aside>
  );
}