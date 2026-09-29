import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  badge?: string;
  accent?: 'emerald' | 'amber' | 'blue' | 'rose' | 'violet';
  progress?: number;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  accent = 'emerald',
  progress,
  onClick,
}) => {
  const accentStyles = {
    emerald: {
      bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      bar: 'bg-emerald-500',
      val: 'text-emerald-400',
    },
    amber: {
      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      bar: 'bg-amber-500',
      val: 'text-amber-400',
    },
    blue: {
      bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      bar: 'bg-blue-500',
      val: 'text-blue-400',
    },
    rose: {
      bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      bar: 'bg-rose-500',
      val: 'text-rose-400',
    },
    violet: {
      bg: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
      bar: 'bg-violet-500',
      val: 'text-violet-400',
    },
  }[accent];

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`relative w-full p-4 sm:p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 hover:border-neutral-700/80 transition-all duration-200 text-left flex flex-col justify-between shadow-sm overflow-hidden ${
        onClick ? 'cursor-pointer hover:bg-neutral-900' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3 w-full">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
            {title}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-100 font-mono">
            {value}
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex-shrink-0 ${accentStyles.bg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtitle || badge || progress !== undefined) && (
        <div className="mt-3.5 pt-3 border-t border-neutral-800/60 w-full flex items-center justify-between text-xs">
          {subtitle && <span className="text-neutral-400 truncate">{subtitle}</span>}
          {badge && (
            <span className="font-medium text-[11px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
              {badge}
            </span>
          )}
        </div>
      )}

      {progress !== undefined && (
        <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${accentStyles.bar}`}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </Component>
  );
};
