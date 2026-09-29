import React from 'react';
import {
  Flame,
  Award,
  CheckCircle2,
  Calendar,
  ArrowRight,
  TrendingUp,
  Briefcase,
  BookOpen,
  Code,
  Gamepad2,
  Clock,
  Sparkles,
  Check,
} from 'lucide-react';
import { ProgressRing } from '../components/ui/ProgressRing';
import { StatCard } from '../components/ui/StatCard';
import { TaskCard } from '../components/ui/TaskCard';
import { useTracker } from '../hooks/useTracker';

interface DashboardPageProps {
  tracker: ReturnType<typeof useTracker>;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ tracker }) => {
  const {
    profile,
    currentMonthConfig,
    selectedDateStr,
    dailySummary,
    activeDayConfig,
    activeDayData,
    monthStats,
    toggleTask,
    setCurrentPage,
    todayDateStr,
    isTodayInCurrentMonth,
    goToToday,
    setSelectedDateStr,
  } = tracker;

  // Determine dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const isSelectedToday = selectedDateStr === todayDateStr;
  const isWebDevDay = activeDayConfig.scheduledCareerType === 'webDev';

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-7xl mx-auto pb-16">
      {/* Top Greeting & Active Month Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              {currentMonthConfig.name}
            </span>
            <span className="text-xs text-neutral-400">• 31 Days Target</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1.5 flex items-center gap-2">
            {getGreeting()}, {profile.name} 👋
          </h1>

          <p className="text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
            {profile.role} • 5h daily focus window • Balancing BCA college, 3H study, internship &amp;{' '}
            <span className="text-neutral-200 font-semibold">Web/Game Development</span>.
          </p>
        </div>

        {/* Quick Date Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {!isSelectedToday && isTodayInCurrentMonth && (
            <button
              type="button"
              onClick={goToToday}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition cursor-pointer flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Back to Today</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setCurrentPage('tasks')}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <span>Full Task View</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        <StatCard
          title={isSelectedToday ? "Today's Progress" : "Active Day Progress"}
          value={`${dailySummary.completionPercentage}%`}
          subtitle={`${dailySummary.completedCompulsory} of ${dailySummary.totalCompulsory} tasks`}
          icon={CheckCircle2}
          accent={dailySummary.completionPercentage === 100 ? 'emerald' : dailySummary.completionPercentage >= 50 ? 'amber' : 'rose'}
          progress={dailySummary.completionPercentage}
          onClick={() => setCurrentPage('tasks')}
        />

        <StatCard
          title="Month Average"
          value={`${monthStats.averageDailyPercentage}%`}
          subtitle={`${monthStats.completedCompulsoryTasks} / ${monthStats.totalCompulsoryTasks} total tasks`}
          icon={TrendingUp}
          accent="blue"
          progress={monthStats.averageDailyPercentage}
          onClick={() => setCurrentPage('statistics')}
        />

        <StatCard
          title="Current Streak"
          value={`${monthStats.currentStreak} DAYS`}
          subtitle={`Best: ${monthStats.longestStreak} days streak`}
          icon={Flame}
          accent="amber"
          badge={monthStats.currentStreak > 0 ? '🔥 On Fire' : 'Needs 100%'}
          onClick={() => setCurrentPage('calendar')}
        />

        <StatCard
          title="Perfect Days"
          value={monthStats.perfectDaysCount}
          subtitle={`Out of ${currentMonthConfig.daysCount} days in ${currentMonthConfig.name}`}
          icon={Award}
          accent="emerald"
          badge="100% Days"
          onClick={() => setCurrentPage('calendar')}
        />
      </div>

      {/* Main Row: Today's Focus Card & Circular Ring + Quick Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Daily Progress Ring & Career Status */}
        <div className="lg:col-span-5 space-y-6">
          {/* Day Highlight Card */}
          <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 flex flex-col items-center text-center">
            <div className="flex items-center justify-between w-full mb-4">
              <span className="text-xs font-mono font-semibold uppercase text-neutral-400">
                {activeDayConfig.dayName.toUpperCase()} — {selectedDateStr}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                Day {activeDayConfig.dayNumber} of {currentMonthConfig.daysCount}
              </span>
            </div>

            <div className="my-2">
              <ProgressRing
                percentage={dailySummary.completionPercentage}
                size={160}
                strokeWidth={12}
                subtitle={`${dailySummary.completedCompulsory} of ${dailySummary.totalCompulsory} Compulsory Tasks`}
              />
            </div>

            {/* Smart Daily Motivational Status */}
            <div className="mt-4 w-full p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-center">
              <p className="text-xs font-medium text-neutral-300 leading-snug">
                "{dailySummary.statusMessage}"
              </p>
            </div>

            {/* Today's Scheduled Career Task Banner */}
            <div className="mt-5 w-full p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  Scheduled Career Skill
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                  {isWebDevDay ? 'Mon-Wed Routine' : 'Thu-Sun Routine'}
                </span>
              </div>

              <div className="mt-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg ${isWebDevDay ? 'bg-violet-500/10 text-violet-400' : 'bg-fuchsia-500/10 text-fuchsia-400'}`}>
                    {isWebDevDay ? <Code className="w-5 h-5" /> : <Gamepad2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">
                      {isWebDevDay ? 'Web Development' : 'Game Development'}
                    </h2>
                    <p className="text-xs text-neutral-400">
                      {isWebDevDay ? 'Frontend & Full-stack Projects' : 'Engines, mechanics & game code'}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-1 rounded-lg border ${
                      dailySummary.careerTaskCompleted
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    {dailySummary.careerTaskCompleted ? '✓ Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Study Snapshot Card */}
          <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800/80">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    Daily 3H Study Target
                  </h2>
                  <p className="text-[11px] text-neutral-400">BCA Semester &amp; Assignments</p>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-blue-400">
                {monthStats.studyCompletedHours} / {monthStats.studyTotalHoursTarget} hrs
              </span>
            </div>

            <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${monthStats.studyPercentage}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
              <span>{monthStats.studyCompletedDays} days marked complete</span>
              <span>{monthStats.studyRemainingHours} hrs remaining in month</span>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Quick Interactive Task Checklist */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800/80">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Daily Tasks Checklist</span>
                  <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                    {dailySummary.completedCompulsory}/{dailySummary.totalCompulsory} Done
                  </span>
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Tap any task to mark completed. Updates stats instantly.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage('tasks')}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tasks List */}
            <div className="space-y-2.5">
              {activeDayConfig.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isCompleted={Boolean(activeDayData[task.id])}
                  onToggle={() => toggleTask(task.id, selectedDateStr)}
                />
              ))}
            </div>
          </div>

          {/* Quick Career Tracker Mini Bar */}
          <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                Monthly Career Deliverables
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage('career')}
                className="text-xs text-neutral-400 hover:text-neutral-200 transition"
              >
                Career Hub →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
                <div className="text-[11px] text-neutral-400 uppercase font-medium">Internship</div>
                <div className="text-lg font-bold font-mono text-cyan-400 mt-0.5">
                  {monthStats.internshipPercentage}%
                </div>
                <div className="text-[10px] text-neutral-500 mt-1">
                  {monthStats.internshipCompletedDays}/{monthStats.internshipTotalDays} days
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
                <div className="text-[11px] text-neutral-400 uppercase font-medium">Web Dev (Mon-Wed)</div>
                <div className="text-lg font-bold font-mono text-violet-400 mt-0.5">
                  {monthStats.webDevPercentage}%
                </div>
                <div className="text-[10px] text-neutral-500 mt-1">
                  {monthStats.webDevCompletedDays}/{monthStats.webDevScheduledDays} scheduled days
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
                <div className="text-[11px] text-neutral-400 uppercase font-medium">Game Dev (Thu-Sun)</div>
                <div className="text-lg font-bold font-mono text-fuchsia-400 mt-0.5">
                  {monthStats.gameDevPercentage}%
                </div>
                <div className="text-[10px] text-neutral-500 mt-1">
                  {monthStats.gameDevCompletedDays}/{monthStats.gameDevScheduledDays} scheduled days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
