import React from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Flame,
  Award,
  Check,
  Code,
  Gamepad2,
  Clock,
} from 'lucide-react';
import { useTracker } from '../hooks/useTracker';
import { formatDayDateStr, calculateDailySummary } from '../utils/calculations';
import { MONTHS_REGISTRY } from '../config/monthsConfig';

interface CalendarPageProps {
  tracker: ReturnType<typeof useTracker>;
}

export const CalendarPage: React.FC<CalendarPageProps> = ({ tracker }) => {
  const {
    currentMonthConfig,
    currentMonthDays,
    selectedDateStr,
    setSelectedDateStr,
    setCurrentPage,
    todayDateStr,
    monthStats,
    selectedMonthId,
    setSelectedMonthId,
  } = tracker;

  // Weekday column headers
  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate starting offset (what day of week does the 1st fall on?)
  const firstDayOfWeek = new Date(
    currentMonthConfig.year,
    currentMonthConfig.month - 1,
    1
  ).getDay();

  // Create array of days 1..daysCount
  const daysArray = Array.from({ length: currentMonthConfig.daysCount }, (_, i) => i + 1);

  // Month navigation
  const monthIds = Object.keys(MONTHS_REGISTRY);
  const currentMonthIdx = monthIds.indexOf(selectedMonthId);

  const handlePrevMonth = () => {
    if (currentMonthIdx > 0) {
      setSelectedMonthId(monthIds[currentMonthIdx - 1]);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIdx < monthIds.length - 1) {
      setSelectedMonthId(monthIds[currentMonthIdx + 1]);
    }
  };

  const handleSelectDay = (dayNum: number) => {
    const dStr = formatDayDateStr(currentMonthConfig.year, currentMonthConfig.month, dayNum);
    setSelectedDateStr(dStr);
    setCurrentPage('tasks');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-6xl mx-auto pb-16">
      {/* Top Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {currentMonthConfig.name}
            </h1>
            <p className="text-xs text-neutral-400">
              {currentMonthConfig.daysCount} Days Tracking Calendar • Click any date to open daily tasks
            </p>
          </div>
        </div>

        {/* Month switcher & Legend */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-950 border border-neutral-800">
            <button
              type="button"
              onClick={handlePrevMonth}
              disabled={currentMonthIdx <= 0}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold px-2 text-neutral-200">
              {currentMonthConfig.name}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              disabled={currentMonthIdx >= monthIds.length - 1}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Legend & Quick Metrics */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 text-xs">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-neutral-400 font-medium">Status Legend:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/30" />
            <span className="text-neutral-300 font-medium">100% Perfect</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500/30" />
            <span className="text-neutral-300 font-medium">50–99% In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/60" />
            <span className="text-neutral-300 font-medium">0–49% Incomplete</span>
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono text-neutral-400">
          <span className="text-emerald-400 font-semibold">{monthStats.perfectDaysCount} Perfect Days</span>
          <span>•</span>
          <span className="text-amber-400 font-semibold">{monthStats.currentStreak} Day Streak</span>
          <span>•</span>
          <span>{monthStats.averageDailyPercentage}% Monthly Avg</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4 sm:p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-2 text-center">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="py-2 text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days grid with offset */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {/* Empty spacer blocks for first day offset */}
          {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="h-24 sm:h-28 rounded-xl bg-neutral-950/30 border border-neutral-800/30 opacity-40 pointer-events-none"
            />
          ))}

          {/* Actual days */}
          {daysArray.map((dayNum) => {
            const dateStr = formatDayDateStr(
              currentMonthConfig.year,
              currentMonthConfig.month,
              dayNum
            );
            const dayOfWeek = new Date(
              currentMonthConfig.year,
              currentMonthConfig.month - 1,
              dayNum
            ).getDay();
            const dayData = currentMonthDays[dateStr] || {};
            const summary = calculateDailySummary(currentMonthConfig, dayNum, dayData);

            const isToday = dateStr === todayDateStr;
            const isSelected = dateStr === selectedDateStr;
            const isWebDev = dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 3;

            // Determine status styling
            let statusDotColor = 'bg-rose-500/50';
            let statusBadge = 'text-rose-400 bg-rose-500/10 border-rose-500/20';

            if (summary.isPerfectDay) {
              statusDotColor = 'bg-emerald-500 shadow-sm shadow-emerald-500/50';
              statusBadge = 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30';
            } else if (summary.completionPercentage >= 50) {
              statusDotColor = 'bg-amber-500 shadow-sm shadow-amber-500/50';
              statusBadge = 'text-amber-400 bg-amber-500/15 border-amber-500/30';
            } else if (summary.completionPercentage === 0) {
              statusDotColor = 'bg-neutral-700';
              statusBadge = 'text-neutral-500 bg-neutral-800/60 border-neutral-700/40';
            }

            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => handleSelectDay(dayNum)}
                className={`relative h-24 sm:h-28 p-2 sm:p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer select-none group focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${
                  isSelected
                    ? 'bg-neutral-800 border-emerald-500 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                    : isToday
                    ? 'bg-neutral-900 border-emerald-500/50 shadow-sm'
                    : 'bg-neutral-950/60 hover:bg-neutral-900/80 border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                {/* Top row: Day Number + Status dot */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-sm sm:text-base font-extrabold font-mono transition-colors ${
                        isToday
                          ? 'text-emerald-400'
                          : isSelected
                          ? 'text-white'
                          : 'text-neutral-300 group-hover:text-white'
                      }`}
                    >
                      {dayNum}
                    </span>
                    {isToday && (
                      <span className="hidden md:inline-block text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        TODAY
                      </span>
                    )}
                  </div>

                  {/* Completion status dot or check icon */}
                  {summary.isPerfectDay ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : (
                    <div className={`w-2.5 h-2.5 rounded-full ${statusDotColor}`} />
                  )}
                </div>

                {/* Middle row: Career skill micro badge */}
                <div className="hidden sm:flex items-center gap-1 text-[10px] text-neutral-400 truncate">
                  {isWebDev ? (
                    <span className="flex items-center gap-1 text-violet-300/90 truncate">
                      <Code className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">Web Dev</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-fuchsia-300/90 truncate">
                      <Gamepad2 className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">Game Dev</span>
                    </span>
                  )}
                </div>

                {/* Bottom row: Completion percentage pill */}
                <div className="flex items-center justify-between w-full pt-1">
                  <span
                    className={`text-[10px] sm:text-xs font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-md border ${statusBadge}`}
                  >
                    {summary.completionPercentage}%
                  </span>

                  <span className="text-[10px] font-mono text-neutral-500 hidden sm:inline">
                    {summary.completedCompulsory}/{summary.totalCompulsory}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
