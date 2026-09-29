import React from 'react';
import {
  Briefcase,
  Code,
  Gamepad2,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Target,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useTracker } from '../hooks/useTracker';

interface CareerPageProps {
  tracker: ReturnType<typeof useTracker>;
}

export const CareerPage: React.FC<CareerPageProps> = ({ tracker }) => {
  const { profile, currentMonthConfig, monthStats, setCurrentPage } = tracker;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                Career Specialization Hub
              </span>
              <span className="text-xs text-neutral-400">• {currentMonthConfig.name}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1.5">
              Dual Skill Focus: Web &amp; Game Dev
            </h1>
            <p className="text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              Targeting top-tier internships and high-growth engineering roles at top tech companies.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800 max-w-xs">
            <div className="text-[11px] font-semibold uppercase text-neutral-400">Long-term Goal</div>
            <p className="text-xs text-neutral-300 font-medium mt-1 leading-snug">
              "{profile.longTermGoal}"
            </p>
          </div>
        </div>
      </div>

      {/* The 3 Core Pillars: Web Dev, Game Dev, Online Internship */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 1. ONLINE INTERNSHIP */}
        <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/70 border border-cyan-500/30 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                Compulsory Daily
              </span>
            </div>

            <h2 className="text-lg font-bold text-white mt-4">Online Internship</h2>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              <span>Scheduled: Every single day</span>
            </div>

            <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
              Production deliverables, daily task execution, real-world development workflows, and internship milestone completion.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">Monthly Progress</span>
              <span className="font-mono font-bold text-cyan-400 text-sm">
                {monthStats.internshipPercentage}%
              </span>
            </div>

            <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${monthStats.internshipPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
              <span>{monthStats.internshipCompletedDays} Days Done</span>
              <span>{monthStats.internshipTotalDays} Total Days</span>
            </div>
          </div>
        </div>

        {/* 2. WEB DEVELOPMENT */}
        <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/70 border border-violet-500/30 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                <Code className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">
                Mon • Tue • Wed
              </span>
            </div>

            <h2 className="text-lg font-bold text-white mt-4">Web Development</h2>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              <span>Scheduled: Monday, Tuesday, Wednesday</span>
            </div>

            <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
              Modern frontend, React, TypeScript, Tailwind CSS, backend APIs, clean architecture, and building production apps from scratch.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">Scheduled Days Done</span>
              <span className="font-mono font-bold text-violet-400 text-sm">
                {monthStats.webDevPercentage}%
              </span>
            </div>

            <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-violet-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${monthStats.webDevPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
              <span>{monthStats.webDevCompletedDays} Days Done</span>
              <span>{monthStats.webDevScheduledDays} Scheduled Days</span>
            </div>
          </div>
        </div>

        {/* 3. GAME DEVELOPMENT */}
        <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/70 border border-fuchsia-500/30 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-fuchsia-500/5 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20 px-2 py-0.5 rounded-full">
                Thu • Fri • Sat • Sun
              </span>
            </div>

            <h2 className="text-lg font-bold text-white mt-4">Game Development</h2>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              <span>Scheduled: Thursday, Friday, Saturday, Sunday</span>
            </div>

            <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
              Game physics, player mechanics, engine architecture, level design, 2D/3D prototyping, and indie game engineering.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">Scheduled Days Done</span>
              <span className="font-mono font-bold text-fuchsia-400 text-sm">
                {monthStats.gameDevPercentage}%
              </span>
            </div>

            <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-fuchsia-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${monthStats.gameDevPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
              <span>{monthStats.gameDevCompletedDays} Days Done</span>
              <span>{monthStats.gameDevScheduledDays} Scheduled Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Schedule Matrix */}
      <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            Weekly Career Distribution Blueprint
          </h2>
          <span className="text-xs text-neutral-400 font-mono">3 Days Web • 4 Days Game • 7 Days Internship</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { day: 'Monday', focus: 'Web Dev', color: 'border-violet-500/40 text-violet-300 bg-violet-950/20' },
            { day: 'Tuesday', focus: 'Web Dev', color: 'border-violet-500/40 text-violet-300 bg-violet-950/20' },
            { day: 'Wednesday', focus: 'Web Dev', color: 'border-violet-500/40 text-violet-300 bg-violet-950/20' },
            { day: 'Thursday', focus: 'Game Dev', color: 'border-fuchsia-500/40 text-fuchsia-300 bg-fuchsia-950/20' },
            { day: 'Friday', focus: 'Game Dev', color: 'border-fuchsia-500/40 text-fuchsia-300 bg-fuchsia-950/20' },
            { day: 'Saturday', focus: 'Game Dev', color: 'border-fuchsia-500/40 text-fuchsia-300 bg-fuchsia-950/20' },
            { day: 'Sunday', focus: 'Game Dev', color: 'border-fuchsia-500/40 text-fuchsia-300 bg-fuchsia-950/20' },
          ].map((item) => (
            <div key={item.day} className={`p-3.5 rounded-xl border ${item.color} flex flex-col justify-between`}>
              <div>
                <span className="text-xs font-semibold text-neutral-300 block">{item.day}</span>
                <span className="text-sm font-bold mt-1 block">{item.focus}</span>
              </div>
              <div className="mt-3 pt-2 border-t border-neutral-800/60 text-[10px] text-cyan-300 flex items-center gap-1 font-mono">
                <span>+ Internship</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
