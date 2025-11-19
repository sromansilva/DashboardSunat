import { Bell, LogOut, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';

interface DashboardHeaderProps {
  onLogout: () => void;
}

export default function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <h1 className="text-[#003876] mb-2">
            Dashboard de Fiscalización Inteligente
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="search"
              placeholder="Buscar contribuyentes, casos, RUC..."
              className="pl-10 bg-gray-50"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <Avatar>
              <AvatarFallback className="bg-[#003876] text-white">
                JM
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm text-gray-900">Juan Méndez</div>
              <div className="text-xs text-gray-500">Auditor Senior</div>
            </div>
          </div>

          <Button 
            variant="ghost" 
            size="icon"
            onClick={onLogout}
            className="text-gray-600 hover:text-red-600"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
