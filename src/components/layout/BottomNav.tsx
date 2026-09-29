import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Briefcase,
  BarChart3,
} from 'lucide-react';
import { NavigationPage } from '../../types/tracker';

interface BottomNavProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentPage,
  onNavigate,
}) => {
  const items: { id: NavigationPage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'career', label: 'Career', icon: Briefcase },
    { id: 'statistics', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/90 backdrop-blur-lg border-t border-neutral-800/90 px-2 py-1.5 flex items-center justify-around safe-area-bottom">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'text-emerald-400 font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <div className={`p-1 rounded-lg ${isActive ? 'bg-emerald-500/15' : ''}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
