import React from 'react';
import {
  BarChart3,
  Flame,
  Award,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  BookOpen,
  Code,
  Gamepad2,
  Sparkles,
  Utensils,
  Crosshair,
  Percent,
} from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { useTracker } from '../hooks/useTracker';
import { formatDayDateStr, calculateDailySummary } from '../utils/calculations';

interface StatisticsPageProps {
  tracker: ReturnType<typeof useTracker>;
}

export const StatisticsPage: React.FC<StatisticsPageProps> = ({ tracker }) => {
  const { currentMonthConfig, currentMonthDays, monthStats, setSelectedDateStr, setCurrentPage } = tracker;

  const daysArray = Array.from({ length: currentMonthConfig.daysCount }, (_, i) => i + 1);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-6xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Monthly Analytics &amp; Metrics
              </span>
              <span className="text-xs text-neutral-400">• {currentMonthConfig.name}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1.5">
              Performance Statistics
            </h1>
            <p className="text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              Data-backed discipline analytics across daily routine, 3H study block, internship, and career tracks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-center">
              <span className="text-[10px] uppercase font-mono text-neutral-400 block">Total Compulsory Tasks</span>
              <span className="text-2xl font-black font-mono text-white">
                {monthStats.completedCompulsoryTasks} <span className="text-sm font-normal text-neutral-500">/ {monthStats.totalCompulsoryTasks}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core High-Level Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Overall Completion"
          value={`${monthStats.overallCompletionPercentage}%`}
          subtitle={`${monthStats.completedCompulsoryTasks} / ${monthStats.totalCompulsoryTasks} tasks done`}
          icon={Percent}
          accent="emerald"
          progress={monthStats.overallCompletionPercentage}
        />

        <StatCard
          title="Daily Average"
          value={`${monthStats.averageDailyPercentage}%`}
          subtitle="Mean daily completion"
          icon={TrendingUp}
          accent="blue"
          progress={monthStats.averageDailyPercentage}
        />

        <StatCard
          title="Current Streak"
          value={`${monthStats.currentStreak} DAYS`}
          subtitle={`Longest Streak: ${monthStats.longestStreak} days`}
          icon={Flame}
          accent="amber"
          badge={`${monthStats.currentStreak} Active`}
        />

        <StatCard
          title="Perfect Days (100%)"
          value={monthStats.perfectDaysCount}
          subtitle={`${monthStats.incompleteDaysCount} days incomplete`}
          icon={Award}
          accent="emerald"
          badge={`${monthStats.perfectDaysCount} / ${currentMonthConfig.daysCount} Days`}
        />
      </div>

      {/* Detailed Domain Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Academic & Career Tracks */}
        <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-5">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            Career &amp; Academic Focus Breakdown
          </h2>

          <div className="space-y-4">
            {/* Online Internship */}
            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/90 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-200 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                  Online Internship (Compulsory Daily)
                </span>
                <span className="font-mono font-bold text-cyan-400 text-sm">
                  {monthStats.internshipPercentage}%
                </span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-500 h-full rounded-full transition-all"
                  style={{ width: `${monthStats.internshipPercentage}%` }}
                />
              </div>
              <div className="text-[11px] text-neutral-400 flex justify-between">
                <span>{monthStats.internshipCompletedDays} of {monthStats.internshipTotalDays} days completed</span>
                <span>Target: 100%</span>
              </div>
            </div>

            {/* 3H Study Target */}
            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/90 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-200 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                  3H Daily Study (Semester &amp; Revision)
                </span>
                <span className="font-mono font-bold text-blue-400 text-sm">
                  {monthStats.studyPercentage}%
                </span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all"
                  style={{ width: `${monthStats.studyPercentage}%` }}
                />
              </div>
              <div className="text-[11px] text-neutral-400 flex justify-between">
                <span>{monthStats.studyCompletedHours} / {monthStats.studyTotalHoursTarget} study hours done</span>
                <span>{monthStats.studyRemainingHours}h remaining</span>
              </div>
            </div>

            {/* Web Dev */}
            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/90 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-200 flex items-center gap-2">
                  <Code className="w-3.5 h-3.5 text-violet-400" />
                  Web Development (Mon, Tue, Wed)
                </span>
                <span className="font-mono font-bold text-violet-400 text-sm">
                  {monthStats.webDevPercentage}%
                </span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-violet-500 h-full rounded-full transition-all"
                  style={{ width: `${monthStats.webDevPercentage}%` }}
                />
              </div>
              <div className="text-[11px] text-neutral-400 flex justify-between">
                <span>{monthStats.webDevCompletedDays} of {monthStats.webDevScheduledDays} scheduled days</span>
                <span>Frontend &amp; Projects</span>
              </div>
            </div>

            {/* Game Dev */}
            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/90 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-200 flex items-center gap-2">
                  <Gamepad2 className="w-3.5 h-3.5 text-fuchsia-400" />
                  Game Development (Thu, Fri, Sat, Sun)
                </span>
                <span className="font-mono font-bold text-fuchsia-400 text-sm">
                  {monthStats.gameDevPercentage}%
                </span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-fuchsia-500 h-full rounded-full transition-all"
                  style={{ width: `${monthStats.gameDevPercentage}%` }}
                />
              </div>
              <div className="text-[11px] text-neutral-400 flex justify-between">
                <span>{monthStats.gameDevCompletedDays} of {monthStats.gameDevScheduledDays} scheduled days</span>
                <span>Engines &amp; Mechanics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Routine, Meals & Leisure */}
        <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-5">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Routine &amp; Lifestyle Tracking
          </h2>

          <div className="space-y-4">
            {/* Bathing */}
            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/90 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-200 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  Bathing (Daily Hygiene)
                </span>
                <span className="font-mono font-bold text-sky-400 text-sm">
                  {Math.round((monthStats.bathingCompletedDays / currentMonthConfig.daysCount) * 100)}%
                </span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-sky-500 h-full rounded-full transition-all"
                  style={{ width: `${(monthStats.bathingCompletedDays / currentMonthConfig.daysCount) * 100}%` }}
                />
              </div>
              <div className="text-[11px] text-neutral-400 flex justify-between">
                <span>{monthStats.bathingCompletedDays} of {currentMonthConfig.daysCount} days completed</span>
                <span>Freshness routine</span>
              </div>
            </div>

            {/* Meals Completion */}
            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/90 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-200 flex items-center gap-2">
                  <Utensils className="w-3.5 h-3.5 text-amber-400" />
                  Nutrition &amp; Meals (4 Daily Schedules)
                </span>
                <span className="font-mono font-bold text-amber-400 text-sm">
                  {monthStats.mealsTotalExpected > 0 ? Math.round((monthStats.mealsCompletedTotal / monthStats.mealsTotalExpected) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all"
                  style={{ width: `${monthStats.mealsTotalExpected > 0 ? (monthStats.mealsCompletedTotal / monthStats.mealsTotalExpected) * 100 : 0}%` }}
                />
              </div>
              <div className="text-[11px] text-neutral-400 flex justify-between">
                <span>{monthStats.mealsCompletedTotal} of {monthStats.mealsTotalExpected} total meals</span>
                <span>7 AM, 11 AM, 4 PM, 9 PM</span>
              </div>
            </div>

            {/* Valorant (Optional) */}
            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/90 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-200 flex items-center gap-2">
                  <Crosshair className="w-3.5 h-3.5 text-rose-400" />
                  Valorant (Gaming Leisure)
                </span>
                <span className="font-mono font-bold text-rose-400 text-sm">
                  {monthStats.valorantDays} Days Logged
                </span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all"
                  style={{ width: `${(monthStats.valorantDays / currentMonthConfig.daysCount) * 100}%` }}
                />
              </div>
              <div className="text-[11px] text-neutral-400 flex justify-between">
                <span>Optional gaming sessions</span>
                <span>Does not reduce completion %</span>
              </div>
            </div>

            {/* Streak Summary Info Box */}
            <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
              <div className="flex items-center justify-between font-mono">
                <span className="text-amber-400 font-bold flex items-center gap-1.5">
                  <Flame className="w-4 h-4" /> Current Streak: {monthStats.currentStreak} Days
                </span>
                <span className="text-neutral-400">
                  Longest Streak: {monthStats.longestStreak} Days
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1.5">
                * Note: A day counts toward the streak only when all 8 compulsory tasks are completed (100%).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 31-Day Bar Visualization Chart */}
      <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Daily Completion Timeline ({currentMonthConfig.name})
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Click any bar to jump to that day's task sheet.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-emerald-400">100% = Green</span>
            <span className="text-amber-400">50-99% = Amber</span>
            <span className="text-rose-400">&lt;50% = Red</span>
          </div>
        </div>

        <div className="pt-4 overflow-x-auto">
          <div className="min-w-[680px] flex items-end justify-between gap-1.5 h-44 px-2 pb-2 border-b border-neutral-800">
            {daysArray.map((dayNum) => {
              const dateStr = formatDayDateStr(
                currentMonthConfig.year,
                currentMonthConfig.month,
                dayNum
              );
              const dayData = currentMonthDays[dateStr] || {};
              const summary = calculateDailySummary(currentMonthConfig, dayNum, dayData);

              const heightPercent = Math.max(8, summary.completionPercentage);
              let barColor = 'bg-rose-500/70 hover:bg-rose-400';
              if (summary.isPerfectDay) {
                barColor = 'bg-emerald-500 hover:bg-emerald-400 shadow-sm shadow-emerald-500/30';
              } else if (summary.completionPercentage >= 50) {
                barColor = 'bg-amber-500 hover:bg-amber-400 shadow-sm shadow-amber-500/30';
              } else if (summary.completionPercentage === 0) {
                barColor = 'bg-neutral-800 hover:bg-neutral-700';
              }

              return (
                <button
                  key={dateStr}
                  type="button"
                  onClick={() => {
                    setSelectedDateStr(dateStr);
                    setCurrentPage('tasks');
                  }}
                  className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer focus:outline-none"
                  title={`Day ${dayNum}: ${summary.completionPercentage}% (${summary.completedCompulsory}/${summary.totalCompulsory})`}
                >
                  <span className="text-[10px] font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition mb-1">
                    {summary.completionPercentage}%
                  </span>
                  <div
                    className={`w-full rounded-t-sm transition-all duration-300 ${barColor}`}
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-[10px] font-mono text-neutral-400 mt-2 group-hover:text-white">
                    {dayNum}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
