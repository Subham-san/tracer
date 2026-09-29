import React from 'react';
import {
  Sun,
  Moon,
  Calendar as CalendarIcon,
  Flame,
  Award,
} from 'lucide-react';
import { UserProfile, MonthConfig, NavigationPage } from '../../types/tracker';

interface HeaderProps {
  profile: UserProfile;
  currentMonth: MonthConfig;
  selectedDateStr: string;
  todayDateStr: string;
  isTodayInCurrentMonth: boolean;
  onGoToToday: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  currentStreak: number;
  perfectDaysCount: number;
  onOpenSettings: () => void;
  onNavigate: (page: NavigationPage) => void;
  currentPage: NavigationPage;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  currentMonth,
  selectedDateStr,
  todayDateStr,
  isTodayInCurrentMonth,
  onGoToToday,
  theme,
  onToggleTheme,
  currentStreak,
  perfectDaysCount,
  onOpenSettings,
}) => {
  // Format selected date nicely
  const selectedDateObj = new Date(`${selectedDateStr}T00:00:00`);
  const formattedSelectedDate = selectedDateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const isViewingToday = selectedDateStr === todayDateStr;

  return (
    <header className="sticky top-0 z-30 w-full bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/80 px-4 sm:px-6 py-3.5 flex items-center justify-between">
      {/* Left: Active Date & Today Jump */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
            <CalendarIcon className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                {formattedSelectedDate}
              </span>
              {isViewingToday ? (
                <span className="text-[10px] font-mono uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-bold">
                  Today
                </span>
              ) : (
                <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
                  {currentMonth.name}
                </span>
              )}
            </div>
            <p className="text-[11px] text-neutral-400 hidden md:block">
              {currentMonth.themeNote || 'Routine & Focus'}
            </p>
          </div>
        </div>

        {!isViewingToday && (
          <button
            type="button"
            onClick={onGoToToday}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition cursor-pointer"
          >
            Go to Today
          </button>
        )}
      </div>

      {/* Right side: Streak & Perfect Days pills, Profile, Theme Toggle */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Streak summary pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold">
          <Flame className="w-3.5 h-3.5" />
          <span>{currentStreak}d Streak</span>
        </div>

        {/* Perfect days pill */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
          <Award className="w-3.5 h-3.5" />
          <span>{perfectDaysCount} Perfect</span>
        </div>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle dark/light theme"
          className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition cursor-pointer"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-400" />
          )}
        </button>

        {/* User Profile avatar / chip */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 rounded-xl bg-neutral-900/80 hover:bg-neutral-800/90 border border-neutral-800 hover:border-neutral-700 transition cursor-pointer text-left"
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center font-mono">
            SN
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-white leading-tight truncate max-w-[110px]">
              {profile.name}
            </div>
            <div className="text-[10px] text-neutral-400 leading-none truncate max-w-[110px]">
              {profile.role}
            </div>
          </div>
        </button>
      </div>
    </header>
  );
};
