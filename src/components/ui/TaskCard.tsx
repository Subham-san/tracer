import React from 'react';
import {
  Check,
  Sparkles,
  Coffee,
  Apple,
  Utensils,
  Moon,
  BookOpen,
  Briefcase,
  Code,
  Gamepad2,
  Crosshair,
  Clock,
} from 'lucide-react';
import { TaskDefinition } from '../../types/tracker';

interface TaskCardProps {
  task: TaskDefinition;
  isCompleted: boolean;
  onToggle: () => void;
  index?: number;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isCompleted,
  onToggle,
}) => {
  // Select icon based on task iconName
  const renderIcon = () => {
    const iconProps = { className: 'w-4 h-4', strokeWidth: 2 };
    switch (task.iconName) {
      case 'Sparkles':
        return <Sparkles {...iconProps} className="w-4 h-4 text-sky-400" />;
      case 'Coffee':
        return <Coffee {...iconProps} className="w-4 h-4 text-amber-400" />;
      case 'Apple':
        return <Apple {...iconProps} className="w-4 h-4 text-emerald-400" />;
      case 'Utensils':
        return <Utensils {...iconProps} className="w-4 h-4 text-orange-400" />;
      case 'Moon':
        return <Moon {...iconProps} className="w-4 h-4 text-indigo-400" />;
      case 'BookOpen':
        return <BookOpen {...iconProps} className="w-4 h-4 text-blue-400" />;
      case 'Briefcase':
        return <Briefcase {...iconProps} className="w-4 h-4 text-cyan-400" />;
      case 'Code':
        return <Code {...iconProps} className="w-4 h-4 text-violet-400" />;
      case 'Gamepad2':
        return <Gamepad2 {...iconProps} className="w-4 h-4 text-fuchsia-400" />;
      case 'Crosshair':
        return <Crosshair {...iconProps} className="w-4 h-4 text-rose-400" />;
      default:
        return <Check {...iconProps} className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`group w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${
        isCompleted
          ? 'bg-emerald-950/20 border-emerald-500/40 text-neutral-200 shadow-sm shadow-emerald-950/30'
          : 'bg-neutral-900/60 hover:bg-neutral-900 border-neutral-800/80 hover:border-neutral-700 text-neutral-300'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0 pr-2">
        {/* Custom tactile Checkbox */}
        <div
          className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center border transition-all duration-200 ${
            isCompleted
              ? 'bg-emerald-500 border-emerald-400 text-neutral-950 shadow-md shadow-emerald-500/30 scale-105'
              : 'border-neutral-700 bg-neutral-950/60 group-hover:border-neutral-500 text-transparent'
          }`}
          aria-hidden="true"
        >
          <Check className={`w-3.5 h-3.5 stroke-[3] transition-transform duration-150 ${isCompleted ? 'scale-100' : 'scale-50'}`} />
        </div>

        {/* Task Icon Pill */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            isCompleted
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-neutral-800/80 text-neutral-400 group-hover:text-neutral-200'
          }`}
        >
          {renderIcon()}
        </div>

        {/* Task Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-sm sm:text-base font-semibold transition-all ${
                isCompleted
                  ? 'text-neutral-300 line-through decoration-emerald-500/60 decoration-2'
                  : 'text-neutral-100 group-hover:text-white'
              }`}
            >
              {task.title}
            </span>

            {task.timeSlot && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-400 bg-neutral-800/60 px-2 py-0.5 rounded-md border border-neutral-700/50">
                <Clock className="w-3 h-3 text-neutral-500" />
                {task.timeSlot}
              </span>
            )}
          </div>

          {task.subtitle && (
            <p
              className={`text-xs mt-0.5 truncate transition-colors ${
                isCompleted ? 'text-neutral-500' : 'text-neutral-400'
              }`}
            >
              {task.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right side badge */}
      <div className="flex-shrink-0 flex items-center gap-2">
        {task.category === 'optional' ? (
          <span className="text-[10px] font-medium uppercase tracking-wider text-rose-300/80 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full">
            Optional
          </span>
        ) : task.category === 'study' ? (
          <span className="hidden sm:inline-flex text-[10px] font-medium tracking-wider text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
            3 Hours
          </span>
        ) : task.category === 'career' ? (
          <span className="hidden sm:inline-flex text-[10px] font-medium uppercase tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
            Compulsory
          </span>
        ) : null}

        {/* State text */}
        <span
          className={`text-xs font-mono font-medium hidden sm:block ${
            isCompleted ? 'text-emerald-400' : 'text-neutral-500'
          }`}
        >
          {isCompleted ? 'DONE' : 'PENDING'}
        </span>
      </div>
    </button>
  );
};
