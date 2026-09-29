import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  CheckCheck,
  Flame,
} from 'lucide-react';
import { ProgressRing } from '../components/ui/ProgressRing';
import { TaskCard } from '../components/ui/TaskCard';
import { useTracker } from '../hooks/useTracker';

interface DailyTasksPageProps {
  tracker: ReturnType<typeof useTracker>;
}

export const DailyTasksPage: React.FC<DailyTasksPageProps> = ({ tracker }) => {
  const {
    currentMonthConfig,
    selectedDateStr,
    selectedDayNumber,
    activeDayConfig,
    activeDayData,
    dailySummary,
    toggleTask,
    setAllTasksForDay,
    todayDateStr,
    isTodayInCurrentMonth,
    goToToday,
    goToPrevDay,
    goToNextDay,
    setSelectedDateStr,
  } = tracker;

  const isToday = selectedDateStr === todayDateStr;

  // Separate tasks by category in exact requested order
  const personalTasks = activeDayConfig.tasks.filter((t) => t.category === 'personal');
  const mealTasks = activeDayConfig.tasks.filter((t) => t.category === 'meals');
  const studyTasks = activeDayConfig.tasks.filter((t) => t.category === 'study');
  const careerTasks = activeDayConfig.tasks.filter((t) => t.category === 'career');
  const optionalTasks = activeDayConfig.tasks.filter((t) => t.category === 'optional');

  // Handle "Start today's tasks" button (marks first uncompleted task)
  const handleStartTasks = () => {
    const firstUncompleted = activeDayConfig.tasks.find((t) => !activeDayData[t.id]);
    if (firstUncompleted) {
      toggleTask(firstUncompleted.id, selectedDateStr);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-4xl mx-auto pb-16">
      {/* Date Header & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800/80">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goToPrevDay}
            disabled={selectedDayNumber <= 1}
            aria-label="Previous day"
            className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-300 hover:text-white transition cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase">
                {activeDayConfig.dayName}, {activeDayConfig.dayNumber} {currentMonthConfig.name.split(' ')[0].toUpperCase()}
              </h1>
              {isToday && (
                <span className="text-[10px] font-mono uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                  TODAY
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-400 mt-0.5 font-mono">
              {selectedDateStr} • Day {selectedDayNumber} of {currentMonthConfig.daysCount}
            </p>
          </div>

          <button
            type="button"
            onClick={goToNextDay}
            disabled={selectedDayNumber >= currentMonthConfig.daysCount}
            aria-label="Next day"
            className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-300 hover:text-white transition cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {!isToday && isTodayInCurrentMonth && (
            <button
              type="button"
              onClick={goToToday}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 transition cursor-pointer flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Go to Today</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setAllTasksForDay(selectedDateStr, true)}
            className="text-xs font-semibold px-3 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 transition cursor-pointer flex items-center gap-1.5"
            title="Mark all compulsory tasks completed for today"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark All Done</span>
          </button>

          <button
            type="button"
            onClick={() => setAllTasksForDay(selectedDateStr, false)}
            className="text-xs font-semibold px-2.5 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-neutral-200 transition cursor-pointer"
            title="Reset this day's tasks"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress & Smart Status Bar */}
      <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <ProgressRing
            percentage={dailySummary.completionPercentage}
            size={110}
            strokeWidth={10}
            showStatusLabel={false}
          />

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                {dailySummary.completionPercentage}% Complete
              </span>
              {dailySummary.isPerfectDay && (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <Flame className="w-3.5 h-3.5" />
                  100% Day
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-neutral-200">
              "{dailySummary.statusMessage}"
            </p>

            <p className="text-xs text-neutral-400">
              {dailySummary.completedCompulsory} of {dailySummary.totalCompulsory} Compulsory Tasks Finished
              {dailySummary.hasValorant ? ' • Valorant logged (Optional)' : ''}
            </p>
          </div>
        </div>

        {/* Zero State / Start Tasks Prompt */}
        {dailySummary.completionPercentage === 0 ? (
          <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
            <span className="text-xs text-neutral-400 text-center sm:text-right">
              Your day hasn't started yet.
            </span>
            <button
              type="button"
              onClick={handleStartTasks}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start today's tasks</span>
            </button>
          </div>
        ) : dailySummary.completionPercentage < 100 ? (
          <div className="text-xs text-neutral-400 bg-neutral-950/70 border border-neutral-800 px-3.5 py-2 rounded-xl">
            <span className="text-emerald-400 font-semibold">Good. Keep going.</span> {8 - dailySummary.completedCompulsory} tasks remaining.
          </div>
        ) : (
          <div className="text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-3.5 py-2 rounded-xl flex items-center gap-1.5 font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            100% Day Complete 🔥
          </div>
        )}
      </div>

      {/* Task Sections in Exact Requested Order */}

      {/* 1. PERSONAL */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <span>Daily Routine</span>
            <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800 px-1.5 py-0.2 rounded">
              Compulsory
            </span>
          </h2>
        </div>
        <div className="space-y-2.5">
          {personalTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isCompleted={Boolean(activeDayData[task.id])}
              onToggle={() => toggleTask(task.id, selectedDateStr)}
            />
          ))}
        </div>
      </section>

      {/* 2. MEALS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <span>Nutrition &amp; Meals (4 Daily)</span>
            <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800 px-1.5 py-0.2 rounded">
              Compulsory
            </span>
          </h2>
        </div>
        <div className="space-y-2.5">
          {mealTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isCompleted={Boolean(activeDayData[task.id])}
              onToggle={() => toggleTask(task.id, selectedDateStr)}
            />
          ))}
        </div>
      </section>

      {/* 3. STUDY */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <span>Academic Study (3 Hours)</span>
            <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.2 rounded">
              Compulsory • 3H Block
            </span>
          </h2>
        </div>
        <div className="space-y-2.5">
          {studyTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isCompleted={Boolean(activeDayData[task.id])}
              onToggle={() => toggleTask(task.id, selectedDateStr)}
            />
          ))}
        </div>
      </section>

      {/* 4. CAREER */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <span>Career Specialization</span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.2 rounded">
              Compulsory
            </span>
          </h2>
        </div>
        <div className="space-y-2.5">
          {careerTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isCompleted={Boolean(activeDayData[task.id])}
              onToggle={() => toggleTask(task.id, selectedDateStr)}
            />
          ))}
        </div>
      </section>

      {/* 5. OPTIONAL */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <span>Gaming &amp; Leisure</span>
            <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.2 rounded">
              Optional • Does not affect %
            </span>
          </h2>
        </div>
        <div className="space-y-2.5">
          {optionalTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isCompleted={Boolean(activeDayData[task.id])}
              onToggle={() => toggleTask(task.id, selectedDateStr)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
