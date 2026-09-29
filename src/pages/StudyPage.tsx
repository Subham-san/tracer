import React from 'react';
import {
  BookOpen,
  Clock,
  Target,
  CheckCircle2,
  Calendar,
  Sparkles,
  GraduationCap,
  FileText,
  Code,
} from 'lucide-react';
import { useTracker } from '../hooks/useTracker';
import { formatDayDateStr } from '../utils/calculations';

interface StudyPageProps {
  tracker: ReturnType<typeof useTracker>;
}

export const StudyPage: React.FC<StudyPageProps> = ({ tracker }) => {
  const {
    currentMonthConfig,
    currentMonthDays,
    monthStats,
    toggleTask,
    setSelectedDateStr,
    setCurrentPage,
  } = tracker;

  const daysArray = Array.from({ length: currentMonthConfig.daysCount }, (_, i) => i + 1);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* Top Study Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                Academic &amp; Semester Study
              </span>
              <span className="text-xs text-neutral-400">• {currentMonthConfig.name}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1.5">
              3 Hours Daily Study Discipline
            </h1>
            <p className="text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              BCA coursework, assignments, practical lab preparation, and sessional exam revision.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 text-center sm:text-right">
            <span className="text-xs text-blue-300 font-semibold uppercase tracking-wider block">
              Daily Target
            </span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-blue-400">
              3 Hours / Day
            </span>
          </div>
        </div>
      </div>

      {/* Target Breakdown Cards: Target (93h), Completed (Xh), Remaining (Yh) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Monthly Target
            </span>
            <div className="p-2 rounded-lg bg-neutral-800 text-neutral-300">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black font-mono text-white">
              {monthStats.studyTotalHoursTarget} <span className="text-sm font-normal text-neutral-400">Hours</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              {currentMonthConfig.daysCount} days × 3 hours / day
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/70 border border-blue-500/30 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Hours Completed
            </span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black font-mono text-blue-400">
              {monthStats.studyCompletedHours} <span className="text-sm font-normal text-blue-300/80">Hours</span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              {monthStats.studyCompletedDays} days marked complete ({monthStats.studyPercentage}%)
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Remaining Target
            </span>
            <div className="p-2 rounded-lg bg-neutral-800 text-neutral-300">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black font-mono text-neutral-300">
              {monthStats.studyRemainingHours} <span className="text-sm font-normal text-neutral-500">Hours</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              {currentMonthConfig.daysCount - monthStats.studyCompletedDays} days to study
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar & Note */}
      <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            Monthly Study Completion Progress
          </span>
          <span className="text-sm font-bold font-mono text-blue-400">
            {monthStats.studyPercentage}%
          </span>
        </div>

        <div className="w-full bg-neutral-800 h-3 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${monthStats.studyPercentage}%` }}
          />
        </div>

        {/* Academic Allocation Note */}
        <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 text-xs text-neutral-300 space-y-2">
          <div className="font-semibold text-neutral-200 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            Flexible 3-Hour Academic Study Block:
          </div>
          <p className="text-neutral-400 leading-relaxed">
            The 3-hour study block can be allocated flexibly across:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1 font-medium">
            <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Semester syllabus study</span>
            </div>
            <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>College assignments</span>
            </div>
            <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Academic project code</span>
            </div>
            <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Sessional exam prep</span>
            </div>
          </div>
          <p className="text-[11px] text-neutral-500 italic mt-2">
            * Simple frictionless tracking: Marking "Study 3H" complete instantly registers 3 hours of academic progress.
          </p>
        </div>
      </div>

      {/* Daily Study Log Grid */}
      <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Daily Study Tracker ({currentMonthConfig.name})</h2>
          <span className="text-xs text-neutral-400">Click any day to toggle 3H study</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
          {daysArray.map((dayNum) => {
            const dateStr = formatDayDateStr(
              currentMonthConfig.year,
              currentMonthConfig.month,
              dayNum
            );
            const isDone = Boolean(currentMonthDays[dateStr]?.study);

            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => toggleTask('study', dateStr)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                  isDone
                    ? 'bg-blue-950/20 border-blue-500/40 text-blue-300 shadow-sm'
                    : 'bg-neutral-950/60 border-neutral-800/70 hover:border-neutral-700 text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold">Oct {dayNum}</span>
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] ${
                      isDone
                        ? 'bg-blue-500 border-blue-400 text-neutral-950 font-bold'
                        : 'border-neutral-700'
                    }`}
                  >
                    {isDone ? '✓' : ''}
                  </div>
                </div>

                <div className="text-[11px] font-mono font-semibold">
                  {isDone ? '3 Hours Done' : '0 Hours'}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
