import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Briefcase,
  BookOpen,
  BarChart3,
  Settings,
  Flame,
  ChevronDown,
} from 'lucide-react';
import { NavigationPage, MonthConfig, UserProfile } from '../../types/tracker';
import { MONTHS_REGISTRY } from '../../config/monthsConfig';

interface SidebarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  currentMonth: MonthConfig;
  onSelectMonth: (monthId: string) => void;
  currentStreak: number;
  profile: UserProfile;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  currentMonth,
  onSelectMonth,
  currentStreak,
  profile,
}) => {
  const navItems: { id: NavigationPage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Daily Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'career', label: 'Career', icon: Briefcase },
    { id: 'study', label: 'Study', icon: BookOpen },
    { id: 'statistics', label: 'Statistics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-neutral-950 border-r border-neutral-800/80 p-5 select-none h-screen sticky top-0 flex-shrink-0 justify-between">
      {/* Top Branding & Profile */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-bold text-neutral-950 text-base shadow-md shadow-emerald-500/20">
              SN
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                SUBHAM
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  PRO
                </span>
              </h1>
              <p className="text-xs text-neutral-400 font-medium">Personal Tracker</p>
            </div>
          </div>

          {/* Quick Streak Badge */}
          <div className="mt-4 p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
                <Flame className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold text-neutral-200">Current Streak</span>
            </div>
            <span className="font-mono text-xs font-bold text-amber-400">
              {currentStreak} {currentStreak === 1 ? 'Day' : 'Days'}
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 font-semibold shadow-sm border border-emerald-500/20'
                    : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900/80'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-emerald-400' : 'text-neutral-400'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Month Switcher & Profile Card */}
      <div className="space-y-4 pt-4 border-t border-neutral-800/80">
        {/* Month Selector dropdown */}
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 block mb-1.5">
            Active Month
          </label>
          <div className="relative">
            <select
              value={currentMonth.id}
              onChange={(e) => onSelectMonth(e.target.value)}
              className="w-full appearance-none bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-semibold text-neutral-200 rounded-xl px-3 py-2 pr-8 cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {Object.values(MONTHS_REGISTRY).map((m) => (
                <option key={m.id} value={m.id} className="bg-neutral-900 text-neutral-100">
                  {m.name} ({m.daysCount} Days)
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* User Mini Profile Tag */}
        <div className="p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/60">
          <div className="text-xs font-semibold text-neutral-200 truncate">{profile.name}</div>
          <div className="text-[11px] text-emerald-400 font-medium truncate mt-0.5">
            {profile.role}
          </div>
          <div className="text-[10px] text-neutral-400 mt-1 truncate">
            {profile.currentFocus}
          </div>
        </div>
      </div>
    </aside>
  );
};
